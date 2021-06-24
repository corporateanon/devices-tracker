module.exports = {
    client: {
        includes: ['./lib/api/**/*.ts', './lib/api/**/*.tsx'],
        service: {
            name: 'mainSchema',
            localSchemaFile: './lib/generated/schema.graphql',
        },
    },
};
