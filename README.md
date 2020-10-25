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


##DATABASE

 - the project use mySql 
    -The schema name must be FARM
    -The following scripts must be executed:
 
 `create table farms
 (
 	Name varchar(30) not null,
 	Id int not null auto_increment
 		primary key,
 	constraint farms_id_uindex
 		unique (Id),
 	constraint farms_Name_uindex
 		unique (Name)
 );`
 
 
 `create table pounds
 (
 	Id int not null auto_increment
 		primary key,
 	Name varchar(30) not null,
 	Size decimal(10,2) not null,
 	Farm_Id int not null,
 	constraint pounds_Id_uindex
 		unique (Id),
 	constraint pounds_farms_Id_fk
 		foreign key (Farm_Id) references farm.farms (Id)
 );
 create index pounds_farms_Id_fk
 	on pounds (Farm_Id);`
 
 
   -The path: dataManagement/dataManagement.js in the line 5 contains the password for the connection
 
 
