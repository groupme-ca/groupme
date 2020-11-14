// This is the server file
import express from 'express';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import cors from 'cors';

// Import users from router
import users from './routes/api/users.js';
import chats from './routes/api/messages.js';
// Setup database config
import keys from './config/keys.js';

const app = express()
app.disable("x-powered-by")
// Body parser
app.use(express.json());


//allow request to come from any endpoint with any header
//IF WE EVER DO SECURITY THIS MUST BE REMOVED
app.use(cors());


//pusher setup
const pusher = new Pusher({
  appId: "1102380",
  key: "d386d4bf8093a108cca2",
  secret: "965e04a59ac481a6ce60",
  cluster: "us2",
  useTLS: true
});

// Connect to MongoDB
mongoose.connect(keys.mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const db = mongoose.connection;

//listening to the db the messages collection
db.once("open", () => {
  console.log("db connected");

  const chatCollection = db.collection('chats')
  const changeStream = chatCollection.watch()

  changeStream.on('change', (change)=>{
    //console.log(change);

    //TODO: MAKE A CHANNEL FOR EVERY USER 
    if (change.operationType === "insert") {
      const chatDetails = change.fullDocument;
      // console.log(change.fullDocument);
      const participants = Object.entries(chatDetails.participants);
      participants.forEach(([key, value]) => {
        console.log(value.cid);
        pusher.trigger(value.cid, "inserted", 
      {
        name: chatDetails.name,
        participants: chatDetails.participants,
        messages: chatDetails.messages,
      }
      );
      });
    } else {
      console.log('error triggering pusher');
    }
  });
});

// Use Routes 
app.use('/api/users', users); // anything that goes to 'api/users' should refer to users
app.use('/api/messages', chats); // anything that goes to 'api/messages' should refer to messages

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));