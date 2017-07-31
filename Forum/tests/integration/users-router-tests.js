const { init } = require('../../app');
const config = require('./tests.config');
const request = require('supertest');
const { expect } = require('chai');

describe('/users', () => {
    describe('GET /:username', () => {
        const async = () => {
            return Promise.resolve();
        };
        async()
        .then(() => require('../../app').init(config))
            .then((app) => {
                it('expect to return 200 when connected to db', (done) => {
                    request(app)
                        .get('/users/user1')
                        .expect(200)
                        .end((err, res) => {
                            if (err) {
                                return done(err);
                            }
                            return done();
                        });
                });
            });
    });
    describe('GET /:username/settings', () => {
        const async = () => {
            return Promise.resolve();
        };
        async()
        .then(() => require('../../app').init(config))
            .then((app) => {
                it('expect to return 404 when not authenticated', (done) => {
                    request(app)
                        .get('/users/user1/settings')
                        .expect(404)
                        .end((err, res) => {
                            if (err) {
                                return done(err);
                            }
                            return done();
                        });
                });
            });
    });
    describe('GET /:username/:id', () => {
        const async = () => {
            return Promise.resolve();
        };
        async()
        .then(() => require('../../app').init(config))
            .then((app) => {
                it('expect to return 200 when there is this post', (done) => {
                    request(app)
                        .get('/users/user1/597f546b1b0d412a5807a7d0')
                        .expect(200)
                        .end((err, res) => {
                            if (err) {
                                return done(err);
                            }
                            return done();
                        });
                });
            });
    });
});
