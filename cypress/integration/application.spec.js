describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should create a conversation room", () => {

    cy.get('[data-cy=create]')
      .first()
      .click();

    cy.get('form').get('[data-cy=title]')
      .type("Lydia Miller-Jones");

    // cy.get("[alt='Sylvia Palmer']").click();

    // cy.contains("Save").click();

    // cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    // cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


});