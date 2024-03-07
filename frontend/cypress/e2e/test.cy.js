

describe('Navigation', () => {
    it('should navigate to the account page using the navbar', () => {
        // Visit the page
        cy.visit('http://localhost:3000');

        // Click on the 'Account' link in the navbar
        cy.contains('Account').click();

        // Assert that the URL changes to '/account'
        cy.url().should('include', 'http://localhost:3000/login', 
        { timeout: 10000 }); 

        // Assert that the page contains the account page content
         cy.contains('Account').should('be.visible');
    });
});



describe('Login', () => {
    it('should log the user in after registering and redirect to the account page', () => {
        // Visit the register page
        cy.visit('http://localhost:3000/register');

        // Fill out the form and submit it      
        cy.get('input[name="fullName"]').type('daisy buchanan');
        cy.get('input[name="email"]').type('daisy@gmail.com');
        cy.get('input[name="password"]').type('passw');
        cy.get('form').submit();

        // Assert that the user is redirected to the account page after successful registration
        // cy.url().should('include', 'http://localhost:3000/account', 
        // { timeout: 10000 });
       
    });
});


describe('Logout', () => {
    it('should log the user out', () => {
        // Visit the account page
        cy.visit('http://localhost:3000/account');

        // Click on the 'Logout' button
        cy.contains('Logout').click();

        // Assert that the user is redirected to the login page after successful logout
        cy.url().should('include', '/login');
    });
});


// describe('Chatbox', () => {
//     beforeEach(() => {
//         cy.visit('http://localhost:3000/chatbot');
//     });

//     it('should send a message', () => {
//         // Stub the fetch request
//         cy.intercept('POST', 'http://localhost:5000/chat', (req) => {
//             req.reply({
//                 status: 200,
//                 body: {
//                     response: 'This is a mock response from the server.'
//                 }
//             });
//         }).as('sendMessage');

//         // Fill out the form
//         cy.get('input[type="text"]').type('Hello');

//         // Assert that the message is sent
//         cy.contains('Hello').should('be.visible');

//         // Click on the 'Send' button   
//         cy.get('.waves-effect').click();

//         // Wait for the request to complete
//         cy.wait('@sendMessage');

//         // Assert that the response is displayed
//         cy.contains('This is a mock response from the server.').should('be.visible');
//     });
// });

