// implement your API here
const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());


server.get("/api/users", (req, res) => {
  db.find().then(users => {
    res.status(200).json(users);
  }).catch(error =>{
    res.status(500).json({ error: "The users information could not be retrieved." });
  });
});

server.get("/api/users/:id", (req, res) => {

  const { id } = req.params;
  console.log(id)

  db.findById(id).then(users => {
    if(users){
      res.status(200).json(users);
    }
    else{
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    } 
    
  }).catch(error =>{
    res.status(500).json(error);
  });
});


server.post("/api/users", (req, res) => {
    
  const userInfo = req.body;

  db.insert(userInfo)
    .then(user => {
      //console.log(userInfo.name);
      if(userInfo.name && userInfo.bio){
        res.status(201).json(user);
      }
      else{
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
      }
      
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

server.delete("/api/users/:id", (req, res) => {
  
  const { id } = req.params;

  db.remove(id).then(deleted =>{
    console.log("del", deleted);
    if(deleted){
      res.status(204).json(deleted);
    } else {
      res.status(404).json({message: "user not found"});
    }
  }).catch(error => {
    res.status(500).json(error);
  })
})


server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  //console.log(req.params);
  db.update(id, changes).then(update => {
    //console.log(req.params);
    if(update){
      if(changes.name && changes.bio){
        res.status(201).json(update);
      }
      else{
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
      }
      res.status(201).json(update);
    } 
    else {
      res.status(404).json ({ message: "The user with the specified ID does not exist." });
    }
  }).catch(error => {
    res.status(500).json(error);
  })
})

const port = 6000;
server.listen(port, () => console.log(`${port}`));


