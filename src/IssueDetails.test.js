import React from "react";
import {
  render,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import IssueDetails from "./IssueDetails";
import { MemoryRouter, Route } from "react-router-dom";
import { createServer } from "miragejs";

let server;

beforeEach(() => {
  server = createServer({
    routes() {
      this.namespace = "api";
      this.logging = false;

      this.get("/issues/:id", (schema, request) => {
        return {
          id: 0,
          title: "Issue 0",
          label: 1,
        };
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

const deleteIssue = () => {};
const editIssue = jest.fn();
const labels = [
  {
    id: 0,
    name: "bug",
    color: "red",
  },
  {
    id: 1,
    name: "documentation",
    color: "blue",
  },
  {
    id: 2,
    name: "question",
    color: "pink",
  },
];

test("rendering an issue", async () => {
  const { container, queryByText, getByTestId } = render(
    <MemoryRouter initialEntries={["/issues/0"]}>
      <Route path="/issues/:id" exact={true}>
        <IssueDetails
          labels={labels}
          deleteIssue={deleteIssue}
          editIssue={editIssue}
        />
      </Route>
    </MemoryRouter>
  );

  expect(container).toHaveTextContent("Loading...");

  await waitForElementToBeRemoved(() => queryByText("Loading..."));

  expect(getByTestId("title")).toHaveValue("Issue 0"); // jest dom matcher
  expect(getByTestId("label")).toHaveValue("1");
});

test("updating an issue", async () => {
  const { queryByText, getByTestId } = render(
    <MemoryRouter initialEntries={["/issues/0"]}>
      <Route path="/issues/:id" exact={true}>
        <IssueDetails
          labels={labels}
          deleteIssue={deleteIssue}
          editIssue={editIssue}
        />
      </Route>
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => queryByText("Loading..."));

  fireEvent.change(getByTestId("title"), {
    target: { value: "Updated issue title" },
  });

  fireEvent.change(getByTestId("label"), { target: { value: "2" } });

  fireEvent.click(getByTestId("save-button"));

  expect(editIssue).toHaveBeenCalledWith(
    { id: 0, title: "Issue 0", label: 1 },
    "Updated issue title",
    2
  );
});
