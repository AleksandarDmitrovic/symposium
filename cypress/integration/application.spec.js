describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should create a conversation room", () => {

    cy.get('[data-cy=create]')
      .first()
      .click();

    cy.get('form');

    cy.get('[data-cy=submit]')
      .click()
      .get('[data-cy=form-validation]')
      .should('be.visible').
      contains('Conversation title cannot be blank');
    
    cy.get('[data-cy=title]')
      .type("The Best Convver{backspace}{backspace}{backspace}ersation Ever!{backspace}!", { delay: 110 }); //, { delay: 110 }

    cy.get('[data-cy=submit]')
      .click()
      .get('[data-cy=form-validation]')
      .should('be.visible').
      contains('Conversation description cannot be blank');

    cy.get('[data-cy=description]')
      .type("I want to have a awesome conversation with awesome{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}great people." , { delay: 110 });//, { delay: 110 }
    
    cy.get('[data-cy=time-selector]')
      .type("00:01", { delay: 110 });

    cy.get('[data-cy=submit]')
      .click()
      .get('[data-cy=form-validation]')
      .should('be.visible').
      contains('Please set a time for later today');
    
    cy.get('[data-cy=time-selector]')
      .type("23:59", { delay: 110 });

    cy.get('[data-cy=submit]')
      .click()
      .get('[data-cy=form-validation]')
      .should('be.visible').
      contains('Podcast & Podcast Episode must be selected');

    cy.get('[data-cy=search-bar]')
      .last()
      .type("syntax")
      .wait(7000)
      .get('[data-cy=search-results]')
      .children()
      .first()
      .click();

    cy.get('[data-cy=episode-select]')
      .click()
      .wait(3000)
      .get('[data-cy=episodes]')
      .first()
      .click();

    cy.get('[data-cy=submit]')
      .click();
     
    // cy.contains("[data-cy=spinner]").should("exist");
  });

  it("should create a conversation room", () => {

  
     
    // cy.contains("[data-cy=spinner]").should("exist");
  });


});

// it("should book an interview", () => {

//   cy.get("[alt=Add]")
//     .first()
//     .click();

//   cy.get("[data-testid=student-name-input]")
//     .type("Lydia Miller-Jones");

//   cy.get("[alt='Sylvia Palmer']").click();

//   cy.contains("Save").click();

//   cy.contains(".appointment__card--show", "Lydia Miller-Jones");
//   cy.contains(".appointment__card--show", "Sylvia Palmer");
// });

// it("should edit an interview", () => {

//   cy.get("[alt=Edit]")
//     .first()
//     .click({ force: true });

//   cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");

//   cy.get("[alt='Tori Malcolm']").click();

//   cy.contains("Save").click();

//   cy.contains(".appointment__card--show", "Lydia Miller-Jones");
//   cy.contains(".appointment__card--show", "Tori Malcolm");

// });

// it("should cancel an interview", () => {

//   cy.get("[alt=Delete]")
//     .click({ force: true });

//   cy.contains("Confirm").click();

//   cy.contains("Deleting").should("exist");
//   cy.get("Deleting").should("not.exist");

//   cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");

// });