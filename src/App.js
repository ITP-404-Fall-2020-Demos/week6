import React, { useState } from "react";
import "./App.css";
import Issues from "./Issues";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateIssue from "./CreateIssue";
import IssueDetails from "./IssueDetails";

function App() {
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

  const [issues, setIssues] = useState([
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
    {
      id: 2,
      title: "Issue 2",
      label: 0,
    },
    {
      id: 3,
      title: "Issue 3",
      label: 2,
    },
  ]);

  function deleteIssue(issueToBeDeleted) {
    const filteredIssues = issues.filter((issue) => {
      return issue !== issueToBeDeleted;
    });

    setIssues(filteredIssues);
  }

  function editIssue(issueToBeEdited, newTitle, newLabelId) {
    const updatedIssues = issues.map((issue) => {
      if (issue === issueToBeEdited) {
        return {
          id: issue.id,
          title: newTitle,
          label: newLabelId,
        };
      } else {
        return issue;
      }
    });

    setIssues(updatedIssues);
  }

  function createIssue(title, labelId) {
    const newIssue = {
      id: issues.length,
      title,
      label: labelId,
    };

    setIssues(issues.concat(newIssue));
  }

  const labelsById = {};

  labels.forEach((label) => {
    labelsById[label.id] = label;
  });

  return (
    <Router>
      <div className="container mt-3">
        <h1>Issues</h1>
        <Switch>
          <Route path="/" exact={true}>
            <Issues issues={issues} labels={labels} labelsById={labelsById} />
          </Route>
          <Route path="/issues/:id" exact={true}>
            <IssueDetails
              issues={issues}
              labels={labels}
              deleteIssue={deleteIssue}
              editIssue={editIssue}
            />
          </Route>
          <Route path="/new" exact={true}>
            <CreateIssue labels={labels} createIssue={createIssue} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
