// This is the server file
import express from 'express';
import mongoose from 'mongoose';

// Import users from router
import users from './routes/api/users.js';
// Setup database config
import keys from './config/keys.js';

const app = express()
app.disable("x-powered-by")
// Body parser
app.use(express.json());
// Connect to MongoDB
mongoose.connect(keys.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Use Routes 
app.use('/api/users', users); // anything that goes to 'api/users' should refer to users
// app.use(users);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));