const request = require('supertest');
const app = require('../src/app');
const StringService = require('../src/services/stringService');

describe('String Analysis API', () => {
    let stringService;

    beforeAll(() => {
        stringService = new StringService();
    });

    afterEach(() => {
        stringService.clearStrings(); // Assuming there's a method to clear the stored strings for testing
    });

    test('POST /strings - create a new string', async () => {
        const response = await request(app)
            .post('/strings')
            .send({ value: 'hello' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.value).toBe('hello');
    });

    test('GET /strings/:id - retrieve a string by ID', async () => {
        const createdString = await stringService.createString('test string');
        
        const response = await request(app)
            .get(`/strings/${createdString.id}`);

        expect(response.status).toBe(200);
        expect(response.body.value).toBe('test string');
    });

    test('GET /strings - retrieve all strings', async () => {
        await stringService.createString('first string');
        await stringService.createString('second string');

        const response = await request(app)
            .get('/strings');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    test('DELETE /strings/:id - delete a string by ID', async () => {
        const createdString = await stringService.createString('string to delete');

        const response = await request(app)
            .delete(`/strings/${createdString.id}`);

        expect(response.status).toBe(204);
    });

    test('GET /strings/filter - filter strings by property', async () => {
        await stringService.createString('hello world');
        await stringService.createString('hello');

        const response = await request(app)
            .get('/strings/filter')
            .query({ value: 'hello' });

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});