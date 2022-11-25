/** Schemes RxDB */
export const characterSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties:{
        id:{
            type: 'string',
            maxLength: 500
        },
        cast_name: {
            type: 'string',
            maxLength: 500
        },
        actor_name: {
            type: 'string'
        },
        picture: {
            type: 'string'
        },
        updatedAt: {
            type: 'number',
            minimum: 0,
            maximum: 10000000000000000,
            multipleOf: 1

        }
    },
    indexes:['cast_name', 'updatedAt'],
    required:['id', 'cast_name', 'updatedAt']
}

export const daySchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties:{
        id: {
            type: 'string',
            maxLength: 100
        },
        scenes_participation:{
            type: 'integer',
        },
        scenes_produced:{
            type: 'integer',
        },
        total_images_continuity: {
            type: 'integer'
        },
        status_continuity: {
            type: 'string',
            maxLength: 100
        },
        picture: {
            type: 'string'
        },
        characters: {
            type: 'array',
            uniqueItems: true,
            items:{
                type: 'string'
            }
        },
        updatedAt: {
            type: 'number',
            minimum: 0,
            maximum: 10000000000000000,
            multipleOf: 1

        }
    },
    indexes:['status_continuity', 'updatedAt'],
    required:['id', 'status_continuity', 'updatedAt']
}

export const continuitySchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties:{
        id:{
            type: 'string',
            maxLength: 10000000
        },
        day_story: {
            type: 'string',
            maxLength: 1000
        },
        character: {
            type: 'string',
            maxLength: 1000
        },
        picture: {
            type: 'string'
        },
        updatedAt: {
            type: 'number',
            minimum: 0,
            maximum: 10000000000000000,
            multipleOf: 1

        }
    },
    indexes:['day_story', 'character','updatedAt'],
    required:['id', 'day_story', 'updatedAt']
}


/** Inputs for create GraphQL Schemes */
export const characterSchemaInput = {
    characters: {
        schema: characterSchema,
        checkpointFields: [
            'id',
            'updatedAt'
        ],
        deletedField: 'deleted',
        headerFields: ['Authorization']
    }
}

export const daysSchemaInput = {
    days: {
        schema: daySchema,
        checkpointFields: [
            'id',
            'updatedAt'
        ],
        deletedField: 'deleted',
        headerFields: ['Authorization']
    }
}

export const continuitySchemaInput = {
    continuities: {
        schema: continuitySchema,
        checkpointFields: [
            'id',
            'updatedAt'
        ],
        deletedField: 'deleted',
        headerFields: ['Authorization']
    }
}