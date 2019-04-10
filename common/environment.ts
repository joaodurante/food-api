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
    },
    jest: {
        _address: 'http://localhost:3001',
        _auth: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.rO9a-V0jqkiJgGX8Uvzv3vcI7c1IUBtkcC055euSO8U'
    }
}