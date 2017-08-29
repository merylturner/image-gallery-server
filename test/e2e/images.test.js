
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
    before(() => connection.dropDatabase());
    
    it('initial Get returns empty list', () => {
        return request.get('/api/images')
            .then(req => {
                const images = req.body;
                assert.deepEqual(images, []);
            });
    });

    let image1 = { title: 'cute bunny', description: 'very cute bunny', url: 'http://f.cl.ly/items/3g3J1G0w122M360w380O/3726490195_f7cc75d377_o.jpg' };

    let image2 = { title: 'another cute bunny', description: 'very, very cute bunny', url: 'http://static.boredpanda.com/blog/wp-content/uploads/2015/09/cute-bunnies-25__605.jpg' };

    let image3 = { title: 'fairly cute bunny', description: 'pretty much a cute bunny', url: 'http://static.boredpanda.com/blog/wp-content/uploads/2015/09/cute-bunnies-110__605.jpg' };

    let image4 = { title: 'ugly bunny', description: 'the ugliest bunny you\'ve ever seen', url: 'https://s-media-cache-ak0.pinimg.com/736x/5c/40/1f/5c401f8c1d1075cc5b49db6cda84700b--kungfu-baby-wombat.jpg' };
    
    function saveImage(image) {
        return request
            .post('/api/images')
            .send(image)
            .then(res => res.body);
    }

    it('gets all images', () => {
        return Promise.all([
            saveImage(image1),
            saveImage(image2),
            saveImage(image3),
            saveImage(image4)
        ])
            .then(() => request.get('/api/images'))
            .then(res => res.body)
            .then(images => {
                assert.equal(images.length, 4);
            }); 
    });
});