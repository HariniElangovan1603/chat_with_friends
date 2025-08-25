import express from 'express';
import cors from 'cors';
import { client } from './models/mongodb.js';
import users from './route/users.js';
import post from './route/post.js';
import cardroute from './route/card.js';

const app = express();
app.use(express.json());
app.use(cors());
await client.connect();
app.use("/users", users)
app.use("/post",post);
app.use("/card",cardroute)
app.get("/", (req, res) => {
    res.send("datasssss");
});

app.listen(3005,()=>{ console.log("http://localhost:3005")});


