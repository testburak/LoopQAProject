const { test, expect } = require('@playwright/test')
const testdata = JSON.parse(JSON.stringify(require("../testdata.json")))


//Test Case 1

test('TestCase1', async ({ page }) => {

  // ---------------------------------------Step 1: Login to the Demo App-------------------------------------------//

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




  // ----------------------------- Step 2: Navigate to "Web Application" Section ------------------------------------//
  await page.getByRole('banner').getByRole('heading', { name: 'Web Application' }).click();


  // ------------------------------Step 3: Verify "Implement user authentication" in the "To Do" Column--------------//


  // Locators for the "To Do" column and the "Implement user authentication"
  const todoColumn = await page.getByRole(testdata.tasks.todoColumn.role, { name: testdata.tasks.todoColumn.name });
  const taskElement = await page.getByRole(testdata.tasks.task1.role, { name: testdata.tasks.task1.name });

  // Check if the task is under the "To Do" column
  const isTaskInTodo = await todoColumn.locator('..').locator(taskElement).isVisible();

  // Assert the task is in the correct column
  expect(isTaskInTodo).toBe(true);
  
  //Print the verification statement
  console.log(`"${testdata.tasks.task1.name}" is correctly placed in the "${testdata.tasks.todoColumn.name}" column.`);



  // ------------------------------Step 4: Confirm Tags: "Feature" and "High Priority"------------------------------//



  // Tag Locators
  const featureTag = page.getByText(testdata.tags.feature).first();
  const highPriorityTag = page.getByText(testdata.tags.highPriority).first();

  // Verify the "Feature" tag is associated with the task
  const isFeatureTagInTask = await taskElement.locator('..').locator(featureTag).isVisible();
  expect(isFeatureTagInTask).toBe(true);

  // Verify the "High Priority" tag is associated with the task
  const isHighPriorityTagInTask = await taskElement.locator('..').locator(highPriorityTag).isVisible();
  expect(isHighPriorityTagInTask).toBe(true);

  //Print the verification statement
  console.log(`Both "${testdata.tags.feature}" and "${testdata.tags.highPriority}" tags are associated with "${testdata.tasks.task1.name}".`);
});


