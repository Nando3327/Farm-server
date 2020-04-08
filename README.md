# Exercise


## RUN

1. Download project
2. execute `npm install` on terminal
3. execute `node server.js` on terminal

## TEST

1. execute `npm test`

### Requirements

- Filter all previous entries with more than five words in the title ordered by the amount of comments first.

    Solution: paste on url http://localhost:8001/data/5/true/comments/desc

- Filter all previous entries with less than or equal to five words in the title ordered by points.

    Solution: paste on url http://localhost:8001/data/5/false/score/desc


### Api documentation

    The Api alows two methods (GET)

 - `/data/:filter/:max/:sort/:orientation`

    - filter: number of words in title
    - max: "true" indicates that the number of words in title must be greater than filter, otherwise words in title must be smaller than filter 
    - sort: indicates the field by which it will be ordered
    - orientation: sort in asc/desc order

 - `/data`

    - return all data
 