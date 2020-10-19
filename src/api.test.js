import { fetchLabels, fetchIssue, saveIssue } from "./api";
import { createServer, Response } from "miragejs";

let server;

beforeEach(() => {
  server = createServer({
    routes() {
      this.namespace = "api";
      this.logging = false;

      this.get("/labels", () => {
        return [
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
        ];
      });

      this.get("/issues/:id", (schema, request) => {
        if (request.params.id === "1") {
          return {
            id: 1,
            title: "Issue 1",
            label: 2,
          };
        }

        return new Response(404, {}, null);
      });

      this.post("/issues", (schema, request) => {
        return Object.assign(JSON.parse(request.requestBody), { id: 5 });
      });

      this.put("/issues/:id", (schema, request) => {
        return Object.assign(JSON.parse(request.requestBody), {
          title: "Updated issue",
        });
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

test("fetchLabels()", () => {
  return fetchLabels().then((labels) => {
    expect(labels).toEqual([
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
    ]);
  });
});

test("fetchIssue() with an issue that exists", () => {
  return fetchIssue(1).then((issue) => {
    expect(issue).toEqual({
      id: 1,
      title: "Issue 1",
      label: 2,
    });
  });
});

test("fetchIssue() when an issue doesn't exist", () => {
  return fetchIssue(99).then(
    () => {},
    (error) => {
      expect(error).toBe(
        "There was an error requesting the issue with and id of 99"
      );
    }
  );
});

test("saveIssue() when creating an issue", () => {
  return saveIssue({ title: "Issue 0", label: 1 }).then((issue) => {
    expect(issue).toEqual({ id: 5, title: "Issue 0", label: 1 });
  });
});

test("saveIssue() when updating an issue", () => {
  return saveIssue({ id: 1, title: "Issue 1", label: 1 }).then((issue) => {
    expect(issue).toEqual({ id: 1, title: "Updated issue", label: 1 });
  });
});
