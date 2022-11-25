import { IonList, IonItem, IonLabel } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { DatabaseContext } from "../../context/DatabaseContext";
import { ContinuitiesSchema } from "../../db/continuities";

const Continuity: React.FC = () => {

    const { db } = useContext(DatabaseContext)
    const [ items, setItems] = useState([])

    useEffect(() => {
        itemList()
    })

    const itemList = async () => {
        const table = db?.schemaByName(ContinuitiesSchema) as ContinuitiesSchema
        if(table){
            try{
                const response:any = await table.getItems()
                setItems(response)
            }catch(errors){
                console.error(errors)
            }
            
        }
    }

    return (
        <IonList>
          { 
            items.map( (item:any) => (
            <IonItem key={item.id}>
                <IonLabel >Character: {item.character} / Day: {item.day_story}</IonLabel>
            </IonItem>
            )) 
          }
        </IonList>
        
      );
}

export default Continuity;