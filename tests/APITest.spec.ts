import { test, expect } from "@playwright/test";

test("GET request example", async ({ request }) => {
  // Make a GET request to a public API
  const response = await request.get("https://jsonplaceholder.typicode.com/posts/1");

  // Verify the response status
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  // Validate some fields
  expect(responseBody).toHaveProperty("id", 1);
  expect(responseBody).toHaveProperty("userId");
  expect(responseBody).toHaveProperty("title");
});