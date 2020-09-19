import React, { useState, useEffect } from "react";
import "./App.css";
import Issues from "./Issues";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateIssue from "./CreateIssue";
import IssueDetails from "./IssueDetails";
import PageNotFound from "./PageNotFound";
import { fetchLabels, fetchIssues, destroyIssue } from "./api";

function App() {
  const [labels, setLabels] = useState([]);
  const [labelsById, setLabelsById] = useState();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    Promise.all([fetchLabels(), fetchIssues()]).then(([labels, issues]) => {
      setLabels(labels);
      setIssues(issues);

      const labelsById = {};

      labels.forEach((label) => {
        labelsById[label.id] = label;
      });

      setLabelsById(labelsById);
    });
  }, []);

  function deleteIssue(issueToBeDeleted) {
    destroyIssue(issueToBeDeleted.id).then(() => {
      const filteredIssues = issues.filter((issue) => {
        return issue.id !== issueToBeDeleted.id;
      });

      setIssues(filteredIssues);
    });
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
              labels={labels}
              deleteIssue={deleteIssue}
              editIssue={editIssue}
            />
          </Route>
          <Route path="/new" exact={true}>
            <CreateIssue labels={labels} createIssue={createIssue} />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
