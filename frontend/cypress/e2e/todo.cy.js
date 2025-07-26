describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('Login with invalid credentials', () => {
    cy.get('input[placeholder="Username"]').type('wrong');
    cy.get('input[placeholder="Password"]').type('wrong');
    cy.get('button[type=submit]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Login failed');
    });
  });

  it('Login with valid credentials', () => {
    cy.get('input[placeholder="Username"]').type('test');
    cy.get('input[placeholder="Password"]').type('test');
    cy.get('button[type=submit]').click();
    cy.contains('Todos');
  });

  it('Add, edit, and delete a todo', () => {
    cy.get('input[placeholder="Username"]').type('test');
    cy.get('input[placeholder="Password"]').type('test');
    cy.get('button[type=submit]').click();
    cy.contains('Todos');
    cy.get('input[placeholder="New todo"]').type('Cypress todo');
    cy.get('button[type=submit]').click();
    cy.contains('Cypress todo');
    cy.contains('Cypress todo').parent().find('button').contains('Edit').click();
    cy.get('input').last().clear().type('Updated todo{enter}');
    cy.contains('Updated todo');
    cy.contains('Updated todo').parent().find('button').contains('Delete').click();
    cy.contains('Updated todo').should('not.exist');
  });

  it('Toggle todo done', () => {
    cy.get('input[placeholder="Username"]').type('test');
    cy.get('input[placeholder="Password"]').type('test');
    cy.get('button[type=submit]').click();
    cy.contains('Todos');
    cy.get('[data-cy=todo-text]').first().click();
    cy.get('[data-cy=todo-text]').first().should('have.css', 'text-decoration-line', 'line-through');
  });
});