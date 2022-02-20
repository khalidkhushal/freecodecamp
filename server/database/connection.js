const mongoose = require('mongoose')

const connectdb = async() => {
    try {
        const conn = await new mongoose.connect(process.env.mongo_uri, {
            useNewUrlParser: true,
        })
        console.log('connected to database at ' + conn.connection.host)
    } catch (err) {
        console.log(err)
    }

}
module.exports = connectdb;