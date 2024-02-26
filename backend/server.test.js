const { getQuestions, getEvaluation,app } = require('./server');
const request = require('supertest');

test('getQuestions function to return an array of questions', async () => {
    const response = await getQuestions('golang', 'expert', 5, 'captain jack sparrow');
    expect(response).toBeDefined();
    expect(response).toHaveProperty('Questions');
    expect(response.Questions).toHaveLength(5);
});

test('getEvaluation function to return an object with evaluation, explanation, and grade', async () => {
    const response = await getEvaluation('What is JavaScript?', 'JavaScript is a programming language');
    expect(response).toBeDefined();
    expect(response).toHaveProperty('evaluation');
    expect(response).toHaveProperty('explanation');
    expect(response).toHaveProperty('grade');
});

test('server to be running', async () => { 
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello LRNR!');
});

test('getEvaluation function will return correct evaluation with 3/3', async () => {
    const response = await getEvaluation('What is AWS Lambda?', 'AWS Lambda is a serverless computing service provided by Amazon Web Services');
    expect(response).toBeDefined();
    expect(response).toHaveProperty('evaluation');
    expect(response).toHaveProperty('explanation');
    expect(response).toHaveProperty('grade');
    expect(response.evaluation).toBe('correct');
    expect(response.grade).toBe('3/3');
});

