/* const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/Marketplace" ||
        process.env.MONGO_HOST || + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') +
        '/mernproject'
}
export default config */


const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://heatherwanggg:081397@cluster1.5rvcmpa.mongodb.net/Marketplace?retryWrites=true&w=majority" ||
        process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') +
        '/mernproject'
}
export default config
