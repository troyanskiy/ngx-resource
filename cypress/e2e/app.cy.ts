
describe('Ngx-Resource-Mono App', () => {
  it('Visit page and validate title', () => {
    cy.visit('/').title().should('eq','NgxResourceMono');
  });
})

describe('Ngx-Resource-Mono App Header h1', () => {
  it('Visits the initial project page', () => {
    cy.visit('/').get('#main-header').should((value) => expect(value)
      .contain('Welcome to ngx-resource-mono!'));
  })
})
