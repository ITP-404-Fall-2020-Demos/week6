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
