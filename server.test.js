'use strict';

const server = require('./server');

beforeAll(done => {
    server.events.on('start', () => {
        done();
    });
});

afterAll(done => {
    server.events.on('stop', () => {
        done();
    });
    server.stop();
});

// Testing
test('Should success server connection', async () => {
    let options = {
        method: 'GET',
        url: '/'
    };
    let data = await server.inject(options);
    expect(data.statusCode).toBe(200);
});

test('Should get hello world title', async () => {
    let options = {
        method: 'GET',
        url: '/'
    };
    let data = await server.inject(options);
    expect(data.result).toBe('Hello World!!');
});

describe('Not string match', () => {
    const match = 'Other text';
    it('Not match', async () => {
        let options = {
            method: 'GET',
            url: '/'
        };
        let data = await server.inject(options);
        expect(data.result).not.toBe(match);
    });
});