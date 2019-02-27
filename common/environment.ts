export const environment = {
    server:{
        port: process.env.SERVER_PORT || 3000
    },
    db:{
        url: process.env.DB_URL || 'mongodb://localhost:27017/meat-api',
        options:{
            useNewUrlParser: true,
            useCreateIndex: true
        }
    },
    security:{
        saltRounds: process.env.SALT_ROUNDS || 10
    }
}