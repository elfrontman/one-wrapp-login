import { continuitySchemaInput } from "../shared/storageSchema";
import { DatabaseSchema } from "./database_schema";

export class ContinuitiesSchema extends DatabaseSchema{
    
    static schemaName = 'continuities'

    constructor(){
        const schemaName = ContinuitiesSchema.schemaName
        const schemaInput = continuitySchemaInput
        super(schemaName, schemaInput)
    }
}