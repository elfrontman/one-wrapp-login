import { IonAlert, IonButton, IonContent, IonIcon, IonPage, IonToast } from "@ionic/react"
import { logoGoogle } from "ionicons/icons"

import { useContext, useEffect, useState } from "react";
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth'
import './Login.css';
import { AuthContext } from "../../context/AuthedContext";
import { useHistory } from "react-router";
import DisplayLocations from "../../components/DisplayLocations";

const Login: React.FC = () => {

    const { user , storageSession} = useContext(AuthContext)
    const [isAutenticated, setIsAutenticated] = useState(false)
    const [autenticatedError, setAutenticatedError] = useState(null)
    const history = useHistory()

    useEffect(() => {
        if(!user){
            //refresh()
        }
      
    })

    const signIn = async () => {
        try{
            const user = await GoogleAuth.signIn()
            storageSession(user)
            setIsAutenticated(true)
            history.push('/page/Inbox')
        }catch(e: any){
            setIsAutenticated(false)
            setAutenticatedError(e)
        }
        
    }

    const refresh = async () => {
        try{
            const authCode = await GoogleAuth.refresh()
            console.log('refresh:', authCode)
            signIn()
        }catch(e:any){
            setIsAutenticated(false)
            setAutenticatedError(e)
        }
        
    }

    const signOut = async () => {
        try{
            await GoogleAuth.signOut()
            storageSession(null)
            setIsAutenticated(false)
        }catch(e: any){
            setAutenticatedError(e)
        }
        
    }



    return (
        <IonPage>
            <IonContent fullscreen>
                {
                    isAutenticated
                    ? 
                    <>
                        <IonButton expand="full" routerLink="/page">
                            Go to dashboard
                        </IonButton>
                        <IonButton expand="full" onClick={signOut}>
                            Sign out
                        </IonButton>
                    </>
                    :
                    <>
                        <IonButton expand="full" onClick={signIn}>
                            <IonIcon name={logoGoogle} slot="start" /> Sign in with Google
                        </IonButton>
                        <IonButton expand="full" onClick={refresh}>
                            Try refresh
                        </IonButton>
                    </>
                }
            </IonContent>
        </IonPage>
    )
}

export default Login;