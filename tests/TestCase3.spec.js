const { test, expect } = require('@playwright/test')
const testdata = JSON.parse(JSON.stringify(require("../testdata.json")))


//Test Case 3

test('TestCase3', async ({ page }) => {

  // ---------------------------------Step 1: Login to the Demo App-------------------------------------------------------//

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




  //-----------------------------------Step 2: Navigate to "Web Application" Section --------------------------------------//
  await page.getByRole('banner').getByRole('heading', { name: 'Web Application' }).click();



  //-----------------------------------Step 3: Verify "Design system updates" is in the "In Progress" column --------------//

  // Locators for the "In Progress" column and the task "Design system updates"
  const inProgressColumn = await page.getByRole(testdata.tasks.inProgressColumn.role, { name: testdata.tasks.inProgressColumn.name });
  const taskElement = await page.getByRole(testdata.tasks.task3.role, { name: testdata.tasks.task3.name });

  // Check if the task is under the "In Progress" column
  const isTaskInInProgress = await inProgressColumn.locator('..').locator(taskElement).isVisible();
  
  // Assert the task is in the correct column
  expect(isTaskInInProgress).toBe(true);
  
  //Print the verification statement
  console.log(`"${testdata.tasks.task3.name}" is correctly placed in the "${testdata.tasks.inProgressColumn.name}" column.`);



  //-------------------------------------Step 4: Confirm tag: "Design” ----------------------------------------------------//

  // Locator for the "Design" tag
  const designTag = page.locator('text="' + testdata.tags.design + '"').first(); 

  // Verify the "Design" tag is associated with the task
  const isDesignTagInTask = await designTag.isVisible();
  expect(isDesignTagInTask).toBe(true);

  //Print the verification statement
  console.log(`"${testdata.tags.design}" tag is associated with "${testdata.tasks.task3.name}".`);

});