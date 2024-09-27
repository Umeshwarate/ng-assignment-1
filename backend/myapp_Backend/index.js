const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'umeshmysql(05)', // Replace with your MySQL password
    database: 'task_manager'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});



// Read all tasks
app.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(results);
    });
});


//to create a task
app.post('/task', (req, res)=>{
  
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).send('Invalid data format');
    }
    const {assignedTo, status, priority, dueDate, comments} = req.body;

    const query = 'INSERT INTO tasks (assignedTo, status, priority, dueDate, comments) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [assignedTo, status, priority, dueDate, comments], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err); // Log any errors
            return res.status(400).send(err);
        }
        res.status(201).send({ id: results.insertId, assignedTo, status, priority, dueDate, comments });
    });
});

//to update a task
app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const { assignedTo, status, priority, dueDate, comments } = req.body;
    console.log(id);
    console.log(assignedTo);
    const query = 'UPDATE tasks SET assignedTo = ?, status = ?, priority = ?, dueDate = ?, comments = ? WHERE id = ?';
    connection.query(query, [assignedTo, status, priority, dueDate, comments, id], (err) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send({ id, assignedTo, status, priority, dueDate, comments });
    });
});


//to delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM tasks WHERE id = ?';
    connection.query(query, [id], (err) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(204).send();
    });
});


app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
