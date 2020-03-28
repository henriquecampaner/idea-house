const express = require('express');
const server = express();
const db = require('./db');

// public files
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

// nunjucks config
const nunjucks = require('nunjucks');
nunjucks.configure("views", {
  express: server,
  noCache: true,
})


// routes
server.get('/', (req, res) => {
  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if(err) {
      console.log(err)
      return res.send("error database");
    }

      const reversedIdeas = [...rows].reverse();
      let lastIdeas = []

      for(idea of reversedIdeas) {
      if(lastIdeas.length < 2) {
      lastIdeas.push(idea);
    }
  }

  res.render("index.html", { ideas: lastIdeas })
    });
  ;
});

server.get('/idea', (req, res) => {
  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if(err) {
      console.log(err)
      return res.send("error database");
    }

    const reversedIdeas = [...rows].reverse();
    res.render("idea.html", { ideas: reversedIdeas });
  })
  
});

server.post('/', (req, res) => {
  
  const query = `
      INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
      ) VALUES(?,?,?,?,?);
    `

    const values = [
      req.body.image,
      req.body.title,
      req.body.category,
      req.body.description,
      req.body.link,
    ]

    db.run(query, values, function(err) {
      if(err) {
      console.log(err)
      return res.send("error database");
    }
      return res.redirect("/idea");
    });
})

server.post('/idea', (req, res) => {
  
  const query = `
      INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
      ) VALUES(?,?,?,?,?);
    `

    const values = [
      req.body.image,
      req.body.title,
      req.body.category,
      req.body.description,
      req.body.link,
    ]

    db.run(query, values, function(err) {
      if(err) {
      console.log(err)
      return res.send("error database");
    }
      return res.redirect("/idea");
    });
})

server.listen(3343);