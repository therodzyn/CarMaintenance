# CarMaintenance  
### ![alt text](https://raw.githubusercontent.com/therodzyn/CarMaintenance/master/public/img/favicon-96x96.png)
**Automatic car management system.**

## Dependencies
+ Node.js
+ MongoDB

## Usage
**CMD (Terminal) in project's folder:**
```
npm install
```
**Import Mongo database (from json folder):**
```
mongoimport --db CarMaintenance --collection carsDatabase --file carsDatabase.json --jsonArray
mongoimport --db CarMaintenance --collection news --file news.json --jsonArray
```

**URL:**
```
localhost:3000
```

## Releases
+ **6.0.0** - Ready APP
+ **5.0.0** - Backbone - All APP Sites
+ **4.4.0** - Backbone - Account Edition and Delete
+ **4.3.0** - Backbone - News
+ **4.2.0** - Backbone - Map, GoogleMaps API
+ **4.1.0** - Backbone - Garage CRUD
+ **4.0.0** - Backbone - Garage Views
+ **3.0.0** - Login and Registration
+ **2.0.0** - All static sites with full RWD
+ **1.2.0** - Bootstrap
+ **1.1.0** - GruntJS & SASS
+ **1.0.0** - main site 
