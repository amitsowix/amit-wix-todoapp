import faker from "faker";
import puppeteer, { ElementHandle, Page, Browser } from "puppeteer";
import { TodoItemDTO } from "../../../common/interfaces";



const driver = {
  given: {
    todos: async (todos: Array<TodoItemDTO>, page: Page): Promise<void> => {
      await todos.forEach(async todoItem => {
        await page.click('div[data-hook="new-item-button"]');
        await page.type('input[name="add-new-item"]', todoItem.text);
        await page.click('div[data-hook="submit-button"]');
      })
    }
  },
  when: {
    initTestEnv: async (): Promise<Page> => {

      const browser: Browser = await puppeteer.launch({
        headless: false,
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
      await page.waitForSelector('div[data-hook="app-container"]');
    
      return page;
    },
    click: async (element: ElementHandle) => {
      await element.click();
    },
    type: async (selector: string, text: string, page: Page): Promise<void> => {
      await page.type(selector, text);
    }
  },
  get: {
    todoItem: async (page: Page): Promise<ElementHandle | null> => {
      return await page.waitForSelector('div[data-hook=todo-item]');
    },
    editIcon: async (page: Page): Promise<ElementHandle | null> => {
      return await page.waitForSelector('img[data-hook=edit-icon]');
    },
    deleteIcon: async (page: Page): Promise<ElementHandle | null> => {
      return await page.waitForSelector('img[data-hook="delete-icon"]');
    },
    submitButton: async (page: Page): Promise<Array<ElementHandle | null>> => {
      return await page.$$('div[data-hook="submit-button"]');
    },
    input: async (page: Page): Promise<ElementHandle | null> => {
      return await page.waitForSelector('input[name="edit-input"]');
    },
    checkbox: async (page: Page): Promise<ElementHandle | null> => {
      return await page.waitForSelector('input[type=checkbox]');
    },
    todoText: async (page: Page): Promise<ElementHandle | null> => {
      return await page.waitForSelector('div[data-hook=todo-text]');
    },
    todoList: async (page: Page): Promise<HTMLCollection> => {
      return await page.$eval('ul[data-hook="list-container"]', el => el.children);
    },
  }
}

const aTodo = (): TodoItemDTO => {
    return {
      text: faker.random.words(3),
      id: faker.datatype.uuid(),
      isChecked: faker.datatype.boolean(),
    }
  }; 


describe('E2E', () => {

    it('should add a new item', async () => {

      const page: Page = await driver.when.initTestEnv();

      await driver.given.todos([aTodo()], page);

      expect(await driver.get.todoItem).toBeTruthy();
    })

    it('should delete the item', async () => {

      const page: Page = await driver.when.initTestEnv();

      await driver.given.todos([aTodo()], page);

      const deleteIcon: ElementHandle | null = await driver.get.deleteIcon(page);

      if (deleteIcon)
        await driver.when.click(deleteIcon);

      const todoList: HTMLCollection = await driver.get.todoList(page);

      expect(todoList.length).toBe(undefined);
    })

    it('should edit item text', async () => {

      const page: Page = await driver.when.initTestEnv();

      await driver.given.todos([aTodo()], page);

      const editIcon: ElementHandle | null = await driver.get.editIcon(page);
      console.log(editIcon);
      if (editIcon){
        await driver.when.click(editIcon);
      }
      
      const newText = faker.random.words(3);
      const input = driver.get.input(page);
      await driver.when.type('input[name="edit-input"]', newText, page);
      
      const submitButtons = await driver.get.submitButton(page);
      if (submitButtons[1])
        await driver.when.click(submitButtons[1]);

      expect((await page.content()).match(newText)).not.toBe(null);
    })

    test('Toggle checkbox', async () => {

      const page: Page = await driver.when.initTestEnv();

      await driver.given.todos([aTodo()], page);
    
      const checkbox: ElementHandle | null = await driver.get.checkbox(page);

      if (checkbox)
        await driver.when.click(checkbox);

      const text: ElementHandle | null = await driver.get.todoText(page);

      let className: string | undefined = await (await text?.getProperty('className'))?.jsonValue();
      expect(className?.includes('Checked')).toBeTruthy();

      if (checkbox)
        await driver.when.click(checkbox);

      className = await (await text?.getProperty('className'))?.jsonValue();
      expect(className?.includes('Checked')).toBeFalsy();
    })

});

