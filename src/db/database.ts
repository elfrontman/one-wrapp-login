import { addRxPlugin, createRxDatabase } from "rxdb"
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql';
import { DatabaseSchema } from "./database_schema";
import { enviroment } from './../environments/environment'

/** This object get the logic for the database creation */
export class AppDataBase{

    private syncUrls = {
        http: `${enviroment.URL_PATH}:${enviroment.GRAPHQL_PORT}/${enviroment.GRAPHQL_PATH}`,
        ws: `ws://${enviroment.URL_DOMAIN}:${enviroment.GRAPHQL_SUBSCRIPTION_PORT}/${enviroment.GRAPHQL_SUBSCRIPTION_PATH}`
    };

    private _dbName = 'continuitydb'
    private _dbPassword = 'crypt525@2022'
    private dbInstence;
    private schemaList;

    public schemaByName(nameSchema:any){
        return this.schemaList.find( x => x instanceof nameSchema )
    }

    constructor(schemaList: DatabaseSchema[]){
        this.schemaList = schemaList

        const storage = wrappedValidateAjvStorage({
            storage: getRxStorageDexie()
        })

        this.dbInstence = createRxDatabase({
            name: this._dbName,
            storage,
            //password: this._dbPassword,
            multiInstance: false,
        });

        this.setCollections();

        addRxPlugin(RxDBReplicationGraphQLPlugin)
        addRxPlugin(RxDBMigrationPlugin);

        //TO-DO: Only use in DEV
        addRxPlugin(RxDBDevModePlugin);
    }


    private async setCollections(){

        const persistentStorage = await this.dbInstence

        const schemaObject:any = {}
        
        this.schemaList.forEach( schema => {
            schemaObject[schema.SchemaName()] = {
                schema: schema.Schema()
            }
        })

        await persistentStorage.addCollections({...schemaObject})

        this.schemaList.forEach( schema => {
            schema.SetDatabaseInstance(persistentStorage)
            const currentschema = persistentStorage[schema.SchemaName()]

            currentschema.preSave( docData => {
                docData.updatedAt = new Date().getTime()
            }, false)

            if(this.doSync()){
                const replicationState = currentschema.syncGraphQL({
                    url: this.syncUrls,
                    //TO-DO: Re view if it is needed
                    /*headers: {
                        Authorization: 'Bearer '
                    }*/
                    push:{
                        batchSize: schema.batchSize,
                        queryBuilder: schema.getPushQueryBuilder()
                    },
                    pull:{
                        batchSize: schema.batchSize,
                        queryBuilder: schema.getPullQueryBuilder(),
                        streamQueryBuilder: schema.getPullStreamBuilder()
                    },
                    live: true,
                    deletedField: 'deleted'
                });
        
                replicationState.error$.subscribe( err => {
                    console.error('replication error');
                    console.dir(err);
                })
            }

            schemaObject[schema.SchemaName()] = schema.Schema()
        })
    }

    private doSync() {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const shouldSync = url.searchParams.get('sync');
        if (shouldSync && shouldSync.toLowerCase() === 'false') {
            return false;
        } else {
            return true;
        }
    }
}