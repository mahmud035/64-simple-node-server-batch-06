const express = require('express');
const app = express();
const cors = require('cors');

const Port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Simple Node Server Running');
});

//* middleware
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: 'John', email: 'john@gmail.com' },
  { id: 2, name: 'smith', email: 'smith@gmail.com' },
  { id: 3, name: 'alex', email: 'alex@gmail.com' },
];

app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/users', (req, res) => {
  console.log('Post API called');
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);

  console.log(user);
  res.send(user);
});

app.listen(Port, () => {
  console.log('Server is running on port ' + Port);
});
