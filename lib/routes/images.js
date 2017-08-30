
const Router = require('express').Router;
const router = Router();
const Image = require('../models/image');

router
    .get('/', (req, res, next) => {
        Image.find()
            .lean()
            .then(images => res.send(images))
            .catch(next);
    })

    .post('/', (req, res, next) => {        
        new Image(req.body)
            .save()
            .then(image => res.send(image))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        console.log('req body', req.body);
        Image.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({
                    removed: !!response
                });
            })
            .catch(next);
    });

module.exports = router;