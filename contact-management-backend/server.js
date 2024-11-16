const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect('mongodb://localhost:27017/contactDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection failed:', err.message));

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  company: String,
  jobTitle: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send({ error: 'Failed to add contact' });
  }
});

app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch contacts' });
  }
});

app.put('/contacts/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(updatedContact);
  } catch (error) {
    res.status(400).send({ error: 'Failed to update contact' });
  }
});

app.delete('/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Contact deleted' });
  } catch (error) {
    res.status(400).send({ error: 'Failed to delete contact' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
