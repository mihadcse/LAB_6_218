import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = 3002;


mongoose.connect(process.env.MONGODB)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

