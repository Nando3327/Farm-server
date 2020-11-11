let dm = require('../dataManagement/dataManagement');

module.exports = {
  getFarms: function () {
    return dm.getFarms().then(data => {
      return {
        code: 200,
        message: 'OK',
        data: {
          farms: data
        }
      };
    }).catch(e => {
      console.log(e);
      throw e
    });
  },
  getFarmById: function (id) {
    return dm.getFarmById(id).then(data => {
      return {
        code: 200,
        message: 'OK',
        data: {
          farms: data
        }
      };
    }).catch(e => {
      console.log(e);
      throw e
    });
  },
  getPounds: function (id) {
    return dm.getPounds(id).then(data => {
      let size = 0;
      data.forEach(d => {
        size = size + d.Size
      });
      return {
        code: 200,
        message: 'OK',
        data: {
          pounds: data,
          size: parseFloat(size).toFixed(2)
        }
      };
    }).catch(e => {
      console.log(e);
      throw e
    });
  },
  createFarm: function (name) {
    return dm.createFarm(name).then(data => {
      const response = {
        code: 200,
        message: 'OK',
        data: {}
      };
      if (!data) {
        response.code = 8001;
        response.message = 'Not register';
      }
      return response;
    }).catch(e => {
      console.log(e);
      throw e
    });
  },
  createPound: function (name, size, id) {
    return dm.createPound(name, size, id).then(data => {
      const response = {
        code: 200,
        message: 'OK',
        data: {}
      };
      if (!data) {
        response.code = 8001;
        response.message = 'Not register';
      }
      return response;
    }).catch(e => {
      console.log(e);
      throw e
    });
  },
  editFarm: function (name, id) {
    return dm.editFarm(name, id).then(data => {
      const response = {
        code: 200,
        message: 'OK',
        data: {}
      };
      if (!data) {
        response.code = 8002;
        response.message = 'Not found';
      } else {
        response.data = data;
      }
      return response;
    }).catch(e => {
      console.log(e);
      throw e
    });
  },
  editPound: function (name, size, id) {
    return dm.editPound(name, size, id).then(data => {
      const response = {
        code: 200,
        message: 'OK',
        data: {}
      };
      if (!data) {
        response.code = 8002;
        response.message = 'Not found';
      } else {
        response.data = data;
      }
      return response;
    }).catch(e => {
      console.log(e);
      throw e
    });
  },
  deleteFarm: function (id) {
    return dm.deletePounds(id).then(dt => {
      const response = {
        code: 200,
        message: 'OK',
        data: {
          pounds: {},
          farm: {}
        }
      };
      if (dt) {
        response.data.pounds = dt;
      }
      return dm.deleteFarm(id).then(data => {
        if (!data) {
          response.code = 8003;
          response.message = 'Not found';
        } else {
          response.data.farm = data;
        }
        return response;
      }).catch(e => {
        console.log(e);
        throw e
      });
    }).catch(e => {
      console.log(e);
      throw e
    });
  },
  deletePound: function (id) {
    return dm.deletePound(id).then(data => {
      const response = {
        code: 200,
        message: 'OK',
        data: {}
      };
      if (!data) {
        response.code = 8004;
        response.message = 'Not found';
      } else {
        response.data = data;
      }
      return response;
    }).catch(e => {
      console.log(e);
      throw e
    });
  },
  deletePounds: function (id) {
    return dm.deletePounds(id).then(data => {
      const response = {
        code: 200,
        message: 'OK',
        data: {}
      };
      if (!data) {
        response.code = 8004;
        response.message = 'Not found';
      } else {
        response.data = data;
      }
      return response;
    }).catch(e => {
      console.log(e);
      throw e
    });
  },
};
