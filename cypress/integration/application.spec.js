const typingDelay = 110;
const wait = 3000;

const expectPlayingAudio = (expectation) => {
  cy.get('audio').should((elements)=>{
    let audible = false
    elements.each((i, el)=>{
      console.log(el)
      console.log(el.duration, el.paused, el.muted)
      if (el.duration > 0 && !el.paused && !el.muted) {
        audible = true
      }
      // expect(el.duration > 0 && !el.paused && !el.muted).to.eq(false)
    })
    expect(audible).to.eq(expectation)
  })
}

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it ("should see the homepage in it's entirety", () => {
    cy.get('[data-cy=sideNav]').should('be.visible');
    cy.get('[data-cy=newRoomBtn]').should('be.visible');
    cy.get('[data-cy=sortBy]').should('be.visible');
    cy.get('[data-cy=convoList]').should('be.visible');
    cy.get('[data-cy=podOfDay]').should('be.visible');
  });

  it("should be able to play and pause the footer podcast", () => {
    cy.get('[data-cy=podOfDay]')
      .click();
    expectPlayingAudio(true);

    cy.get('[data-cy=podOfDay]')
      .wait(wait)
      .click();
    expectPlayingAudio(false);
  });

  it("should be able to play and pause podcasts on a conversation card", () => {
    cy.get('[conversationCard]')
      .first()
      .find('[data-cy=embeddedPlayer]')
      .click();
    expectPlayingAudio(true);

    cy.get('[conversationCard]')
      .first()
      .find('[data-cy=embeddedPlayer]')
      .wait(wait)
      .click();
    expectPlayingAudio(false);
  });

  it("should press the home icon and be take to the top of the page", () => {
    cy.get('[data-cy=convoList]')
      .scrollTo('bottom')
      .window()
      .its('scrollY')
      .should('not.equal', 0);

    cy.get('[data-cy=home]').click();

    cy.get('[data-cy=convoList]')
      .scrollTo('bottom')
      .window()
      .its('scrollY')
      .should('equal', 0);
  });


//* Aleksandar tests
  // it("should create a conversation room", () => {

  //   cy.get('[data-cy=create]')
  //     .first()
  //     .click();

  //   cy.get('form');

  //   cy.get('[data-cy=submit]')
  //     .click()
  //     .get('[data-cy=form-validation]')
  //     .should('be.visible').
  //     contains('Conversation title cannot be blank');
    
  //   cy.get('[data-cy=title]')
  //     .type("The Best Convver{backspace}{backspace}{backspace}ersation Ever!{backspace}!", { delay: typingDelay });

  //   cy.get('[data-cy=submit]')
  //     .click()
  //     .get('[data-cy=form-validation]')
  //     .should('be.visible').
  //     contains('Conversation description cannot be blank');

  //   cy.get('[data-cy=description]')
  //     .type("I want to have a awesome conversation with awesome{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}great people." , { delay: typingDelay });
    
  //   cy.get('[data-cy=time-selector]')
  //     .type("00:01", { delay: typingDelay });

  //   cy.get('[data-cy=submit]')
  //     .click()
  //     .get('[data-cy=form-validation]')
  //     .should('be.visible').
  //     contains('Please set a time for later today');
    
  //   cy.get('[data-cy=time-selector]')
  //     .type("23:59", { delay: typingDelay });

  //   cy.get('[data-cy=submit]')
  //     .click()
  //     .get('[data-cy=form-validation]')
  //     .should('be.visible').
  //     contains('Podcast & Podcast Episode must be selected');

  //   cy.get('[data-cy=search-bar]')
  //     .last()
  //     .type("syntax")
  //     .wait(wait)
  //     .get('[data-cy=search-results]')
  //     .children()
  //     .first()
  //     .click();

  //   cy.get('[data-cy=episode-select]')
  //     .click()
  //     .wait(wait)
  //     .get('[data-cy=episodes]')
  //     .first()
  //     .click();

  //   cy.get('[data-cy=submit]')
  //     .click();
     
  //   // cy.contains("[data-cy=spinner]").should("exist");
  // });

  // it("should create a conversation room", () => {

  
     
  //   // cy.contains("[data-cy=spinner]").should("exist");
  // });



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

