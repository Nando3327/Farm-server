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
    getFarms: function () {
        return new Promise((resolve, reject) => {
            try {
                const query = 'SELECT Id, Name ' +
                    'FROM FARM.farms ';
                connection.query(query, (err, rows) => {
                    if (err) {
                        reject('SQL ERROR');
                        return;
                    }
                    resolve((rows && rows.length > 0) ? rows : []);
                });
            } catch (e) {
                console.log(e);
                resolve(e);
            }
        });
    },
    getFarmById: function (id) {
        return new Promise((resolve, reject) => {
            try {
                const query = 'SELECT F.Id, F.Name, SUM(P.Size) as Size ' +
                    'FROM FARM.farms F INNER JOIN FARM.pounds P ON F.Id = P.Farm_Id ' +
                    'WHERE F.Id = ? GROUP BY F.Id ';
                connection.query(query, [id], (err, rows) => {
                    if (err) {
                        reject('SQL ERROR');
                        return;
                    }
                    resolve((rows && rows.length > 0) ? rows : []);
                });
            } catch (e) {
                console.log(e);
                resolve(e);
            }
        });
    },
    getPounds: function (id) {
        return new Promise((resolve, reject) => {
            try {
                const query = 'SELECT Id, Name, Size ' +
                    'FROM FARM.pounds ' +
                    'WHERE Farm_Id = ? ';
                connection.query(query, [id], (err, rows) => {
                    if (err) {
                        reject('SQL ERROR');
                        return;
                    }
                    resolve((rows && rows.length > 0) ? rows : []);
                });
            } catch (e) {
                console.log(e);
                resolve(e);
            }
        });
    },
    createFarm: function (name) {
        return new Promise((resolve, reject) => {
            try {
                const farm = {
                    Name: name,
                };
                connection.query('INSERT FARM.farms SET ?', farm, (err, res) => {
                    if (err) {
                        reject(err.sqlMessage);
                        return;
                    }
                    resolve(res);
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },
    createPound: function (name, size, id) {
        return new Promise((resolve, reject) => {
            try {
                const pound = {
                    Name: name,
                    Size: size,
                    Farm_Id: id
                };
                connection.query('INSERT FARM.pounds SET ?', pound, (err, res) => {
                    if (err) {
                        reject(err.sqlMessage);
                        return;
                    }
                    resolve(res);
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },
    editFarm: function (name, id) {
        return new Promise((resolve, reject) => {
            try {
                connection.query('UPDATE FARM.farms SET Name = ? Where id = ?', [name, id], (err, res) => {
                    if (err) {
                        reject(err.sqlMessage);
                        return;
                    }
                    if(res.affectedRows > 0){
                        resolve({
                            affectedRows: res.affectedRows
                        });
                    }else{
                        resolve({
                            result: 'No rows affected'
                        });
                    }
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },
    editPound: function (name, size, id) {
        return new Promise((resolve, reject) => {
            try {
                connection.query('UPDATE FARM.pounds SET Name = ?, Size = ? Where id = ?', [name, size, id], (err, res) => {
                    if (err) {
                        reject(err.sqlMessage);
                        return;
                    }
                    if(res.affectedRows > 0){
                        resolve({
                            affectedRows: res.affectedRows
                        });
                    }else{
                        resolve({
                            result: 'No rows affected'
                        });
                    }
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },
    deleteFarm: function (id) {
        return new Promise((resolve, reject) => {
            try {
                connection.query('DELETE FROM FARM.farms Where id = ?', [id], (err, res) => {
                    if (err) {
                        reject(err.sqlMessage);
                        return;
                    }
                    if(res.affectedRows > 0){
                        resolve({
                            affectedRows: res.affectedRows
                        });
                    }else{
                        resolve({
                            result: 'No rows affected'
                        });
                    }
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },
    deletePound: function (id) {
        return new Promise((resolve, reject) => {
            try {
                connection.query('DELETE FROM FARM.pounds Where id = ?', [id], (err, res) => {
                    if (err) {
                        reject(err.sqlMessage);
                        return;
                    }
                    if(res.affectedRows > 0){
                        resolve({
                            affectedRows: res.affectedRows
                        });
                    }else{
                        resolve({
                            result: 'No rows affected'
                        });
                    }
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },
    deletePounds: function (id) {
        return new Promise((resolve, reject) => {
            try {
                connection.query('DELETE FROM FARM.pounds Where Farm_Id = ?', [id], (err, res) => {
                    if (err) {
                        reject(err.sqlMessage);
                        return;
                    }
                    if(res.affectedRows > 0){
                        resolve({
                            affectedRows: res.affectedRows
                        });
                    }else{
                        resolve({
                            result: 'No rows affected'
                        });
                    }
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },
};
