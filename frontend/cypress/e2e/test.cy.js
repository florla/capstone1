describe('Navigation', () => {
    it('should navigate to the account page using the navbar', () => {
        // Visit the page
        cy.visit('http://localhost:3000');

        // Click on the mobile nav trigger to open the navbar
        cy.get('.sidenav-trigger').click({ force: true });

        // Click on the 'Account' link in the navbar
        cy.contains('Account').click({ force: true });

        // Assert that the URL changes to '/account'
        cy.url().should('include', 'http://localhost:3000/account');

        // Assert that the page contains the account page content
        cy.contains('Account').should('be.visible');
    });
});

describe('Result', () => {
    it('should display the result of the quiz', () => {
        // Visit the page
        cy.visit('http://localhost:3000/result');

        // Assert that the page contains the result
        cy.contains('Questions Right:').should('be.visible');
    });
});

describe('Responsive Design', () => { 
    it('should display the page correctly on mobile and desktop', () => {
        // Visit the page
        cy.visit('http://localhost:3000');

        // Assert that the page looks good on mobile
        cy.viewport(320, 480);
        cy.contains('Personalized Quizzes').should('be.visible');

        // Assert that the page looks good on desktop
        cy.viewport(1280, 800);
        cy.contains('Personalized Quizzes').should('be.visible');
    });
});

describe('Form Validation', () => {
    it('should display an error message if the form is submitted without being filled out', () => {
        // Visit the page
        cy.visit('http://localhost:3000/categories');

        // Submit the form
        cy.get('form').submit();

        // Assert that the error message is displayed
        cy.contains('Please fill in all the fields').should('be.visible');
    });
});