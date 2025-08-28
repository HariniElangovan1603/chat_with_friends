import express from 'express';
import { ObjectId } from 'mongodb';
import { client } from '../models/mongodb.js';
import { getUser } from './users.js';

const post = express.Router();


post.get('/', async (req, res) => {
  const db = client.db("college");
  const coll = db.collection("post");

  let dep = await coll.find().toArray();

  res.send(dep);
});



post.get("/:id", async (req, res) => {
  const id = req.params.id;
  const db = client.db("college");
  const coll = db.collection("post");
  const user = await coll.findOne({ _id: new ObjectId(id) });
  res.send(user);
});

post.post('/', async (req, res) => {
  const { uploadtype } = req.body;
  const db = client.db("college");
  const coll = db.collection("post");

  const newPost = {
    ...req.body,
    time: new Date().toISOString() // store as ISO string
  };

  await coll.insertOne(newPost);

  if (uploadtype === "image") res.send('image created');
  else if (uploadtype === "video") res.send('video created');
  else res.send('post created');
});

post.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { uploadtype } = req.body;
  const db = client.db("college");
  const coll = db.collection("post");
  await coll.updateOne({ _id: new ObjectId(id) }, { $set: req.body });

  if (uploadtype === "image") res.send('image created');
  else if (uploadtype === "video") res.send('video created');
  else res.send('updated created');
});



post.delete("/:id", async (req, res) => {
  const { id } = req.params
  const db = client.db("college")
  const coll = await db.collection("post");
  await coll.deleteOne({ _id: new ObjectId(id) })
  await res.send(id)

})
export default post;
