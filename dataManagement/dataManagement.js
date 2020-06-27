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
                const query = 'SELECT Name, LastName, U.UserKey, Alias, A.Value as Email, ChangePassword ' +
                    'FROM SECURITY.users U INNER JOIN SECURITY.address A ON U.UserKey = A.UserKey ' +
                    'WHERE (U.UserKey = ? or A.value = ? or U.Alias = ? ) and Password = ? and A.Categorie = "PR" and A.Type = "EM"';
                connection.query(query, [data.name, data.name, data.name, md5(data.password)], (err, rows) => {
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

    getUserDataByEmail: function (email) {
        return new Promise((resolve, reject) => {
            try {
                const query = 'SELECT Name, LastName, U.UserKey, Alias, A.Value as Email, ChangePassword ' +
                    'FROM SECURITY.users U INNER JOIN SECURITY.address A ON U.UserKey = A.UserKey ' +
                    'WHERE A.Value = ? and A.Categorie = "PR" and A.Type = "EM"';
                connection.query(query, [email], (err, rows) => {
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
                'WHERE userkey = ? or alias = ?';
            connection.query(query,[alias, alias], (err, rows) => {
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
                'WHERE value = ? ';
            connection.query(query, [mail],(err, rows) => {
                if (err){
                    reject('SQL ERROR');
                    return;
                }
                resolve((rows && rows.length > 0));
            });
        });
    },

    getAuthorizer: function (source, method) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT mt.value as method, au.value as authorized ' +
                'FROM SWITCH.authorizers au INNER JOIN SWITCH.methods mt ON au.source = mt.source ' +
                'WHERE mt.methodName = ? and au.source = ?; ';
            connection.query(query, [method, source],(err, rows) => {
                if (err){
                    reject('SQL ERROR');
                    return;
                }
                resolve((rows && rows.length > 0) ? rows[0]: undefined);
            });
        });
    },

    updateUserPassword: function (user, password, changePassword = true) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE SECURITY.users ' +
                'SET Password = ?, ChangePassword = ? ' +
                'WHERE UserKey = ?';
            connection.query(query, [md5(password), changePassword, user.UserKey],(err, res) => {
                if (err){
                    reject('SQL ERROR');
                    return;
                }
                resolve(res);
            });
        });
    }
};
