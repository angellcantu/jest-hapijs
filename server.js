'use strict';

const hapi = require('@hapi/hapi');
const users = [
    { id: 1, name: 'Angel' },
    { id: 2, name: 'Jose' },
    { id: 3, name: 'Angel Cantu' }
];

// Creating the server
const server = hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
});

// Routes
server.route({
    method: 'GET',
    path: '/',
    handler: (request, response) => 'Hello World!!'
});

server.route({
    method: 'POST',
    path: '/users',
    handler: (request, response) => {
        if (request.payload && request.payload.name) {
            let { name } = request.payload;
            let check_user = users.find(user => user.name == name);
            if (check_user) {
                return response.response('The user already exist').code(422);
            }
            return response.response('User added succesfully').code(200);
        } else {
            return response.response('Invalid user').code(422);
        }
    }
});

server.route({
    method: 'GET',
    path: `/users/{id}`,
    handler: (request, response) => {
        let user = users.find(user => user.id == Number(request.params.id));
        if (!user) {
            return response.response('The user does not exist').code(404);
        }
        return user;
    }
});

server.route({
    method: 'GET',
    path: '/users',
    handler: (request, response) => users
});

// Init server
const init = async () => {
    await server.start();
    console.log('Server running on %ss:', server.info.uri);
};

process.on('unhandledRejection', err => {
    process.exit(1);
});

init();

module.exports = server;