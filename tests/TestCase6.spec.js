const { test, expect } = require('@playwright/test')
const testdata = JSON.parse(JSON.stringify(require("../testdata.json")))


//Test Case 5

test('TestCase5', async ({ page }) => {

  // --------------------------------- Step 1: Login to the Demo App--------------------------------------------------//

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




  //------------------------------ Step 2: Navigate to "Mobile Application Native" Section ----------------------------//
  await page.getByRole('button', { name: 'Mobile Application Native' }).click();



  // ------------------------------ Step 3: Verify "App icon design" is in the "Done" Column --------------------------//

  // Locators for the "Done" column and the task "App icon design"
  const doneColumn = await page.getByRole('heading', { name: 'Done (1)' });
  const taskElement = await page.getByRole('heading', { name: 'App icon design' });

  // Verify that the "App icon design" task is visible within the "Done" column
  const isTaskInDone = await doneColumn.locator('..').locator(taskElement).isVisible();

  // Assert the task is in the correct column
  expect(isTaskInDone).toBe(true);

  //Print the verification statement
  console.log(`"${testdata.tasks.task6.name}" is correctly placed in the "${testdata.tasks.todoColumnMobile.name}" column.`);

  // ------------------------------ Step 4: Confirm Tag: "Design" ----------------------------------------------------//

  // Locator for the "Design" tag
  const designTag = page.getByText(testdata.tags.design).first();

  // Verify that the "Design" tag is associated with the task
  const isDesignTagInTask = await taskElement.locator('..').locator(designTag).isVisible();
  expect(isDesignTagInTask).toBe(true);

  //Print the verification statement
  console.log(`"${testdata.tags.design}" tag is associated with "${testdata.tasks.task6.name}".`);
});