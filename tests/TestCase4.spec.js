const { test, expect } = require('@playwright/test')
const testdata = JSON.parse(JSON.stringify(require("../testdata.json")))


//Test Case 4

test('TestCase4', async ({ page }) => {

  // -------------------------------- Step 1: Login to the Demo App-----------------------------------------------------//

  //Navigate to the Demo link
  await page.goto(testdata.login.url);

  //Click “Username” box to type
  await page.getByLabel('Username').click();
  //Send username to the box
  await page.getByLabel('Username').fill(testdata.login.username);
  //Switch to the Password box
  await page.getByLabel('Username').press('Tab');
  //Send password to the Password box
  await page.getByLabel('Password').fill(testdata.login.password);

  //Click “Sign in”. button to login the Demo app
  await page.getByRole('button', { name: 'Sign in' }).click();




  //------------------------------ Step 2: Navigate to "Mobile Application" Section -----------------------------------//
  await page.getByRole('button', { name: 'Mobile Application Native' }).click();



  // ------------------------------ Step 3: Verify "Push notification system" is in the "To Do" column ----------------//

  // Locator for the "To Do" column (Mobile)
  const todoColumnMobile = await page.getByRole(testdata.tasks.todoColumnMobile.role, { name: testdata.tasks.todoColumnMobile.name });
  const taskElement = await page.getByRole(testdata.tasks.task4.role, { name: testdata.tasks.task4.name });

  // Check if the task is under the "To Do" column
  const isTaskInTodo = await todoColumnMobile.locator('..').locator(taskElement).isVisible();

  // Assert the task is in the correct column
  expect(isTaskInTodo).toBe(true);

  //Print the verification statement
  console.log(`"${testdata.tasks.task4.name}" is correctly placed in the "${testdata.tasks.todoColumnMobile.name}" column.`);

  // ------------------------------ Step 4: Confirm the "Feature" tag -------------------------------------------------//

  // Locator for the "Feature" tag
  const featureTag = page.getByText(testdata.tags.feature).first();

  // Verify the "Feature" tag is associated with the task
  const isFeatureTagInTask = await taskElement.locator('..').locator(featureTag).isVisible();
  expect(isFeatureTagInTask).toBe(true);

  //Print the verification statement
  console.log(`The "${testdata.tags.feature}" tag is correctly associated with "${testdata.tasks.task4.name}".`);


});