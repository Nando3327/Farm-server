const mysql = require('mysql');
const env = require('../environment');
const connection = mysql.createPool({
  connectionLimit: env.db.connectionLimit,
  host: env.db.host,
  user: env.db.user,
  password: env.db.password
});
connection.getConnection((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const farms = 'FARM.farms';
const ponds = 'FARM.pounds';

module.exports = {
  getFarms: function () {
    return new Promise((resolve, reject) => {
      try {
        const query = `SELECT Id, Name 
        FROM ${farms}`;
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
        const query = `SELECT F.Id, F.Name, SUM(P.Size) as Size 
        FROM ${farms} F INNER JOIN ${ponds} P ON F.Id = P.Farm_Id 
        WHERE F.Id = ? GROUP BY F.Id `;
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
        const query = `SELECT Id, Name, Size 
        FROM ${ponds} 
        WHERE Farm_Id = ? `;
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
        connection.query(`INSERT ${farms} SET ?`, farm, (err, res) => {
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
        connection.query(`INSERT ${ponds} SET ?`, pound, (err, res) => {
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
        connection.query(`UPDATE ${farms} SET Name = ? Where id = ?`, [name, id], (err, res) => {
          if (err) {
            reject(err.sqlMessage);
            return;
          }
          if (res.affectedRows > 0) {
            resolve({
              affectedRows: res.affectedRows
            });
          } else {
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
        connection.query(`UPDATE ${ponds} SET Name = ?, Size = ? Where id = ?`, [name, size, id], (err, res) => {
          if (err) {
            reject(err.sqlMessage);
            return;
          }
          if (res.affectedRows > 0) {
            resolve({
              affectedRows: res.affectedRows
            });
          } else {
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
        connection.query(`DELETE FROM ${farms} Where id = ?`, [id], (err, res) => {
          if (err) {
            reject(err.sqlMessage);
            return;
          }
          if (res.affectedRows > 0) {
            resolve({
              affectedRows: res.affectedRows
            });
          } else {
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
        connection.query(`DELETE FROM ${ponds} Where id = ?`, [id], (err, res) => {
          if (err) {
            reject(err.sqlMessage);
            return;
          }
          if (res.affectedRows > 0) {
            resolve({
              affectedRows: res.affectedRows
            });
          } else {
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
        connection.query(`DELETE FROM ${ponds} Where Farm_Id = ?`, [id], (err, res) => {
          if (err) {
            reject(err.sqlMessage);
            return;
          }
          if (res.affectedRows > 0) {
            resolve({
              affectedRows: res.affectedRows
            });
          } else {
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
