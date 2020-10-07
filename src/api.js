export function fetchLabels() {
  return fetch("/api/labels").then((response) => {
    return response.json();
  });
}

export function fetchIssues() {
  return fetch("/api/issues").then((response) => {
    return response.json();
  });
}

export function fetchIssue(id) {
  return fetch(`/api/issues/${id}`).then((response) => {
    if (response.status >= 400) {
      return Promise.reject(
        `There was an error requesting the issue with and id of ${id}`
      );
    }

    return response.json();
  });
}

export function destroyIssue(id) {
  return fetch(`/api/issues/${id}`, {
    method: "DELETE",
  });
}

export function saveIssue(data) {
  const isEditing = data.hasOwnProperty("id");
  const url = isEditing ? `/api/issues/${data.id}` : "/api/issues";
  const method = isEditing ? "PUT" : "POST";

  return fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}
