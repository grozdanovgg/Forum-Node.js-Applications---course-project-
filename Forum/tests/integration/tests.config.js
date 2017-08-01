const port = 3003;

const connectionString = 'mongodb://localhost/test-db';

const sessionSecret = 'tellus a secret';

const bodyParserType = 'json';

const user = {
    username: 'user1',
    posts: [{ title: 'post1', post: 'post1', comments: [] }],
};

module.exports = {
    port,
    connectionString,
    sessionSecret,
    bodyParserType,
    user,
};
