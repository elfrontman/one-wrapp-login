import { IonBadge, IonButton, IonCheckbox, IonInput, IonItem, IonLabel } from "@ionic/react"
import { useContext } from "react"
import { useForm } from 'react-hook-form'
import { DatabaseContext } from "../../../context/DatabaseContext"
import { ContinuitiesSchema } from "../../../db/continuities"

const AddContinuity: React.FC = () => {
    const { db } = useContext(DatabaseContext)

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange"
    })

    const validation = { required: true}

    const onSubmit = async (data: any) => {
        const table = db?.schemaByName(ContinuitiesSchema) as ContinuitiesSchema
        if(table){
            try{
                const response = await table.addItem(data)
            }catch(errors){
                console.dir(errors)
            }
            
        }
        
    }

    return (
        <form className="ion-padding" onSubmit={ handleSubmit(onSubmit) }>
            <IonItem>
                <IonLabel position="floating">Character</IonLabel>
                <IonInput {...register("character", validation)}/>
                { errors.character &&  <IonBadge color="danger">Character is required</IonBadge> }
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Day story</IonLabel>
                <IonInput {...register("day_story", validation)}/>
                { errors.day_story &&  <IonBadge color="danger">Day story is required</IonBadge> }
            </IonItem>
            <IonButton className="ion-margin-top" type="submit" expand="block">
                Save image
            </IonButton>
        </form>
        ) 
        
    }
    
    export default AddContinuity