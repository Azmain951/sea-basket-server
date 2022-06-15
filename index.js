const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://dbuser:CdwXScXBoZs0kUj4@cluster0.j9phf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const dataCollection = client.db('sea-basket').collection('data');

        app.get('/data', async (req, res) => {
            const data = await dataCollection.find().toArray();
            res.send(data);
        });
    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello from Sea Basket!');
})

app.listen(port, () => {
    console.log(`Sea Basket app listening on port ${port}`)
})