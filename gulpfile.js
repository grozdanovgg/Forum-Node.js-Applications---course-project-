const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const { MongoClient } = require('mongodb');

const config = {
    connectionString: 'mongodb://localhost/test-db',
    port: 3002,
    bodyParserType: 'url',
    categories: ['animals', 'cars', 'clothing', 'man', 'school', 'space', 'sport', 'women', 'sex', 'movies', 'music', 'programming', 'work', 'other', 'games']
}

// @ts-ignore
gulp.task('server-start', ['server-stop'], () => {
    return Promise.resolve()
        .then(() => require('./Forum/app').init(config))
        .then((app) => {
            const port = process.env.PORT || config.port;
            return app.listen(config.port, () =>
                console.log(`Magic is running at :${port}`));
        })
        .then((server) => {
            return require('socket.io').listen(server);
        })
        .then((io) => {
            io.on('connection', function(socket) {
                // Server side receiving the message then emmiting 
                // it again for each client to handle
                socket.on('chat message', (msgData) => {
                    io.emit('chat message', msgData);
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
})


gulp.task('server-stop', () => {
    return MongoClient.connect(config.connectionString)
        .then((db) => {
            db.dropDatabase();
        })
})

// @ts-ignore
gulp.task('tests:browser', ['server-start'], () => {
    return gulp.src('./Forum/tests/browser/**/*.js')
        .pipe(mocha({
            // reporter: 'nyan',
            timeout: 10000,
        }))
        .once('end', () => {
            // @ts-ignore
            gulp.start('server-stop');
        })
})
