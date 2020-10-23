export function issuesReducer(issues, action) {
  if (action.type === "ISSUES_LOADED") {
    return action.payload;
  }

  if (action.type === "ISSUE_DELETED") {
    return issues.filter((issue) => {
      return issue.id !== action.payload.id;
    });
  }

  if (action.type === "ISSUE_EDITED") {
    return issues.map((issue) => {
      if (issue.id === action.payload.editedIssue.id) {
        return action.payload.editedIssue;
      } else {
        return issue;
      }
    });
  }

  if (action.type === "ISSUE_CREATED") {
    return issues.concat(action.payload.newIssue);
  }

  throw new Error(`Invalid action type: ${action.type}`);
}
