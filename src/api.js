export function fetchLabels() {
  return fetch("/labels").then((response) => {
    return response.json();
  });
}

export function fetchIssues() {
  return fetch("/issues").then((response) => {
    return response.json();
  });
}

export function fetchIssue(id) {
  return fetch(`/issues/${id}`).then((response) => {
    if (response.status >= 400) {
      return Promise.reject(
        `There was an error requesting the issue with and id of ${id}`
      );
    }

    return response.json();
  });
}
