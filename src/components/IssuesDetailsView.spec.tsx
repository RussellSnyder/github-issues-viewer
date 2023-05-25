import { expect } from "@jest/globals";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { IssueDetailsView } from "./IssuesDetailsView";
import { ViewDataState } from "../types";
import { ApolloError } from "@apollo/client";
import { Issue } from "../gql/graphql";

const MOCK_ISSUE_NUMBER = 12;

let mockViewDataState: ViewDataState = ViewDataState.Loading;
let mockError: ApolloError;
let mockIssue: Issue;

jest.mock("../hooks/useIssueData", () => ({
  useIssueData: () => ({
    viewDataState: mockViewDataState,
    error: mockError,
    issue: mockIssue,
  }),
}));

describe("IssuesDetailsView", () => {
  it("should show the loading if the viewDataState is loading", () => {
    render(<IssueDetailsView issueNumber={MOCK_ISSUE_NUMBER} />);

    expect(screen.getByText("Loading")).toBeTruthy();
  });

  it("should show an error if the viewDataState is error", () => {
    const expectedErrorMessage = "YOLO";

    mockViewDataState = ViewDataState.Error;
    mockError = new ApolloError({ errorMessage: expectedErrorMessage });

    render(<IssueDetailsView issueNumber={MOCK_ISSUE_NUMBER} />);

    expect(
      screen.getByText((content) => content.includes(expectedErrorMessage))
    ).toBeTruthy();
  });

  it("should show no results if no results are present", () => {
    const expectedNoResultsMessage = "No results";

    mockViewDataState = ViewDataState.NoResults;

    render(<IssueDetailsView issueNumber={MOCK_ISSUE_NUMBER} />);

    expect(
      screen.getByText((content) => content.includes(expectedNoResultsMessage))
    ).toBeTruthy();
  });
});
