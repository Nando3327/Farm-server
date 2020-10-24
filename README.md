# Exercise


## RUN

1. Download project
2. execute `npm install` on terminal
3. execute `node server.js` on terminal

## TEST

1. execute `npm test`

### Api documentation

####The Api alows two methods (GET)
 - `/farms`

    - Return all the farms
    
 - `/farms/:id`
    
    - Return farms by id
 
 - `/pounds/:id`
    
    - Return pound by id

####The Api alows two methods (POST)
 - `/newFarm`

    - Create new farm, required Name
    
 - `/newPound`
    
    - Create new farm, required Name, Size and Id of the farm
    
####The Api alows two methods (PUT)
 - `/editFarm`

    - Edit farm, required Name, Id
    
 - `/editPound`
    
    - Create new farm, required Name, Size and Id of the pound
####The Api alows two methods (DELETE)
 - `/deleteFarm/:id`

    - DeleteFarm farm by d
    
 - `/deletePound/:id`
    
    - Delete pound by id

 - `/deletePounds/:id`
     
     - Delete pound by farm id
