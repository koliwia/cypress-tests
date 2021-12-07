/// <reference types="cypress" />

describe('testing_ecommerce_shop', () => {
    it('Creating an account works', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.get('#signin2').click();
        cy.contains('Username').should('exist');
        cy.contains('Password').should('exist');
        cy.wait(500);
        cy.get('#sign-username').click().type('new@admin.com');
        cy.get('#sign-password').click().type('newpassword');
        cy.get('[onclick="register()"]').click();
    });

    it('Logging in works', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.get('#login2').should('exist').click();
        cy.contains('Username').should('exist');
        cy.contains('Password').should('exist');
        cy.wait(500);
        cy.get('#loginusername').click().type('new@admin.com');
        cy.get('#loginpassword').click().type('newpassword');
        cy.get('[onclick="logIn()"]').click();
        cy.contains('Welcome new@admin.com').should('be.visible');
    });

    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/');
        Cypress.Cookies.preserveOnce('tokenp_');
    });

    it('Searching products through categories', () => {
        cy.contains('CATEGORIES').should('exist');
        cy.contains('Phones').click();
        cy.contains('Iphone 6 32gb').should('exist');
        cy.contains('Laptops').click();
        cy.contains('MacBook air').should('exist');
        cy.contains('Monitors').click();
        cy.contains('Apple monitor 24').should('exist');
    });

    it('Adding and deleting products', () => {
        cy.contains('Samsung galaxy s7').click();
        cy.contains('Add to cart').should('exist');
        cy.get('[onclick="addToCart(4)"]').click();
        cy.wait(500);
        cy.contains('Cart').click();
        cy.url().should('include', '/cart.html');
        cy.contains('Samsung galaxy s7').should('exist');
        cy.contains('Delete').click();
        cy.contains('Samsung galaxy s7').should('not.exist');
    });

    it('Buying products works', () => {
        cy.contains('Nokia lumia 1520').click();
        cy.contains('Add to cart').should('exist');
        cy.get('[onclick="addToCart(2)"]').click();
        cy.wait(500);
        cy.contains('Cart').click();
        cy.contains('Nokia lumia 1520').should('exist');
        cy.contains('Place Order').click();
        cy.wait(500);
        cy.get('#name').type('Cindy H. Brito');
        cy.get('#country').type('Cindy');
        cy.get('#city').type('United States');
        cy.get('#card').type('5558 4078 6253 9931');
        cy.get('#month').type('7');
        cy.get('#year').type('2022');
        cy.contains('Purchase').click();
        cy.contains('Thank you for your purchase!').should('be.visible');
    });

    it('Logging out works', () => {
        cy.get('#logout2').click();
        cy.wait(500);
        cy.getCookie('tokenp_').should('not.exist');
    });
    
});
