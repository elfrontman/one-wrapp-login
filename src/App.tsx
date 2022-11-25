import { IonApp, IonButton, IonLabel, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { Capacitor } from '@capacitor/core'
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';

import Menu from './components/Menu';
import Page from './pages/Page';
import Login from './pages/login/Login';
import AddContinuity from './pages/continuity/add-continuity/AddContinuity'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/AuthedContext';
import { AppDataBase } from './db/database';
import { CharactersSchema } from './db/characters';
import { DaySchema } from './db/days';
import { ContinuitiesSchema } from './db/continuities';
import { DatabaseContext } from './context/DatabaseContext';
import Continuity from './pages/continuity/Continuity';

/** RxDB */
const rxDB = new AppDataBase([
  new CharactersSchema(), 
  new DaySchema(),
  new ContinuitiesSchema()
]);


setupIonicReact();

const App: React.FC = () => {

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if(Capacitor.getPlatform() == 'web'){
      GoogleAuth.initialize({
        clientId: '417588692467-aslmsvepgc5kc7vgnogqt5dut77qrtqm.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: false,
      });
    }
  })

  const storageSession = (user:User) => {
    setUser(user)
  }

  const Dashboard = () =>(
    <IonSplitPane contentId="main">
      <Menu />
      <IonRouterOutlet id="main">
        <Route path="/page/:name" exact={true}>
          <Page />
        </Route>
        
      </IonRouterOutlet>
    </IonSplitPane>
    
  )

  return (
    <IonApp>
      <IonReactRouter>
        
        <AuthContext.Provider value={{ user, storageSession}}>
          <DatabaseContext.Provider value={{db: rxDB}}>
            <Redirect from='/index.html' to="/" />
            <Route exact path="/">
              <Redirect to="/continuity" />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route path="/continuity" exact={true}>
              <Continuity  />
              <IonButton routerLink="/continuity/add" className="ion-margin-top" type="submit" expand="block">
                Create
              </IonButton>
            </Route>
            <Route path="/continuity/add" exact={true}>
              <AddContinuity  />
            </Route>
            <Route path="/continuity/add" exact={true}>
              <AddContinuity  />
            </Route>
            <Route path="/page" exact={true}>
              <Dashboard  />
            </Route>
            {/** <ProtectedRoute path='/page' component={Dashboard}></ProtectedRoute> */}
          </DatabaseContext.Provider>
        </AuthContext.Provider>
        
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
