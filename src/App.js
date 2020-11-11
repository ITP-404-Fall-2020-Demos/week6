import React, { useEffect, useState, useReducer } from "react";
import "./App.css";
import Issues from "./Issues";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateIssue from "./CreateIssue";
import IssueDetails from "./IssueDetails";
import PageNotFound from "./PageNotFound";
import { fetchLabels, fetchIssues, destroyIssue, saveIssue } from "./api";
import { DataStoreContext } from "./contexts";
import { issuesReducer } from "./reducers";
import Signup from "./Signup";
import Login from "./Login";
import Navigation from "./Navigation";
import { fetchUser } from "./auth";

function App() {
  const [labels, setLabels] = useState([]);
  const [labelsById, setLabelsById] = useState({});
  const [issues, dispatch] = useReducer(issuesReducer, []);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Promise.all([fetchLabels(), fetchIssues()]).then(([labels, issues]) => {
      dispatch({
        type: "ISSUES_LOADED",
        payload: issues,
      });

      setLabels(labels);

      const labelsById = {};

      labels.forEach((label) => {
        labelsById[label.id] = label;
      });

      setLabelsById(labelsById);
    });
  }, []);

  useEffect(() => {
    fetchUser().then((user) => {
      setUser(user);
    });
  }, []);

  function deleteIssue(issueToBeDeleted) {
    destroyIssue(issueToBeDeleted.id).then(() => {
      dispatch({
        type: "ISSUE_DELETED",
        payload: {
          id: issueToBeDeleted.id,
        },
      });
    });
  }

  function editIssue(issueToBeEdited, newTitle, newLabelId) {
    saveIssue({
      id: issueToBeEdited.id,
      title: newTitle,
      label: newLabelId,
    }).then((editedIssue) => {
      dispatch({
        type: "ISSUE_EDITED",
        payload: {
          editedIssue,
        },
      });
    });
  }

  function createIssue(title, labelId) {
    saveIssue({
      title,
      label: labelId,
    }).then((newIssue) => {
      dispatch({
        type: "ISSUE_CREATED",
        payload: {
          newIssue,
        },
      });
    });
  }

  return (
    <DataStoreContext.Provider
      value={{ labels, labelsById, issues, user, setUser }}
    >
      <Router>
        <div className="container mt-3">
          <h1>Issues</h1>
          <Navigation />
          <Switch>
            <Route path="/" exact={true}>
              <Issues />
            </Route>
            <Route path="/issues/:id" exact={true}>
              <IssueDetails deleteIssue={deleteIssue} editIssue={editIssue} />
            </Route>
            <Route path="/new" exact={true}>
              <CreateIssue createIssue={createIssue} />
            </Route>
            <Route path="/signup" exact={true}>
              <Signup />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </DataStoreContext.Provider>
  );
}

export default App;
