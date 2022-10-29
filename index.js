const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

const Port = process.env.PORT || 5000;

//* middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Simple Node Server Running');
});

const users = [
  { id: 1, name: 'John', email: 'john@gmail.com' },
  { id: 2, name: 'smith', email: 'smith@gmail.com' },
  { id: 3, name: 'alex', email: 'alex@gmail.com' },
];

//* Mongodb atlas username & password
// username: dbuser1
// password: WzObdjSwCU5lzVWy

const uri =
  'mongodb+srv://dbuser1:WzObdjSwCU5lzVWy@cluster0.yeflywl.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db('simpleNode').collection('users');
  // perform actions on the collection object
  console.log('database connected');
  client.close();
});

app.get('/users', (req, res) => {
  console.log(req.query);
  if (req.query.name) {
    // filters users by query
    const search = req.query.name;
    const filteredUsers = users.filter(
      (user) => user.name.toLowerCase().indexOf(search) >= 0
    );
    res.send(filteredUsers);
  } else {
    res.send(users);
  }
});

app.post('/users', (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);

  console.log(user);
  res.send(user);
});

app.listen(Port, () => {
  console.log('Server is running on port ' + Port);
});
