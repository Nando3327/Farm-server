const lm = require('./logicManagement/logicManagement');

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/', (req, res) => {
    res.status(200).send("Welcome to API REST")
});

let response = {
    error: false,
    code: 200,
    message: '',
    data: {}
};

let errorResponse = {
    error: true,
    code: 500,
    message: ''
};



/**
 *GetFarms
 */
app.get('/farms', function (req, res) {
    lm.getFarms().then(data => {
        response.code = data.code;
        response.data = data.data;
        response.message = data.message;
        res.send(response);
    }).catch(err => {
        errorResponse.message = err;
        res.send(errorResponse);
    });
});

/**
 *GetFarms by id
 */
app.get('/farms/:id', function (req, res) {
    if(!req.params.id) {
        response = {
            error: true,
            code: 8000,
            message: 'Not Found'
        };
        res.send(response);
    }else{
        lm.getFarmById(req.params.id).then(data => {
            response.code = data.code;
            response.data = data.data;
            response.message = data.message;
            res.send(response);
        }).catch(err => {
            errorResponse.message = err;
            res.send(errorResponse);
        });
    }
});

/**
 *GetPounds by id_farm
 */
app.get('/pounds/:id', function (req, res) {
    if(!req.params.id) {
        response = {
            error: true,
            code: 8000,
            message: 'Not Found'
        };
        res.send(response);
    }else{
        lm.getPounds(req.params.id).then(data => {
            response.code = data.code;
            response.data = data.data;
            response.message = data.message;
            res.send(response);
        }).catch(err => {
            errorResponse.message = err;
            res.send(errorResponse);
        });
    }
});
/**
 *Create Farm
 */
app.post('/newFarm', function (req, res) {
    if(!req.body.name) {
        response = {
            error: true,
            code: 8001,
            message: 'Not register'
        };
        res.send(response);
    }else{
        lm.createFarm(req.body.name).then(data => {
            response.code = data.code;
            response.data = data.data;
            response.message = data.message;
            res.send(response);
        }).catch(err => {
            errorResponse.message = err;
            res.send(errorResponse);
        });
    }
});
/**
 *Create Pound by farm ID
 */
app.post('/newPound', function (req, res) {
    if(!req.body.name || typeof req.body.size != 'number' || !req.body.id) {
        response = {
            error: true,
            code: 8001,
            message: 'Not register'
        };
        res.send(response);
    }else{
        lm.createPound(req.body.name, req.body.size, req.body.id).then(data => {
            response.code = data.code;
            response.data = data.data;
            response.message = data.message;
            res.send(response);
        }).catch(err => {
            errorResponse.message = err;
            res.send(errorResponse);
        });
    }
});
/**
 *Edit Farm by ID
 */
app.put('/editFarm', function (req, res) {
    if(!req.body.name || !req.body.id) {
        response = {
            error: true,
            code: 8002,
            message: 'Not found'
        };
        res.send(response);
    }else{
        lm.editFarm(req.body.name, req.body.id).then(data => {
            response.code = data.code;
            response.data = data.data;
            response.message = data.message;
            res.send(response);
        }).catch(err => {
            errorResponse.message = err;
            res.send(errorResponse);
        });
    }
});
/**
 *Edit Pound by ID
 */
app.put('/editPound', function (req, res) {
    if(!req.body.name || typeof req.body.size != 'number' || !req.body.id) {
        response = {
            error: true,
            code: 8002,
            message: 'Not found'
        };
        res.send(response);
    }else{
        lm.editPound(req.body.name, req.body.size ,req.body.id).then(data => {
            response.code = data.code;
            response.data = data.data;
            response.message = data.message;
            res.send(response);
        }).catch(err => {
            errorResponse.message = err;
            res.send(errorResponse);
        });
    }
});
/**
 *Delete Farm by ID
 */
app.delete('/deleteFarm/:id', function (req, res) {
    if(!req.params.id) {
        response = {
            error: true,
            code: 8003,
            message: 'Not found'
        };
        res.send(response);
    }else{
        lm.deleteFarm(req.params.id).then(data => {
            response.code = data.code;
            response.data = data.data;
            response.message = data.message;
            res.send(response);
        }).catch(err => {
            errorResponse.message = err;
            res.send(errorResponse);
        });
    }
});
/**
 *Delete Pound by ID
 */
app.delete('/deletePound/:id', function (req, res) {
    if(!req.params.id) {
        response = {
            error: true,
            code: 8004,
            message: 'Not found'
        };
        res.send(response);
    }else{
        lm.deletePound(req.params.id).then(data => {
            response.code = data.code;
            response.data = data.data;
            response.message = data.message;
            res.send(response);
        }).catch(err => {
            errorResponse.message = err;
            res.send(errorResponse);
        });
    }
});
/**
 *Delete Pounds by ID Farm
 */
app.delete('/deletePounds/:id', function (req, res) {
    if(!req.params.id) {
        response = {
            error: true,
            code: 8004,
            message: 'Not found'
        };
        res.send(response);
    }else{
        lm.deletePounds(req.params.id).then(data => {
            response.code = data.code;
            response.data = data.data;
            response.message = data.message;
            res.send(response);
        }).catch(err => {
            errorResponse.message = err;
            res.send(errorResponse);
        });
    }
});


http.createServer(app).listen(8001, () => {
    console.log('Server started at http://localhost:8001');
});
