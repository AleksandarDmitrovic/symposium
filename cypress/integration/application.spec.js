const typingDelay = 110;
const wait = 3000;
const podcast = 6000;


const expectPlayingAudio = (expectation) => {
  cy.get('audio').should((elements)=>{
    let audible = false
    elements.each((i, element)=>{
      if (element.duration > 0 && !element.paused && !element.muted) {
        audible = true;
      }
    });
    expect(audible).to.eq(expectation);
  });
};

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it ("should see the homepage in it's entirety", () => {
    cy.get('[data-cy=side-nav]').should('be.visible');
    cy.get('[data-cy=create]').should('be.visible');
    cy.get('[data-cy=sort-by]').should('be.visible');
    cy.get('[data-cy=convo-list]').should('be.visible');
    cy.get('[data-cy=pod-of-day]').should('be.visible');
  });

  it("should be able to play and pause the footer podcast", () => {
    cy.get('[data-cy=pod-of-day]')
      .click()
      .wait(podcast);
    expectPlayingAudio(true);

    cy.get('[data-cy=pod-of-day]')
      .click()
    expectPlayingAudio(false);
  });

  it("should be able to play and pause podcasts on a conversation card", () => {
    cy.get('[data-cy=convo-card-player]')
      .last()
      .find('button')
      .click()
      .wait(podcast);
    expectPlayingAudio(true);

    cy.get('[data-cy=convo-card-player]')
      .last()
      .find('button')
      .click();
    expectPlayingAudio(false);
  });

  it("should press the home icon and be take to the top of the conversation list viewport", () => {
    cy.scrollTo('bottom')
      .window()
      .its('scrollY')
      .wait(wait)
      .should('not.equal', 0);

    cy.get('[data-cy=home]').click();

    cy.window()
      .its('scrollY')
      .should('equal', 0);
  });

  it("should be able to view conversations based on a specific category or view all", () => {
    cy.get('[data-cy=view-category]')
      .click()
      .wait(wait)

    cy.get('[data-cy=category-options')
      .contains('Technology')
      .click()

    cy.get('[data-cy=category-name]')
      .wait(wait)
      .contains('Technology');

    cy.get('[data-cy=view-all]')
      .click()

    cy.get('[data-cy=category-name]')
      .wait(wait)
      .should('not.contain', 'Technology');

  });

  it("should be able to search for a specific podcast and view all open conversations with that tag", () => {
    cy.get('[data-cy=search-bar]')
      .first()
      .type("lex fridman" , { delay: typingDelay })
      .wait(wait)
      .get('[data-cy=search-results]')
      .children()
      .first()
      .click();

    cy.get('[data-cy=convo-list]')
      .wait(wait)
      .find('[data-cy=conversation-card]')
      .should('have.length', 1);
  });

  it("should create a conversation room", () => {
    cy.visit("/");

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

    cy.get('[data-cy=time-selector]').click()
      .get('.MuiDialogActions-root').contains('OK').click()
      .wait(wait);
    
    cy.get('[data-cy=submit]')
      .click()
      .get('[data-cy=form-validation]')
      .should('be.visible').
      contains('Please set a time for later today');
    
    cy.get('[data-cy=time-selector]').click()
      .get('.MuiPickersClock-squareMask').click('topLeft') // set to 11 hours
      .wait(wait)
      .get('.MuiPickersClock-squareMask').click('topLeft') // set to 53 minutes
      .wait(wait)
      .get('.MuiDialogActions-root').contains('OK').click();

    cy.get('[data-cy=submit]')
      .click()
      .get('[data-cy=form-validation]')
      .should('be.visible').
      contains('Podcast & Podcast Episode must be selected');

    cy.get('[data-cy=search-bar]')
      .last()
      .type("syntax", { delay: typingDelay })
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

  });


});

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
  it ("should be able to send a message", () => {
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