describe('Navigation', () => {
    it('should navigate to the account page using the navbar', () => {
        cy.visit('http://localhost:3000');

        // Click on the 'Account' link in the navbar
        cy.contains('Account').click();

        cy.url().should('include', 'http://localhost:3000/login', 
        { timeout: 10000 }); 

         cy.contains('Account').should('be.visible');
    });
});



describe('Logout', () => {
    it('should log the user out', () => {
        cy.visit('http://localhost:3000/account');

        // Click on the 'Logout' button
        cy.contains('Logout').click();

        // Assert that the user is redirected to the login page after successful logout
        cy.url().should('include', '/login');
    });
});


describe('register do not allow duplicate email', () => {
    it('should not allow duplicate email', () => {
        //  register page
        cy.visit('http://localhost:3000/register');

        // Fill out the form and submit it      
        cy.get('input[name="fullName"]').type('meow');
        cy.get('input[name="email"]').type('meow@gmail.com');
        cy.get('input[name="password"]').type('meow');
        cy.get('form').submit();
    });
});


describe('Chatbox', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/chatbot');
    });

    it('should send a message', () => {
        cy.intercept('POST', 'http://localhost:3000/chat', (req) => {
            req.reply({
                status: 200,
                body: {
                    response: 'This is a mock response from the server.'
                }
            });
        }).as('sendMessage');

        // Fill out the form
        cy.get('input[type="text"]').type('Hello');

        // Assert that the message is sent
        cy.contains('Hello').should('be.visible');

            // Click on the 'Send' button
    cy.get('[data-cy="send-button"]').should('be.visible').click(); // ensure visibility and clickability

    });
});


describe('budget tips', () => {
    it('should show budget tips', () => {
        cy.visit('http://localhost:3000/budget');

        cy.contains('Budget Tips').click();

        // Assert that the budget tips are displayed
        cy.contains('Budget Tips').should('be.visible');

    });
})
