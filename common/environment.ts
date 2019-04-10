export const environment = {
    server:{
        port: process.env.SERVER_PORT || 3000
    },
    db:{
        url: process.env.DB_URL || 'mongodb://localhost:27017/food-api',
        options:{
            useNewUrlParser: true,
            useCreateIndex: true
        }
    },
    security:{
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECRET || 'food-api-secret',
        enableHTTPS: process.env.ENABLE_HTTPS || false,
        certificate: process.env.CERT_FILE || './security/keys/cert.pem',
        key: process.env.CERT_KEY_FILE || './security/keys/key.pem'
    },
    common:{
        name: 'food-api'
    },
    log: {
        name: 'food-api-logger',
        level: process.env.LOG_LEVEL || 'debug'
    }
}