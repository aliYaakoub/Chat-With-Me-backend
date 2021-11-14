import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import usersRouter from './routes/authentication.js';
import messagesRouter from './routes/messages.js';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb://localhost/chatWithMe`);
// mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('connected to MongoDB'))

app.get('/', (req, res) =>{
    res.send('welcome')
});

app.use('/users', usersRouter)
app.use('/messages', messagesRouter)


app.listen(process.env.PORT || 5000, () => console.log('listening on port http://localhost:' + 5000))