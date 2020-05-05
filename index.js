const express = require('express');
const cors = require("cors")
const server = express();
const shortid = require("shortid")
server.use(express.json())
server.use(cors())
//to convert text to json

let users = [{
    id: "a_unique_id", // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane",  // String, required
  }]


server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/hobbits', (req, res) => {
  

 // res.status(200).json(data);
});

server.post("/api/users", (req, res) => {
    const user =  req.body
    if (!user.name || !user.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    user.id = shortid.generate()
    users.push(user)
    res.status(201).json(user)
 //   .catch(err=> {
 //       res.status(500).json({error: "user could not blah blah", error:err})
 //   } )
})

server.get("/api/users", (req, res) => {
     res.status(200).json(users);
})

server.get("/api/users/:id", (req, res) => {
   const user = users.find(user => user.id === req.params.id)
   if ( !user ) {
       res.status(404).json({ message: "The user with the specified ID does not exist." })
   }
    res.status(200).json(user)
})

server.delete("/api/users/:id", (req, res) => {
    const user = users.find(user => user.id === req.params.id)
    if ( !user ) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    users = users.filter(user => user.id != req.params.id)
    res.status(204).send()
})

server.put("/api/users/:id", (req, res) => {
    const user = users.find(user => user.id === req.params.id)
    if ( !user ) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    user.name = req.body.name
    user.bio = req.body.bio
    res.status(200).json(user)
})


server.listen(8000, () => console.log('API running on port 8000'));