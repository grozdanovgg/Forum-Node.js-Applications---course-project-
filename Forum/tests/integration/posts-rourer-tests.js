const { init } = require('../../app'); // eslint-disable-line no-unused-vars
const config = require('./tests.config');
const request = require('supertest');
const { expect } = require('chai'); // eslint-disable-line no-unused-vars

describe('/posts', () => {
    describe('GET /:category', () => {
        const async = () => {
            return Promise.resolve();
        };
        async()
        .then(() => require('../../app').init(config))
            .then((app) => {
                it('expect to return 200 when connected to db', (done) => {
                    request(app)
                        .get('/posts/Other')
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
    describe('GET /:category/:id', () => {
        const async = () => {
            return Promise.resolve();
        };
        async()
        .then(() => require('../../app').init(config))
            .then((app) => {
                it('expect to return 200 when connected to db', (done) => {
                    request(app)
                        .get('/posts/Other/597f546b1b0d412a5807a7d0')
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
    describe('POST /:category', () => {
        const async = () => {
            return Promise.resolve();
        };
        async()
        .then(() => require('../../app').init(config))
            .then((app) => {
                it('expect to return 302 and redirect to same page', (done) => {
                    request(app)
                        .post('/posts/Other')
                        .send({
                            title: 'post5',
                            post: 'the body of post 5',
                        })
                        .set('Accept', 'application/json')
                        .expect(302)
                        .end((err, res) => {
                            if (err) {
                                return done(err);
                            }
                            return done();
                        });
                });
            });
    });
    describe('POST /:category/:id', () => {
        const async = () => {
            return Promise.resolve();
        };
        async()
        .then(() => require('../../app').init(config))
            .then((app) => {
                it('expect to return 200 when there is a post', (done) => {
                    request(app)
                        .post('/posts/Other')
                        .send({
                            comment: 'comment1',
                        })
                        .set('Accept', 'application/json')
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
