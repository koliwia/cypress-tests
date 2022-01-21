/// <reference types="cypress" />

describe('testing_ecommerce_shop', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/');
        Cypress.Cookies.preserveOnce('tokenp_');
    });

    it('should register the user', () => {
        cy
            .get('#signin2').click()
            .window()
            .contains('Username')
            .window()
            .contains('Password')
            .wait(500)
            .window()
            .get('#sign-username')
            .click()
            .type('new@admin.com')
            .get('#sign-password')
            .click()
            .type('newpassword')
            .get('[onclick="register()"]')
            .click();
    });

    it('should log in the user', () => {
        cy
            .get('#login2').should('exist').click()
            .window()
            .contains('Username')
            .window()
            .contains('Password')
            .wait(500)
            .window()
            .get('#loginusername')
            .click()
            .type('new@admin.com')
            .get('#loginpassword')
            .click()
            .type('newpassword')
            .get('[onclick="logIn()"]')
            .click()
            .window()
            .contains('Welcome new@admin.com');
    });

    it('should search products through categories', () => {
        cy
            .contains('CATEGORIES')
            .window()
            .contains('Phones')
            .click()
            .window()
            .contains('Iphone 6 32gb')
            .window()
            .contains('Laptops')
            .click()
            .window()
            .contains('MacBook air')
            .window()
            .contains('Monitors')
            .click()
            .window()
            .contains('Apple monitor 24');
    });

    it('should add and delete products', () => {
        cy
            .contains('Samsung galaxy s7').click()
            .window()
            .contains('Add to cart')
            .get('[onclick="addToCart(4)"]')
            .click()
            .wait(500)
            .window()
            .contains('Cart')
            .click()
            .url()
            .should('include', '/cart.html')
            .window()
            .contains('Samsung galaxy s7')
            .window()
            .contains('Delete')
            .click()
            .window()
            .contains('Samsung galaxy s7')
            .should('not.exist');
    });

    it('should allow user to buy products', () => {
        cy
            .contains('Nokia lumia 1520').click()
            .window()
            .contains('Add to cart')
            .get('[onclick="addToCart(2)"]')
            .click()
            .wait(500)
            .window()
            .contains('Cart')
            .click()
            .window()
            .contains('Nokia lumia 1520')
            .window()
            .contains('Place Order')
            .click()
            .wait(500)
            .get('#name')
            .type('Cindy H. Brito')
            .get('#country')
            .type('Cindy')
            .get('#city')
            .type('United States')
            .get('#card')
            .type('5558 4078 6253 9931')
            .get('#month')
            .type('7')
            .get('#year')
            .type('2022')
            .window()
            .contains('Purchase')
            .click()
            .window()
            .contains('Thank you for your purchase!');
    });

    it('should log out the user', () => {
        cy
            .get('#logout2').click()
            .wait(500)
            .window()
            .contains('Welcome new@admin.com')
            .should('not.exist');
    });
});
