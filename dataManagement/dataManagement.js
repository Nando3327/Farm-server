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
            const user =  {
                name: data.name,
                direction: 'PIO 12',
                phoneNumber: '2648776',
                cellPhone: '0999245146',
                email: 'fernando_3327@hotmail.com'
            };
            resolve(user);
        });
    }
  };
