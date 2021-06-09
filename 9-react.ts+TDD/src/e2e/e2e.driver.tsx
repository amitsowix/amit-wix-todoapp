import puppeteer, { ElementHandle, Page, Browser, JSHandle } from "puppeteer";
import { TodoItemDTO } from "../../../common/interfaces";


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
    await page.waitForSelector('div[data-hook="app-container"]');
  
    return page;
}

export async function driverObj() {
    const page: Page = await initTestEnv();
    return {
        when: {
            click: async (element: ElementHandle) => {
              await element.click();
            },
            type: async (selector: string, text: string): Promise<void> => {
              await page.type(selector, text);
            },
            addTodo: async (todos: Array<TodoItemDTO>): Promise<void> => {
              await todos.forEach(async todoItem => {
                await page.click('div[data-hook="new-item-button"]');
                await page.type('input[name="add-new-item"]', todoItem.text);
                await page.click('div[data-hook="submit-button"]');
              })
            }
          },
        get: {
            firstTodoItemText: async (): Promise<string> => {
              const element: ElementHandle = await page.waitForSelector('div[data-hook=todo-item]') as ElementHandle;
              const property: JSHandle = await element.getProperty('textContent') as JSHandle;
              return property.jsonValue();
            },
            editIcon: async (): Promise<ElementHandle | null> => {
              return await page.waitForSelector('img[data-hook=edit-icon]');
            },
            deleteIcon: async (): Promise<ElementHandle | null> => {
              return await page.waitForSelector('img[data-hook="delete-icon"]');
            },
            submitButtons: async (): Promise<Array<ElementHandle | null>> => {
              return await page.$$('div[data-hook="submit-button"]');
            },
            input: async (): Promise<ElementHandle | null> => {
              return await page.waitForSelector('input[name="edit-input"]');
            },
            checkbox: async (): Promise<ElementHandle | null> => {
              return await page.waitForSelector('input[type=checkbox]');
            },
            todoText: async (): Promise<ElementHandle | null> => {
              return await page.waitForSelector('div[data-hook=todo-text]');
            },
            todoList: async (): Promise<HTMLCollection> => {
              return await page.$eval('ul[data-hook="list-container"]', el => el.children);
            },
            content: async (): Promise<string> => {
              return await page.content();
            }
        }
    }
}

