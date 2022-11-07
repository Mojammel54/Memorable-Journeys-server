const { MongoClient, ServerApiVersion } = require('mongodb');

const express = require('express');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000;

require('dotenv').config();
//middlewares
app.use(cors())
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ebaxxgs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {

    try {

        const tourCollection = client.db("memorable-journeys").collection("services");


        app.get('/limitservices', async (req, res) => {

            const query = {}
            const cursor = tourCollection.find(query).limit(3)
            const result = await cursor.toArray();
            res.send(result)




        })
        app.get('/seemoreservices', async (req, res) => {

            const query = {}
            const cursor = tourCollection.find(query)
            const result = await cursor.toArray();
            res.send(result)




        })

    }


    finally {





    }



}
run().catch(err => {

    console.log(err)


})



app.get('/', (req, res) => {

    res.send('server is running')


})

app.listen(port, () => {

    console.log(`port is running on${port}`)


})