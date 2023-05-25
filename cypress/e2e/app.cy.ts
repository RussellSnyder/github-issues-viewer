import {
  DROPDOWN_ITEMS_SELECTOR,
  DROPDOWN_SELECTOR,
  EMPTY_STATE_SELECTOR,
  INPUT_ENTER_SELECTOR,
  INPUT_SELECTOR,
  ISSUE_LIST,
  REPO_ISSUE_PREVIEW,
} from "../selectors";

describe("Issue Viewer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should render title", () => {
    cy.get("h1").contains("Issue Viewer");
  });

  it("Empty state should be initially visible", () => {
    cy.get(EMPTY_STATE_SELECTOR).should("be.visible");
  });

  it("should show rendered data", () => {
    cy.get(ISSUE_LIST).should("be.visible");
  });
});

describe("keyword search", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    // store issue titles for later
    cy.get(REPO_ISSUE_PREVIEW)
      .find("h4")
      .invoke("text")
      .then((issueTitles) => {
        cy.wrap(issueTitles).as("issueTitles");
        cy.wrap(issueTitles.length).as("issueTitlesLength");
      });
  });

  it("has stored test titles", () => {
    cy.get("@issueTitles").should("have.length.above", 20);
  });

  it("should update data when a new keyword is entered and the icon is clicked", () => {
    cy.get(INPUT_SELECTOR).clear().type("hooks");
    cy.get(INPUT_ENTER_SELECTOR).click();

    cy.get(EMPTY_STATE_SELECTOR).should("be.visible");
    cy.get(ISSUE_LIST).should("be.visible");
  });

  it("should show empty state when new keyword not found", () => {
    cy.get(INPUT_SELECTOR).clear().type("hookskajghsdfkjahsgd");
    cy.get(INPUT_ENTER_SELECTOR).click();

    cy.get(EMPTY_STATE_SELECTOR).should("be.visible");
    cy.get(ISSUE_LIST).should("not.exist");
  });
});

describe("issue state filter", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    // store issue titles for later
    cy.get(REPO_ISSUE_PREVIEW).then((issueTitles) => {
      cy.wrap(issueTitles.length).as("initialLength");
    });

    cy.get(DROPDOWN_SELECTOR).click();
  });

  it("should filter issues when 'open' is chosen", () => {
    cy.get(DROPDOWN_ITEMS_SELECTOR).eq(0).click();

    cy.get("@initialLength").then((initialLength) => {
      cy.get(REPO_ISSUE_PREVIEW).should("have.length.lessThan", initialLength);
    });
  });
  it("should filter issues when 'closed' is chosen", () => {
    cy.get(DROPDOWN_ITEMS_SELECTOR).eq(1).click();

    cy.get("@initialLength").then((initialLength) => {
      cy.get(REPO_ISSUE_PREVIEW).should("have.length.lessThan", initialLength);
    });
  });
  it("should reset the filter when 'all' is chosen", () => {
    cy.get(DROPDOWN_ITEMS_SELECTOR).eq(1).click();

    cy.get(DROPDOWN_SELECTOR).click();
    cy.get(DROPDOWN_ITEMS_SELECTOR).eq(2).click();

    cy.get("@initialLength").then((initialLength) => {
      cy.get(REPO_ISSUE_PREVIEW).should("have.length", initialLength);
    });

    cy.get(EMPTY_STATE_SELECTOR).should("not.exist");
  });
});

describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("navigates to a specific issue on click", () => {
    cy.get(REPO_ISSUE_PREVIEW).eq(0).find("a").click();
    cy.url().should("include", "/issue/");
  });
});
