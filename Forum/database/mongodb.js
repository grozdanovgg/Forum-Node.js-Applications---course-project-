const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectID;

const database = class Database {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }

    insert(collection, record) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.connectionString)
                .then((db) => {
                    const insertCollection = db.collection(collection);
                    insertCollection.insert(record);
                    resolve(insertCollection
                        .find()
                        .toArray());
                });
        });
    }

    update(collection, filter, record) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.connectionString)
                .then((db) => {
                    const updateCollection = db.collection(collection);
                    updateCollection.update(filter, record);
                    resolve(updateCollection
                        .find()
                        .toArray());
                });
        });
    }

    showAll(collection) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.connectionString)
                .then((db) => {
                    const showCollection = db.collection(collection)
                        .find()
                        .toArray();
                    resolve(showCollection);
                });
        });
    }

    find(collection, filter) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.connectionString)
                .then((db) => {
                    const findCollection = db.collection(collection)
                        .find(filter)
                        .toArray();
                    resolve(findCollection);
                })
                .catch(reject);
        });
    }

    findOne(collection, filter) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.connectionString)
                .then((db) => {
                    const found = db.collection(collection)
                        .findOne(filter);
                    resolve(found);
                })
                .catch(reject);
        });
    }

    findById(collection, id) {
        var objectId = new ObjectID(id);
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.connectionString)
                .then((db) => {
                    const findCollection = db.collection(collection)
                        .find({'_id': objectId})
                        .toArray();
                    resolve(findCollection);
                })
                .catch(reject);
        });
    }

    delete(collection, filter) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.connectionString)
                .then((db) => {
                    const deleteCollection = db.collection(collection);
                    deleteCollection.deleteMany(filter);
                    resolve(deleteCollection
                        .find()
                        .toArray());
                });
        });
    }

    deleteAll(collection) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.connectionString)
                .then((db) => {
                    const deleteCollection = db.collection(collection);
                    deleteCollection.deleteMany({});
                    resolve(deleteCollection
                        .find()
                        .toArray());
                });
        });
    }
};

module.exports = database;
