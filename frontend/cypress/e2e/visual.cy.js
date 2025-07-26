describe('Visual regression', () => {
  it('Main screen visual snapshot after login', () => {
    cy.visit('/');
    cy.get('input[placeholder="Username"]').type('test');
    cy.get('input[placeholder="Password"]').type('test');
    cy.get('button[type=submit]').click();
    cy.contains('Todos');
    cy.wait(500);
    cy.matchImageSnapshot('todos-main');
  });
});