/* eslint-disable no-process-env*/
/* eslint-disable no-undef*/
const config = require('./config/server.config');

const async = () => {
    return Promise.resolve();
};
async()
.then(() => require('./app').init(config))
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
