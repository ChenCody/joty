import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://CQcookie:0JvtZ0NtsFMRMslv@cluster0.a92vvue.mongodb.net/?retryWrites=true&w=majority";



export default function handler(req, res) {
    getData().then(data => {
        res.status(200).json({ name: data })
    })
}

async function getData() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    await client.connect();
    const db = client.db("mongodbVSCodePlaygroundDB");
    const collection = db.collection('sales');
    const findResult = await collection.find({});
    const result = await findResult.toArray()

    await client.close();
    return result;
}