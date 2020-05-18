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
            try {
                const query = 'SELECT Name, LastName, U.UserKey, Alias, A.Value as Email ' +
                    'FROM SECURITY.users U INNER JOIN SECURITY.address A ON U.UserKey = A.UserKey ' +
                    'WHERE (U.UserKey = ? or A.value = ? ) and Password = ? and A.Categorie = "PR" and A.Type = "EM"';
                connection.query(query, [data.name, data.name, md5(data.password)], (err, rows) => {
                    if (err){
                        reject('SQL ERROR');
                        return;
                    }
                    resolve((rows && rows.length > 0) ? rows[0] : undefined);
                });
            } catch (e) {
                console.log(e);
                resolve(e);
            }
        });
    },

    registerUser: function (data, mail) {
        return new Promise((resolve, reject) => {
            try {
                const user = {
                    UserKey: data.userKey,
                    Name: data.name,
                    LastName: data.lastname,
                    Password: md5(data.password),
                    Alias: data.alias
                };
                connection.query('INSERT SECURITY.users SET ?', user, (err, res) => {
                    if (err){
                        reject('SQL ERROR');
                        return;
                    }
                    const address = {
                        UserKey: data.userKey,
                        Type: 'EM',
                        Value: mail,
                        Categorie: 'PR'
                    };
                    connection.query('INSERT SECURITY.address SET ?', address, (err, res) => {
                        if (err){
                            reject('SQL ERROR');
                            return;
                        }
                        resolve(res);
                    });
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },

    validateExistAlias: function (alias) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT alias ' +
                'FROM SECURITY.users ' +
                'WHERE userkey = "' + alias + '" or alias = "' + alias + '"';
            connection.query(query, (err, rows) => {
                if (err){
                    reject('SQL ERROR');
                    return;
                }
                resolve((rows && rows.length > 0));
            });
        });
    },

    validateExistEmailAddres: function (mail) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT value ' +
                'FROM SECURITY.address ' +
                'WHERE value = "' + mail + '"';
            connection.query(query, (err, rows) => {
                if (err){
                    reject('SQL ERROR');
                    return;
                }
                resolve((rows && rows.length > 0));
            });
        });
    }
};
