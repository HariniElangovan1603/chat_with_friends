import express from 'express';
import { ObjectId } from 'mongodb';
import { client } from '../models/mongodb.js';

const cardroute = express.Router();


cardroute.get('/', async (req, res) => {
  const db = client.db("college");
  const coll = db.collection("card");
  const dep = await coll.find().toArray();
  res.send(dep);
  return dep;

});



cardroute.get("/:id", async (req, res) => {
  const id = req.params.id;
  const db = client.db("college");
  const coll = db.collection("card");
  const user = await coll.findOne({ _id: new ObjectId(id) });
  res.send(user);
});

cardroute.post('/', async (req, res) => {
  const { uploadtype } = req.body;
  const db = client.db("college");
  const coll = db.collection("card");
  await coll.insertOne(req.body);

  if (uploadtype === "image") res.send('image created');
  else if (uploadtype === "video") res.send('video created');
  else res.send('post created');
});


cardroute.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { uploadtype } = req.body;
  const db = client.db("college");
  const coll = db.collection("card");
  await coll.updateOne({ _id: new ObjectId(id) }, { $set: req.body });

    if (uploadtype === "image") res.send('image created');
  else if (uploadtype === "video") res.send('video created');
  else res.send('updated created');
});



cardroute.delete("/:id", async (req, res) => {
    const { id } = req.params
    const db = client.db("college")
    const coll = await db.collection("card");
    await coll.deleteOne({ _id: new ObjectId(id) })
    await res.send(id)

})
export default cardroute;
