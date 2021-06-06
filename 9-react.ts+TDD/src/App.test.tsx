import faker from "faker";
import puppeteer, { ElementHandle, Page, Browser } from "puppeteer";
import { TodoItemDTO } from "../../common/interfaces";


const todoItem: TodoItemDTO = {
    text: faker.random.words(3),
    id: faker.datatype.uuid(),
    isChecked: faker.datatype.boolean(),
  };


const initTestEnv = async (): Promise<Page> => {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    devtools: false,
  });

  const page: Page = await browser.newPage();

  page.emulate({
    viewport: {
      width: 500,
      height: 900
    },
    userAgent: ''
  });

  await page.goto('http://localhost:8080/');
  await page.waitForSelector('.appBodyContainer-0-2-3');

  return page;
}


const addNewItem = async (page: Page): Promise<void> => {
  await page.click(".newItemButton-0-2-8");
  await page.type("input[name=add-new-item]", todoItem.text);
  await page.click(".submitButton-0-2-12");
}

describe('E2E', () => {
    test('Add new item', async () => {
      const page: Page = await initTestEnv();
      await addNewItem(page);
      await page.waitForSelector('div[data-hook=todo-item]');
    })

    test('Delete item', async () => {
      const page = await initTestEnv();
      await addNewItem(page);
      await page.waitForSelector('div[data-hook=todo-item]');
      const actionItems: Array<ElementHandle> = await page.$$('.icon-0-2-14');
      await actionItems[1].click();
      expect(await page.$('div[data-hook=todo-item]')).toBe(null);
    })

    test('Edit item', async () => {
      const page: Page = await initTestEnv();
      await addNewItem(page);
      const editIcon: ElementHandle | null = await page.$('img[data-hook=edit-icon]');
      await editIcon?.click();
      const newText = faker.random.words(3);
      await page.type("input[name=edit-input]", newText);
      await page.click("div[data-hook=submit-button]");
      expect(await page.$('.input-0-2-18')).toBe(null);
      expect((await page.content()).match(newText)).not.toBe(null);
    })

    test('Toggle checkbox', async () => {
      const page: Page = await initTestEnv();
      await addNewItem(page);
      await page.waitForSelector('div[data-hook=todo-item]');
      const checkbox: ElementHandle | null = await page.$('input[type=checkbox]');
      await checkbox?.click();
      const text: ElementHandle | null = await page.$('div[data-hook=todo-text]');
      let className: string | undefined = await (await text?.getProperty('className'))?.jsonValue();
      expect(className?.includes('Checked')).toBeTruthy();
      await checkbox?.click();
      className = await (await text?.getProperty('className'))?.jsonValue();
      expect(className?.includes('Checked')).toBeFalsy();
    })

});

