const { init } = require('../../app'); // eslint-disable-line no-unused-vars
const config = require('./tests.config');
const request = require('supertest');
const { expect } = require('chai'); // eslint-disable-line no-unused-vars
const Database = require('../../database/mongodb');

describe('/auth', () => {
    const async = () => {
        return Promise.resolve();
    };
    async()
    .then(() => require('../../app').init(config))
        .then((app) => {
            it('GET /login expect to return 200', (done) => {
                request(app)
                    .get('/auth/login')
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
            });
            it('GET /register expect to return 200', (done) => {
                request(app)
                    .get('/auth/register')
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
            });
            it('GET /logout expect to return 200', (done) => {
                request(app)
                    // @ts-ignore
                    .set('Accept', 'application/json')
                    .get('/auth/logout')
                    .expect(302)
                    .expect('Location', '/')
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
            });
            it('GET /profilePicture expect to return 200', (done) => {
                request(app)
                    .get('/auth/profilePicture')
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
            });
            it('POST /profilePicture expect to return 302', (done) => {
                request(app)
                    .post('/auth/profilePicture')
                    .expect(302)
                    .expect('Location', '/auth/login')
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
            });
            it('POST /login expect to return 200', (done) => {
                request(app)
                    .post('/auth/login')
                    .send({
                        username: 'user1',
                        password: '0000',
                    })
                    .set('Accept', 'application/json')
                    .expect(302)
                    .expect('Location', '/')
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
            });
            it('POST /register expect to return 200', (done) => {
                request(app)
                    .post('/auth/register')
                    .send({
                        username: 'user2',
                        email: 'user2@abv.bg',
                        password: '0000',
                        password_confirm: '0000',
                    })
                    .set('Accept', 'application/json')
                    .expect(302)
                    .expect('Location', '/auth/profilePicture')
                    .end((err, res) => {
                        const connectionstring = config.connectionString;
                        const database = new Database(connectionstring);
                        database.delete('users', { username: 'user2' });
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
            });
        });
});
