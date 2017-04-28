# Pets Master

## Install Instruction

Front-End

```
cd client
npm install
npm start
```

Back-End

```
cd server
npm install
npm start
```

## Test

Front-End

```
cd client
npm test
```

Back-End

```
cd server
npm test
```

## Codebase

All front-end codes are in client folder and all back-end codes are in server folder. The front-end parts are implemented via React families and the backend are implemented via NodeJS.

## Database
```
wget https://downloads.mongodb.org/osx/mongodb-shell-osx-ssl-x86_64-3.4.4.tgz
tar xzvf mongodb-shell-osx-ssl-x86_64-3.4.4.tgz
./mongodb-osx-x86_64-3.4.4/mongo "mongodb://cluster0-shard-00-00-qx1je.mongodb.net:27017,cluster0-shard-00-01-qx1je.mongodb.net:27017,cluster0-shard-00-02-qx1je.mongodb.net:27017/test?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl --username MastersParty --password MastersParty
use Cluster0
db.accounts.find()
```
