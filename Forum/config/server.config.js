const port = 3000;

const connectionString = 'mongodb://ubuntu@ec2-52-57-79-63.eu-central-1.compute.amazonaws.com/MongoDB-Ubuntu';
// const connectionString = 'mongodb://myuser:ednodvetri@ds011462.mlab.com:11462/tellusdb';
// const connectionString = 'mongodb://localhost/items-db';

const sessionSecret = 'tellus a secret';

const bodyParserType = 'url';

const categories = ['animals', 'cars', 'clothing', 'man', 'school', 'space',
    'sport', 'women', 'sex', 'movies', 'music',
    'programming', 'work', 'other', 'games',
];

// @ts-ignore
module.exports = {
    port,
    connectionString,
    sessionSecret,
    categories,
    bodyParserType,
};
