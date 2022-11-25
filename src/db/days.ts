import { daysSchemaInput } from "../shared/storageSchema";
import { DatabaseSchema } from "./database_schema";

export class DaySchema extends DatabaseSchema{
    
    constructor(){
        const schemaName = 'days'
        const schemaInput = daysSchemaInput
        super(schemaName, schemaInput)
    }
}