
const assert = require('chai').assert;
const Image = require('../../lib/models/image');
const expectedValidation = () => {
    throw new Error('expected validation errors');
};

describe ('images model', () => {
    it('validates good model', () => {
        const image = new Image({
            title: 'New bunny',
            description: 'New description',
            url: 'bunnyimage.png'
        });
        return image.validate();
    });

    it('fails validation with missing field', () => {
        const image = new Image();
        return image.validate()
            .then(expectedValidation, err => {
                const errors = err.errors;
                assert.ok(errors.title && errors.title.kind === 'required');
                assert.ok(errors.description && errors.description.kind === 'required');
                assert.ok(errors.url && errors.url.kind === 'required');
            });
    });
});