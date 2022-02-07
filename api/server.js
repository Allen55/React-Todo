const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const CONNECTION_URL = `mongodb+srv://AllenHarper:Nosedive55@cluster0.ibok7.mongodb.net/Cluster0?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3002;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Connection is running on port: ${PORT}`)))
    .catch(err => console.log(err.message))

const Todo = require('./models/Todo')

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})
app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    todo.save();
    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json({result});
})

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
});

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;
	todo.save();
	res.json(todo);
});

app.listen(3001, ()=> console.log(`Server is running on ${PORT}`));
