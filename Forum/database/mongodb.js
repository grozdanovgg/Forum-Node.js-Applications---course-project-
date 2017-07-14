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

    update(collection, filter, record) {
        MongoClient.connect(this.connectionString)
            .then(db => {
                const updateCollection = db.collection(collection);

                updateCollection.update(filter, record);

                return updateCollection
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

    find(collection, filter) {
        MongoClient.connect(this.connectionString)
            .then(db => {
                const showCollection = db.collection(collection);
                return showCollection
                    .find(filter)
                    .toArray();
            }).then(items => {
                console.log(items);
            });
    }

    delete(collection, filter) {
        MongoClient.connect(this.connectionString)
            .then(db => {
                const deleteCollection = db.collection(collection);
                deleteCollection.deleteMany(filter);

                return deleteCollection
                    .find()
                    .toArray();
            }).then(items => {
                console.log(items);
            });
    }

    deleteAll(collection) {
        MongoClient.connect(this.connectionString)
            .then(db => {
                const deleteCollection = db.collection(collection);
                deleteCollection.deleteMany({});

                return deleteCollection
                    .find()
                    .toArray();
            }).then(items => {
                console.log(items);
            });
    }
}

module.exports = database;