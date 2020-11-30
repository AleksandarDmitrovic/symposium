const typingDelay = 110;
const wait = 3000;

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
      .type("The Best Convver{backspace}{backspace}{backspace}ersation Ever!{backspace}!", { delay: typingDelay });

    cy.get('[data-cy=submit]')
      .click()
      .get('[data-cy=form-validation]')
      .should('be.visible').
      contains('Conversation description cannot be blank');

    cy.get('[data-cy=description]')
      .type("I want to have a awesome conversation with awesome{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}great people." , { delay: typingDelay });
    
    cy.get('[data-cy=time-selector]')
      .type("00:01", { delay: typingDelay });

    cy.get('[data-cy=submit]')
      .click()
      .get('[data-cy=form-validation]')
      .should('be.visible').
      contains('Please set a time for later today');
    
    cy.get('[data-cy=time-selector]')
      .type("23:59", { delay: typingDelay });

    cy.get('[data-cy=submit]')
      .click()
      .get('[data-cy=form-validation]')
      .should('be.visible').
      contains('Podcast & Podcast Episode must be selected');

    cy.get('[data-cy=search-bar]')
      .last()
      .type("syntax")
      .wait(wait)
      .get('[data-cy=search-results]')
      .children()
      .first()
      .click();

    cy.get('[data-cy=episode-select]')
      .click()
      .wait(wait)
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

describe("Toggle Buttons", () => {
  it("should toggle video on and off", () => {
    cy.visit("/room/3").wait(wait);
    cy.get('.video').click().wait(wait);
    cy.get('.video').click().wait(wait);
  });

  it("should toggle audio on and off", () => {
    cy.visit("/room/3").wait(wait);
    cy.get('.audio').click().wait(wait);
    cy.get('.audio').click().wait(wait);
  });

  it("should play and pause the podcast", () => {
    cy.visit("/room/3").wait(wait);

    cy.get('.rhap_main-controls > button').click().wait(wait);
    cy.get('.rhap_main-controls > button').click().wait(wait);
  });

  // Open popup windows that cypress cannot close. Consider not doing this.
  it("should be able to load twitter button", () => {
    cy.visit("/room/3").wait(wait);
    cy.get('#social-media > button').first().click().wait(wait);
  });

  it("should be able to load facebook button", () => {
    cy.visit("/room/3").wait(wait);
    cy.get('#social-media > button').eq(1).click().wait(wait);
  });

  it("should be able to load linkedIn button", () => {
    cy.visit("/room/3").wait(wait);
    cy.get('#social-media > button').eq(2).click().wait(wait);
  });
});

describe("Chat box", () => {
  it.only("should be able to send a message", () => {
    cy.visit("/room/3").wait(wait);

    cy.get('.chat-box-form > div > div > input')
    .type("This is me typingan{backspace}{backspace} a new message into the chat box!", { delay: typingDelay })
    cy.get('.chat-box-form > button').click();

    cy.get('.chat-box-form > div > div > input')
    .type("Isn't it cool?", { delay: typingDelay })
    cy.get('.chat-box-form > button').click();

    cy.get('.chat-box-form > div > div > input')
    .type('And I will send another message!', { delay: typingDelay })
    cy.get('.chat-box-form > button').click();

    cy.get('.chat-box-form > div > div > input')
    .type('Maybe one more so that we can start to see the chat scrolling!', { delay: typingDelay })
    cy.get('.chat-box-form > button').click();

    cy.get('.chat-box-form > div > div > input')
    .type('Did you see that?', { delay: typingDelay })
    cy.get('.chat-box-form > button').click();

    cy.get('.chat-box-form > div > div > input')
    .type('Auto scrolling!', { delay: typingDelay })
    cy.get('.chat-box-form > button').click();

    cy.get('.chat-box-form > div > div > input')
    .type('Yup', { delay: typingDelay });
    cy.get('.chat-box-form > button').click();




  });

});