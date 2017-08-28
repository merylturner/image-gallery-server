
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = require('chai').assert;
const app = require('../../lib/app');
const request = chai.request(app);

process.env.MONGODB_URI = 'mongodb://localhost:27017/images-test';
require('../../lib/connect');

const connection = require('mongoose').connection;

describe('images api', () => {
    // before(() => connection.dropDatabase());
    
    it('initial Get returns empty list', () => {
        return request.get('/api/images')
            .then(req => {
                const images = req.body;
                assert.deepEqual(images, []);
            });
    });
});

