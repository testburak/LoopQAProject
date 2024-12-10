const { test, expect } = require('@playwright/test')
const testdata = JSON.parse(JSON.stringify(require("../testdata.json")))


//Test Case 5

test('TestCase5', async ({ page }) => {

  // -------------------------------- Step 1: Login to the Demo App----------------------------------------------------------//

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




  //------------------------------ Step 2: Navigate to "Mobile Application Native" Section -----------------------------------//
  await page.getByRole('button', { name: 'Mobile Application Native' }).click();




  // ------------------------------ Step 3: Verify "Offline mode" is in the "In Progress" Column -----------------------------//

  // Locators for the "In Progress" column and the task "Offline mode"
  const inProgressColumn = await page.getByRole(testdata.tasks.inProgressColumn.role, { name: testdata.tasks.inProgressColumn.name });
  const taskElement = await page.getByRole(testdata.tasks.task5.role, { name: testdata.tasks.task5.name });

  // Check if the task is under the "In Progress" column
  const isTaskInProgress = await inProgressColumn.locator('..').locator(taskElement).isVisible();
  
  // Assert the task is in the correct column
  expect(isTaskInProgress).toBe(true);

  //Print the verification statement
  console.log(`"${testdata.tasks.task5.name}" is correctly placed in the "${testdata.tasks.todoColumnMobile.name}" column.`);
  
  // ------------------------------ Step 4: Confirm Tags: "Feature" and "High Priority" --------------------------------------//

  // Locators for the tags "Feature" and "High Priority"
  const featureTag = page.getByText(testdata.tags.feature).first();
  const highPriorityTag = page.getByText(testdata.tags.highPriority).first();

  // Verify that the "Feature" tag is associated with the task
  const isFeatureTagInTask = await taskElement.locator('..').locator(featureTag).isVisible();
  expect(isFeatureTagInTask).toBe(true);

  // Verify that the "High Priority" tag is associated with the task
  const isHighPriorityTagInTask = await taskElement.locator('..').locator(highPriorityTag).isVisible();
  expect(isHighPriorityTagInTask).toBe(true);

  //Print the verification statement
  console.log(`Both "${testdata.tags.feature}" and "${testdata.tags.highPriority}" tags are associated with "${testdata.tasks.task5.name}".`);


});