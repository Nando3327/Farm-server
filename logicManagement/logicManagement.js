let dm = require('../dataManagement/dataManagement');

let sortFilterData = function (data, filter, max, sort, orientation) {
    let responseData = filterData(data, filter, max);
    return sortData(responseData, sort, orientation);
};

let filterData = function (data, filter, max) {
    if (max === "true") {
        return data.filter(x => {
            const words = x.title.split(' ');
            return words.length > filter;
        })
    }
    return data.filter(x => {
        const words = x.title.split(' ');
        return words.length <= filter;
    })
};

let sortData = function (data, sort, orientation) {
    if (orientation === 'asc') {
        return data.sort(function (a, b) {
            return a[sort] - b[sort];
        });
    }
    return data.sort(function (a, b) {
        return b[sort] - a[sort];
    });
};

module.exports = {
    getData: function (filter, max, sort, orientation, getAllData) {
        return dm.getData().then($ => {
            const dataTemplate = $('.itemlist > tbody > tr ');
            const header = [];
            const body = [];
            dataTemplate.each(function () {
                const rank = $(this).find('.rank').text();
                const title = $(this).find('.storylink').text();
                if (rank !== '' && title !== '') {
                    header.push({
                        id: header.length,
                        rank: rank,
                        title: title
                    });
                }
            });
            dataTemplate.each(function () {
                const score = $(this).find('.score').text();
                const comments = $(this).find('.subtext').text();
                if (comments !== '') {
                    body.push({
                        id: body.length,
                        score: (score === '') ? 0 : parseInt(score.split(' ')[0]),
                        comments: (comments.indexOf('comment') > -1) ? parseInt(comments.split('|')[2].trim().split(' ')[0]) : 0
                    });
                }
            });
            const data = [];
            header.forEach(function (h) {
                for (let i = 0; i < body.length; i++) {
                    if (h.id === body[i].id) {
                        data.push({
                            rank: h.rank,
                            title: h.title,
                            score: body[i].score,
                            comments: body[i].comments
                        });
                        return;
                    }
                }
            });
            if (getAllData) {
                return data;
            }
            return sortFilterData(data, filter, max, sort, orientation)
        });
    },

    getUserInfo: function (user) {
        return dm.getUserData(user).then(u => {
            return u;
        });
    }
};
