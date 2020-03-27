const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ws.db');

db.serialize(function() {
  //create table
  db.run(`
    CREATE TABLE IF NOT EXISTS ideas(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT
    );`)
  
    /**
     * INSERT DATE
     */
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
      "https://image.flaticon.com/icons/svg/2729/2729007.svg",
      "Courses programming",
      "Studying",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur",
      "#"
    ]

    db.run(query, values, function(err) {
      if(err) return console.log(err)

      console.log(this)
    });

    /**
     * SELECT DATA
     */

    // db.all(`SELECT * FROM ideas`, function(err, rows) {
    //   if(err) return console.log(err);

    //   console.log(rows);
    // });


    //DELETE DATA

    // db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err) {
    //   if(err) return console.log(err);

    //   console.log("Deleted", this);
    // });
});

module.exports = db;