const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
        const reviewCollection = client.db("review").collection("reviews");


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


        app.get('/services/:id', async (req, res) => {


            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const data = await tourCollection.findOne(query)
            res.send(data)




        })


        app.post('/seemoreservices', async (req, res) => {


            const order = req.body
            const result = await tourCollection.insertOne(order)
            res.send(result)




        })
        app.post('/review', async (req, res) => {


            const order = req.body
            const result = await reviewCollection.insertOne(order)
            res.send(result)




        })

        app.get('/review', async (req, res) => {

         
            let query = {}

            if (req.query.serviceId) {

                query = {


                    serviceId: req.query.serviceId



                }
            }


            const cursor = reviewCollection.find(query)
            const review = await cursor.sort({ date: -1 }).toArray();
            res.send(review)




        })


        app.get('/reviewbyemail', async (req, res) => {


            let query = {}

            if (req.query.email) {

                query = {


                    email: req.query.email


                }



            }
            const cursor = reviewCollection.find(query)
            const reviews = await cursor.sort({ date: -1 }).toArray();
            res.send(reviews)



        })


        app.delete('/reviews/:id', async (req, res) => {


            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await reviewCollection.deleteOne(query)
            res.send(result)



        })


        app.get('/update/:id', async (req, res) => {

            const id = req.params.id
            console.log(id)
            const query = { _id: ObjectId(id) }
            const review = await reviewCollection.findOne(query)
            res.send(review)









        })



        app.put('/update/:id', async (req, res) => {

            const id = req.params.id
            console.log(id)
            const filter = { _id: ObjectId(id) }
            const review = req.body;
            const option = { upsert: true }

            const updateInfo = {


                $set: {

                    review: review.review,




                }




            }
            const result = await reviewCollection.updateOne(filter, updateInfo, option)
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