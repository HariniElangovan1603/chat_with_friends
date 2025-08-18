import express from 'express';
import cors from 'cors';
import { client } from './models/mongodb.js';
import users from './route/users.js';

const app = express();
app.use(express.json());
app.use(cors());
await client.connect();
app.use("/users", users)

app.get("/", (req, res) => {
    res.send("datasssss");
});

app.listen(3005,()=>{ console.log("http://localhost:3005")});


