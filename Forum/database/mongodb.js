const { MongoClient } = require('mongodb');

const database = class Database {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }

    insert(collection, record) {
        MongoClient.connect(this.connectionString)
            .then(db => {
                const insertCollection = db.collection(collection);

                insertCollection.insert(record);

                return insertCollection
                    .find()
                    .toArray();
            })
            .then(items => {
                console.log(items);
            });
    }

    showAll(collection) {
        MongoClient.connect(this.connectionString)
            .then(db => {
                const showCollection = db.collection(collection);
                return showCollection
                    .find()
                    .toArray();
            }).then(items => {
                console.log(items);
            });
    }
}

module.exports = database;