// IMPORTANT: Ensure localhost server is running before running the tests (npm start in capstone1/backend)
// Testing for server.js endpoints

test('server to be running', async () => { 
    await fetch('http://localhost:5000/').then(data => data.text().then(data => {response=data;}))
    expect(response).toBe('Successful response.'); //expecting a successful response from default server endpoint
});

test('getTip to return a tip value', async () => {
    await fetch('http://localhost:5000/getBudgetTip?incomes=[{"description":"Job","amount":"1000","category":"Income","id":"10.8587174513155529"}]&expenses=[{"description":"Groceries","amount":"200","category":"Food","id":"10.21871523345622346"}]', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }) //fetching a budget tip from the server
    .then(data => data.json().then(data => {response=data;}));
    expect(response).toHaveProperty('tip'); //expecting a tip value
}, 20000);

test('database to get all users', async () => {
    await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(data => data.json().then(data => {response=data;})) //fetching all users from the database
    expect(response).toBeDefined();
    expect(response[1]).toHaveProperty('id'); //expecting a user id
    expect(response[1]).toHaveProperty('fullName'); //expecting a user full name
    expect(response[1]).toHaveProperty('email'); //expecting a user email
    expect(response[1]).toHaveProperty('last_login'); //expecting a user last login
}, 20000);

test('api to get article resources', async () => {
    await fetch('http://localhost:5000/api/articles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(data => data.json().then(data => {response=data;})) //fetching articles from the api
    expect(response).toBeDefined();
    expect(response.status).toBe('ok'); //expecting a successful response
    expect(response).toHaveProperty('articles'); //expecting articles
    expect(response.articles[1]).toHaveProperty("author"); //expecting an author
    expect(response.articles[1]).toHaveProperty("title"); //expecting a title
    expect(response.articles[1]).toHaveProperty("url"); //expecting a url
})