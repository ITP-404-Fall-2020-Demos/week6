import { issuesReducer } from "./reducers";

test("creating an issue", () => {
  const issues = issuesReducer(
    [
      {
        id: 0,
        title: "Issue 0",
        label: 1,
      },
    ],
    {
      type: "ISSUE_CREATED",
      payload: {
        newIssue: {
          id: 1,
          title: "Issue 1",
          label: 2,
        },
      },
    }
  );

  expect(issues).toEqual([
    {
      id: 0,
      title: "Issue 0",
      label: 1,
    },
    {
      id: 1,
      title: "Issue 1",
      label: 2,
    },
  ]);
});
