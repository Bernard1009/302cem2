const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Orders
exports.view = (req, res) => {
  // Order the connection
  connection.query('SELECT * FROM orderinfo WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedOrder = req.query.removed;
      res.render('home', { rows, removedOrder });
    } else {
      console.log(err);
    }
    console.log('The data from orderinfo table: \n', rows);
  });
}

// Find Order by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // Order the connection
  connection.query('SELECT * FROM orderinfo WHERE name LIKE ? OR company LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from orderinfo table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new order
exports.create = (req, res) => {
  const { name, company, email, phone, order_desc } = req.body;

  // Order the connection
  connection.query('INSERT INTO orderinfo SET name = ?, company = ?, email = ?, phone = ?, order_desc = ?', [name, company, email, phone, order_desc], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'Order added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from orderinfo table: \n', rows);
  });
}


// Edit order
exports.edit = (req, res) => {
  // Order the connection
  connection.query('SELECT * FROM orderinfo WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from orderinfo table: \n', rows);
  });
}


// Update Order
exports.update = (req, res) => {
  const { name, company, email, phone, order_desc } = req.body;
  // Order the connection
  connection.query('UPDATE orderinfo SET name = ?, company = ?, email = ?, phone = ?, order_desc = ? WHERE id = ?', [name, company, email, phone, order_desc, req.params.id], (err, rows) => {

    if (!err) {
      // Order the connection
      connection.query('SELECT * FROM orderinfo WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from orderinfo table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from orderinfo table: \n', rows);
  });
}

// Delete Order
exports.delete = (req, res) => {

  // Order the connection
  connection.query('DELETE FROM orderinfo WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      let removedOrder = encodeURIComponent('Order successfully removed.')
      res.redirect('/?removed=' + removedOrder);
    } else {
      console.log(err);
    }
    console.log('The data from orderinfo table: \n', rows);
  });
}

// View Orders
exports.viewall = (req, res) => {

  // Order the connection
  connection.query('SELECT * FROM orderinfo WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from orderinfo table: \n', rows);
  });

}