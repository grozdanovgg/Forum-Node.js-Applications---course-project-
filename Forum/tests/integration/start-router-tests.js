const { init } = require('../../app');
const config = require('./tests.config');
const noDbConfig = require('./test.config-nodb');
const request = require('supertest');
const { expect } = require('chai');

describe('/', () => {
    describe('GET /', () => {
        const async = () => {
            return Promise.resolve();
        };
        async()
        .then(() => require('../../app').init(config))
            .then((app) => {
                it('expect to return 200 when connected to db', (done) => {
                    request(app)
                        .get('/')
                        .expect(200)
                        .end((err, res) => {
                            if (err) {
                                return done(err);
                            }
                            return done();
                        });
                });
            });
        async()
        .then(() => require('../../app').init(noDbConfig))
            .then((app) => {
                it('expect to return 404 when not connected to db', (done) => {
                    request(app)
                        .get('/')
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
});
