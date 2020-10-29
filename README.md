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
 
 
    CREATE SCHEMA IF NOT EXISTS FARM;
    
    use FARM;
    
    create table IF NOT EXISTS farms
     (
     	Name varchar(30) not null,
     	Id int not null auto_increment
     		primary key,
     	constraint farms_id_uindex
     		unique (Id),
     	constraint farms_Name_uindex
     		unique (Name)
     );
    
    
    create table IF NOT EXISTS pounds
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
    
    
    set @x := (select count(*) from information_schema.statistics where table_name = 'pounds' and index_name = 'pounds_farms_Id_fk' and table_schema = 'FARM');
    set @sql := if( @x > 0, 'select ''Index exists.''', 'Alter Table pounds ADD Index pounds_farms_Id_fk (Farm_Id);');
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    
    
    # TO ALTER USER
    # ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'efestor2411'
 
 
   -The path: dataManagement/dataManagement.js in the line 5 contains the password for the connection
 
 
