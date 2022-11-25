import { characterSchemaInput } from "../shared/storageSchema";
import { DatabaseSchema } from "./database_schema";

export class CharactersSchema extends DatabaseSchema{
    
    constructor(){
        const schemaName = 'characters'
        const schemaInput = characterSchemaInput
        super(schemaName, schemaInput)
    }
}