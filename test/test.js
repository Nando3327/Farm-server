"use strict";

let assert = require('assert');
let requesttest = require('supertest');
let request = requesttest("http://localhost:8001");

describe('GET tests', function () {
  it('Return ok if farms search code is 200', function (done) {
    request.get('/farms').then((response) => {
      assert.equal(response.status, 200);
      done();
      this.skip()
    })
  });
  it('Return ok if farm search code is 200', function (done) {
    request.get('/farms/1').then((response) => {
      assert.equal(response.status, 200);
      done();
      this.skip()
    })
  });
  it('Return ok if pound search code is 200', function (done) {
    request.get('/pounds/1').then((response) => {
      assert.equal(response.status, 200);
      done();
      this.skip()
    })
  });
});
describe('POST tests', function () {
  it('Return ok if farms can be created code is 200', function (done) {
    request.post('/newFarm').send({name: "TEST77"}).then((response) => {
      assert.equal(response.status, 200);
      done();
      this.skip()
    })
  });
  it('Return ok if pound can be created code is 200', function (done) {
    request.post('/newPound').send({
      name: "TEST_2",
      size: 99.49,
      id: 9
    }).then((response) => {
      assert.equal(response.status, 200);
      done();
      this.skip()
    })
  });
});
describe('PUT tests', function () {
  it('Return ok if farms can be update code is 200', function (done) {
    request.put('/editFarm').send({name: "TEST77", id: 1}).then((response) => {
      assert.equal(response.status, 200);
      done();
      this.skip()
    })
  });
  it('Return ok if pound can be update code is 200', function (done) {
    request.put('/editPound').send({
      name: "TEST_2",
      size: 99.49,
      id: 9
    }).then((response) => {
      assert.equal(response.status, 200);
      done();
      this.skip()
    })
  });
});
describe('DELETE tests', function () {
  it('Return ok if farms can be deleted code is 200', function (done) {
    request.delete('/deleteFarm/1').then((response) => {
      assert.equal(response.status, 200);
      done();
      this.skip()
    })
  });
  it('Return ok if pound can be deleted based on the id farm code is 200', function (done) {
    request.delete('/deletePounds/1').then((response) => {
      assert.equal(response.status, 200);
      done();
      this.skip()
    })
  });
  it('Return ok if pound can be deleted code is 200', function (done) {
    request.delete('/deletePound/1').then((response) => {
      assert.equal(response.status, 200);
      done();
      this.skip()
    })
  });
});
