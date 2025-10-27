import { test, expect } from "@playwright/test";

test("End To End API Calls", async ({ request }) => {

  let userName: string = "swathi playwright6";
  let email: string = "swathi.playwright6@gmail.com";
  let password : string = "playwright1";
  let response = await request.post("https://practice.expandtesting.com/notes/api/users/register", {
    data: {
      name: userName,
      email: email,
      password: password
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

    // Verify status
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201); // 201 = User account created successfully

    // Parse response body
  let responseBody = await response.json();
  console.log(responseBody);

  let userId = await responseBody.data.id;



    // Validate fields
  expect(responseBody.data).toHaveProperty("name", userName);
  expect(responseBody.data).toHaveProperty("email", email);

    response = await request.post("https://practice.expandtesting.com/notes/api/users/login", {
    data: {
      email: email,
      password: password
    },
    headers: {
      "Content-Type": "application/json"
    }
  });


    // Verify status
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200); // 201 = User account created successfully

    // Parse response body
  responseBody = await response.json();
  console.log(responseBody);

  let token = await responseBody.data.token;

    // Validate fields
  expect(responseBody.data).toHaveProperty("id", userId);
  expect(responseBody.data).toHaveProperty("name", userName);
  expect(responseBody.data).toHaveProperty("email", email);

  let phoneNum: string = "123456789"
  let company: string = "MyCompany"
    response = await request.get("https://practice.expandtesting.com/notes/api/users/profile",{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    },
    data: {
      name: userName,
      phone: phoneNum,
      company: company
    }
  });

  // Verify the response status
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Parse the JSON response
  responseBody = await response.json();
  console.log(responseBody);

  // Validate some fields
  expect(responseBody).toHaveProperty("message","Profile successful");
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody.data).toHaveProperty("id", userId);
  expect(responseBody.data).toHaveProperty("name", userName);
  expect(responseBody.data).toHaveProperty( "email",email);

  response = await request.get("https://practice.expandtesting.com/notes/api/users/profile",{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    },
    data: {
      name: userName,
      phone: "098765",
      company: "pqrs"
    }
  });

  // Verify the response status
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Parse the JSON response
  responseBody = await response.json();
  console.log(responseBody);

  // Validate some fields
  expect(responseBody).toHaveProperty("message","Profile successful");
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody.data).toHaveProperty("id", userId);
  expect(responseBody.data).toHaveProperty("name", userName);
  expect(responseBody.data).toHaveProperty( "email",email);

   let noteTitle = "New Note API";
   let noteDescription = "New note description";
   let category = "Home" 
  response = await request.post("https://practice.expandtesting.com/notes/api/notes",{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    },
    data:{
      "title" : noteTitle,
      "description" : noteDescription,
      "category" : category
    }
  });

    // Parse the JSON response
  responseBody = await response.json();
  console.log(responseBody);

  let noteId = responseBody.data.id;

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validate some fields
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody).toHaveProperty("message",  "Note successfully created");

  response = await request.get(`https://practice.expandtesting.com/notes/api/notes/${noteId}`,{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    }
  });

    // Parse the JSON response
  responseBody = await response.json();
  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validate some fields
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  //expect(responseBody).toHaveProperty("message",  "Notes successfully retrieved");

    response = await request.put(`https://practice.expandtesting.com/notes/api/notes/${noteId}`,{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    },
    data:{
      "title" : "Updated Note",
      "description" : "Note updatedd with Put call",
      "completed" : true,
      "category" : "Work"
    }
  });

    // Parse the JSON response
  responseBody = await response.json();
  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validate some fields
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody).toHaveProperty("message",  'Note successfully Updated');

  /*response = await request.delete(`https://practice.expandtesting.com/notes/api/users/logout`,{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    }
  });

    // Parse the JSON response
  responseBody = await response.json();
  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validate some fields
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody).toHaveProperty("message",   "User has been successfully logged out");*/

  response = await request.delete(`https://practice.expandtesting.com/notes/api/users/delete-account`,{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    }
  });

    // Parse the JSON response
  responseBody = await response.json();
  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validate some fields
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  //expect(responseBody).toHaveProperty("message",   "User has been successfully logged out");

});

test("DELETE to logout a user", async ({ request }) => {

  const token: string = "42b35ac6f93d4ca3b979e09e2fed00f0a0b863613bbe43539be8573301821862";
  const response = await request.delete(`https://practice.expandtesting.com/notes/api/users/logout`,{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    }
  });

    // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validate some fields
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody).toHaveProperty("message",   "User has been successfully logged out");

});

test("PUT to update a note", async ({ request }) => {

  const token: string = "42b35ac6f93d4ca3b979e09e2fed00f0a0b863613bbe43539be8573301821862";
  const noteId:string = "68fe8f5d3be9dc02965d746f";
  const response = await request.put(`https://practice.expandtesting.com/notes/api/notes/${noteId}`,{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    },
    data:{
      "title" : "New Note",
      "description" : "New Note with Put call",
      "completed" : true,
      "category" : "Work"
    }
  });

    // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validate some fields
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody).toHaveProperty("message",  'Note successfully Updated');

});

test("GET a note by id", async ({ request }) => {

  const token: string = "42b35ac6f93d4ca3b979e09e2fed00f0a0b863613bbe43539be8573301821862";
  const noteId:string = "68fe8f5d3be9dc02965d746f";
  const response = await request.get(`https://practice.expandtesting.com/notes/api/notes/${noteId}`,{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    }
  });

    // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validate some fields
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody).toHaveProperty("message",  "Notes successfully retrieved");

});

test("GET all notes", async ({ request }) => {

  const token: string = '42b35ac6f93d4ca3b979e09e2fed00f0a0b863613bbe43539be8573301821862';
  const response = await request.get("https://practice.expandtesting.com/notes/api/notes",{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    }
  });

    // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validate some fields
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody).toHaveProperty("message",  "Notes successfully retrieved");

});


test("POST create a new note", async ({ request }) => {

  const token: string = '42b35ac6f93d4ca3b979e09e2fed00f0a0b863613bbe43539be8573301821862';
  const response = await request.post("https://practice.expandtesting.com/notes/api/notes",{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    },
    data:{
      "title" : "second API note",
      "description" : "my second API note",
      "category" : "Home"
    }
  });

    // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validate some fields
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody).toHaveProperty("message",  "Note successfully created");

});


test("POST request verify change password", async ({ request }) => {

  const token: string = "1015952892e640b1b8dfa67a3fd5ec71a4d297e294344930bcdc630df7c35cca";
  const response = await request.post("https://practice.expandtesting.com/notes/api/users/change-password",{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    },
    data:{
      token: token,
      "currentPassword" : "playwright1",
      "newPassword" : "playwright2"
    }
  });

    // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validate some fields
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody).toHaveProperty("message", "The password was successfully updated");

});


test("POST request verify reset password", async ({ request }) => {

  const token: string = "08619c70751a4da396b9af4cecd044f5dd38ebda832d4c9591c1e943cd82e2ed";
  const response = await request.post("https://practice.expandtesting.com/notes/api/users/reset-password",{
    headers:{
      "accept": "application/json"
    },
    data:{
      token: token,
      "newPassword" : "playwright1"
    }
  });

    // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validate some fields
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody).toHaveProperty("message", "The password was successfully updated");

});


test("POST request verify reset password token", async ({ request }) => {

  const token: string = "38d42ceb78944ee1aa6d26bb8e8e7c715d0304d45608434fa9c0914d838a425a";
  const response = await request.post("https://practice.expandtesting.com/notes/api/users/verify-reset-password-token",{
    headers:{
      "accept": "application/json"
    },
    data: {
      token: token
    }
  });

    // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validate some fields
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody).toHaveProperty("message", "The provided password reset token is valid");

});


test("POST request Forgot Password Successful", async ({ request }) => {

  const email: string = "swathi.g12025@gmail.com";
  const response = await request.post("https://practice.expandtesting.com/notes/api/users/forgot-password",{
    headers:{
      "accept": "application/json"
    },
    data: {
      email: email
    }
  });

    // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  // Verify the response status
  // Verify the response status
  let message = "Password reset link successfully sent to " + email + ". Please verify by clicking on the given link";
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);




  // Validate some fields
  //expect(responseBody).toHaveProperty("message","Profile successful");
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody).toHaveProperty("message", message);

});

test("PATCH request Successful", async ({ request }) => {
    const token = "66f7c5bff4a9446da8e3eaad44b9387daa34f80fa9604fc1bac6607a601a3969";

  const response = await request.get("https://practice.expandtesting.com/notes/api/users/profile",{
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    },
    data: {
      name: "swathi playwright",
      phone: "098765",
      company: "pqrs"
    }
  });

  // Verify the response status
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  // Validate some fields
  expect(responseBody).toHaveProperty("message","Profile successful");
  expect(responseBody).toHaveProperty("success", true);
  expect(responseBody).toHaveProperty("status", 200);
  expect(responseBody.data).toHaveProperty("id", "68fd52503be9dc02965d61a1");
  expect(responseBody.data).toHaveProperty("name", "swathi playwright");
  expect(responseBody.data).toHaveProperty( "email","swathi.playwright@gmail.com");

});

test("GET request example", async ({ request }) => {
  // Make a GET request to a public API
  const response = await request.get("https://practice.expandtesting.com/notes/api/health-check");

  // Verify the response status
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  // Validate some fields
  expect(responseBody).toHaveProperty("success");
  expect(responseBody).toHaveProperty("status");
  expect(responseBody).toHaveProperty("message");
});

test("GET request for user profile Success", async ({ request }) => {

  const token = "66f7c5bff4a9446da8e3eaad44b9387daa34f80fa9604fc1bac6607a601a3969";
  // Make a GET request to a public API
  const response = await request.get("https://practice.expandtesting.com/notes/api/users/profile", {
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    }
  });

  // Verify the response status
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  // Validate some fields

  expect(responseBody).toHaveProperty("message", "Profile successful");
  expect(responseBody.data).toHaveProperty("id", "68fd52503be9dc02965d61a1");
  expect(responseBody.data).toHaveProperty("name",  "swathi playwright");
  expect(responseBody.data).toHaveProperty("email", "swathi.playwright@gmail.com");
});

test("GET request for user profile Failure", async ({ request }) => {

  const token = "66f7c5bff4a9446da8e3eaad44b9387daa34f80fa9604fc1bac6607a601a39"; //wrong token
  // Make a GET request to a public API
  const response = await request.get("https://practice.expandtesting.com/notes/api/users/profile", {
    headers:{
      "accept": "application/json",
      "x-auth-token": token
    }
  });

  // Verify the response status
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(401); //unauthorized

  // Parse the JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  // Validate some fields

  expect(responseBody).toHaveProperty("success", false);
  expect(responseBody).toHaveProperty("status", 401);
  expect(responseBody).toHaveProperty("message", "Access token is not valid or has expired, you will need to login");

});


test("POST request example failure", async ({ request }) => {
 const response = await request.post("https://practice.expandtesting.com/notes/api/users/register", {
    data: {
      name: "swathi playwright",
      email: "swathi.g12025@gmail.com",
      password: "playwright"
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

    // Verify status
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(409); // 409 = account already exists

    // Parse response body
  const responseBody = await response.json();
  console.log(responseBody);

    // Validate fields
  expect(responseBody).toHaveProperty("success", false);
  expect(responseBody).toHaveProperty("status", 409);
  expect(responseBody).toHaveProperty("message", "An account already exists with the same email address");

});

test("POST request example failure - Invalid Data", async ({ request }) => {
 const response = await request.post("https://practice.expandtesting.com/notes/api/users/register", {
    data: {
      abcd: "swathi playwright",
      efgh: "swathi.playwright@gmail.com",
      mnop: "playwright"
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

    // Verify status
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(400); // 400 = invalid input data

    // Parse response body
  const responseBody = await response.json();
  console.log(responseBody);

    // Validate fields
  expect(responseBody).toHaveProperty("success", false);
  expect(responseBody).toHaveProperty("status", 400);
  expect(responseBody).toHaveProperty("message",'User name must be between 4 and 30 characters');

});

test("POST request example Success", async ({ request }) => {
 const response = await request.post("https://practice.expandtesting.com/notes/api/users/register", {
    data: {
      name: "swathi playwright2",
      email: "swathi.playwright2@gmail.com",
      password: "playwright1"
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

    // Verify status
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201); // 201 = User account created successfully

    // Parse response body
  const responseBody = await response.json();
  console.log(responseBody);

    // Validate fields
  expect(responseBody.data).toHaveProperty("name", "swathi playwright2");
  expect(responseBody.data).toHaveProperty("email", "swathi.playwright2@gmail.com");

});

test("POST request Login success", async ({ request }) => {
 const response = await request.post("https://practice.expandtesting.com/notes/api/users/login", {
    data: {
      email: "swathi.g12025@gmail.com",
      password: "playwright"
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

    // Verify status
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200); // 201 = User account created successfully

    // Parse response body
  const responseBody = await response.json();
  console.log(responseBody);

    // Validate fields
  expect(responseBody.data).toHaveProperty("id", "68fd52503be9dc02965d61a1");
  expect(responseBody.data).toHaveProperty("name", "swathi playwright");
  expect(responseBody.data).toHaveProperty("email", "swathi.playwright@gmail.com");


});

test("POST request Login Failure", async ({ request }) => {
 const response = await request.post("https://practice.expandtesting.com/notes/api/users/login", {
    data: {
      email: "swathi.playwright@gmail.com",
      password: "playwright123"
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

    // Verify status
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(401); // 401 - unauthorized request

    // Parse response body
  const responseBody = await response.json();
  console.log(responseBody);

    // Validate fields
  expect(responseBody).toHaveProperty("success", false);
  expect(responseBody).toHaveProperty("status", 401);
  expect(responseBody).toHaveProperty("message", "Incorrect email address or password");


});




