import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useContext } from 'react';
import { useParams } from 'react-router';
import DisplayLocations from '../components/DisplayLocations';
import ExploreContainer from '../components/ExploreContainer';
import { AuthContext } from '../context/AuthedContext';
import './Page.css';



const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const authContext = useContext(AuthContext)
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
          <IonText slot='end'>{authContext.user?.name}</IonText>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
        

      </IonContent>
    </IonPage>
  );
};

export default Page;
