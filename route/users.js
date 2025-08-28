import express from 'express';
import { client } from '../models/mongodb.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { object } from 'webidl-conversions';

const users = express.Router();

users.get('/', async (req, res) => {
    const db = client.db("college");
    const coll = db.collection("users");
    const dep = await coll.find().toArray();
    res.send(dep);
    return dep;

});


users.get("/:id", async (req, res) => {
    const id = req.params.id;
    const db = client.db("college");
    const coll = db.collection("users");
    const user = await coll.findOne({ _id: new ObjectId(id) });
    res.send(user);
});

export async function getUser(id,db) {
    // const db = client.db("college");
    const coll = db.collection("users");
    const user = await coll.findOne({ _id: new ObjectId(id) });
    return user
}


users.post('/', async (req, res) => {
    const user = req.body;
    const db = client.db("college");
    const coll = db.collection("users");
    user.password = await bcrypt.hash(user.password, 10);
    await coll.insertOne(user);
    res.send(user);


});


users.put('/:id', async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const db = client.db("college");
    const coll = db.collection("users");
    user.password = await bcrypt.hash(user.password, 10)
    await coll.updateOne({ _id: new ObjectId(id) },
        { $set: user });
    res.send(req.body);

});

users.delete("/:id", async (req, res) => {
    const { id } = req.params
    const db = client.db("college")
    const coll = await db.collection("users");
    await coll.deleteOne({ _id: new ObjectId(id) })
    await res.send(id)

})

users.post("/signin", async (req, res) => {
    const user = await req.body
    const db = client.db("college");
    const coll = db.collection("users");

    const foundUser = await coll.findOne({ "email": user.email });

    if (!foundUser) {
        return res.send({ message: "User not found" });
    }

    const match = await bcrypt.compare(user.password, foundUser.password);

    if (!match) {
        return res.send({ message: "Invalid credentials" });
    }

    res.send({ message: "Login successful", user: foundUser });
});


export default users;
