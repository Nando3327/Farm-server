const lm = require('./logicManagement/logicManagement');
const LoginModel = require('./models/login.model');

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.status(200).send("Welcome to API REST")
});

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: '',
    data: {}
};

/**
 * get data filter by values
 * filter: number of words in title
 * max: "true" indicates that the number of words in title must be greater than filter, otherwise words in title must be smaller than filter
 * sort: indicates the field by which it will be ordered
 * orientation: sort in asc/desc order
 */
app.get('/data/:filter/:max/:sort/:orientation', (req, res) => {
    lm.getData(parseInt(req.params.filter), req.params.max, req.params.sort, req.params.orientation, false).then(data => {
        res.status(200).send({message: 'OK', data: data});
    })
});

/**
 * get all data
 */
app.get('/data', (req, res) => {
    lm.getData(0, '', '', '', true).then(data => {
        res.status(200).send({message: 'OK', data: data});
    })
});

/**
 *Ejemplo post
 */
app.post('/login', function (req, res) {
    if(!req.body.name || !req.body.password) {
        respuesta = {
            error: true,
            codigo: 9000,
            mensaje: 'Error de usuario y/o contraseña'
        };
        res.send(respuesta);
    }else{
        const user = new LoginModel(req.body.name, req.body.password);
        lm.getUserInfo(user).then(data => {
            respuesta.data = data;
            res.send(respuesta);
        });
    }
});

http.createServer(app).listen(8001, () => {
    console.log('Server started at http://localhost:8001');
});
