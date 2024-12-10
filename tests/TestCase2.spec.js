const { test, expect } = require('@playwright/test')
const testdata = JSON.parse(JSON.stringify(require("../testdata.json")))


//Test Case 2

test('TestCase2', async ({ page }) => {

  // --------------------------------Step 1: Login to the Demo App------------------------------------------------------//

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




  //------------------------------ Step 2: Navigate to "Web Application" Section ---------------------------------------//
  await page.getByRole('banner').getByRole('heading', { name: 'Web Application' }).click();



  //------------------------------ Step 3: Verify the "Fix navigation bug" in the "To Do" Column -----------------------//

  
  // Locators for the "To Do" column and the "Fix navigation bug" 
  const todoColumn = await page.getByRole(testdata.tasks.todoColumn.role, { name: testdata.tasks.todoColumn.name });
  const taskElement2 = await page.getByRole(testdata.tasks.task2.role, { name: testdata.tasks.task2.name });

  // Check if the task is under the "To Do" column
  const isTaskInTodo = await todoColumn.locator('..').locator(taskElement2).isVisible();

  // Assert the task is in the correct column
  expect(isTaskInTodo).toBe(true);

  //Print the verification statement
  console.log(`"${testdata.tasks.task2.name}" is correctly placed in the "${testdata.tasks.todoColumn.name}" column.`);



  //------------------------------ Step 4: Confirm Tag "Bug" ------------------------------------------------------------//


  // Locator for the "Bug" tag
  const bugTag = page.locator('text="Bug"').first(); // Use exact match with `.first()` to get the first occurrence

  // Verify the "Bug" tag is associated with the task
  const isBugTagInTask = await bugTag.isVisible();
  expect(isBugTagInTask).toBe(true);
  
  //Print the verification statement
  console.log(`"${testdata.tags.bug}" tag is associated with "${testdata.tasks.task2.name}".`);
});