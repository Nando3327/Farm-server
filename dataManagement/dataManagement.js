const md5 = require('md5');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'efestor2411'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

// connection.end((err) => {
//     // The connection is terminated gracefully
//     // Ensures all remaining queries are executed
//     // Then sends a quit packet to the MySQL server.
// });

module.exports = {
    getData: function () {
        const axios = require('axios');
        const cheerio = require('cheerio');
        const url = 'https://news.ycombinator.com/';
        return axios(url)
            .then(response => {
                return cheerio.load(response.data);
            })
            .catch(console.error);
    },
    getUserData: function (data) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT name, lastname, userkey, alias ' +
                'FROM SECURITY.users ' +
                'WHERE userkey = "' + data.name + '" and password = "' + md5(data.password) + '"';
            connection.query(query, (err,rows) => {
                if(err) throw err;
                resolve((rows && rows.length > 0)? rows[0]: undefined);
            });
        });
    }
  };
