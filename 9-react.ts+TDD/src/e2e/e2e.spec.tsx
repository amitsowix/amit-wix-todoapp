import faker from "faker";
import puppeteer, { ElementHandle, Page, Browser } from "puppeteer";
import { TodoItemDTO } from "../../../common/interfaces";
import {driverObj} from "./e2e.driver";


const aTodo = (todo: Partial<TodoItemDTO>): TodoItemDTO => {
    return {
      text: todo.text || faker.random.words(3),
      id: todo.id || faker.datatype.uuid(),
      isChecked: todo.isChecked || faker.datatype.boolean(),
    }
  }; 


describe('E2E', () => {
    it('should add a new item', async () => {
      const driver = await driverObj();
      const todoItem: TodoItemDTO = aTodo({});
      await driver.when.addTodo([todoItem]);

      expect(await driver.get.firstTodoItemText()).toBe(todoItem.text);
    })

    it('should delete the item', async () => {
      const driver = await driverObj();
      await driver.when.addTodo([aTodo({})]);
      const deleteIcon: ElementHandle = await driver.get.deleteIcon() as ElementHandle;
      await driver.when.click(deleteIcon);

      const todoList: HTMLCollection = await driver.get.todoList();
      expect(todoList.length).toBe(undefined);
    })

    it('should edit item text', async () => {
      const driver = await driverObj();
      await driver.when.addTodo([aTodo({})]);
      const editIcon: ElementHandle = await driver.get.editIcon() as ElementHandle;
      await driver.when.click(editIcon);
      const newText = faker.random.words(3);
      await driver.when.type('input[name="edit-input"]', newText);
      const submitButtons = await driver.get.submitButtons() as Array<ElementHandle>;
      await driver.when.click(submitButtons[1]);

      expect((await driver.get.content()).match(newText)).not.toBe(null);
    })

    test('Toggle checkbox', async () => {
      const driver = await driverObj();
      await driver.when.addTodo([aTodo({})]);
      const checkbox: ElementHandle = await driver.get.checkbox() as ElementHandle;
      await driver.when.click(checkbox);

      const text: ElementHandle = await driver.get.todoText() as ElementHandle;
      let className: string = await (await text?.getProperty('className'))?.jsonValue() as string;
      expect(className?.includes('Checked')).toBeTruthy();

      await driver.when.click(checkbox);

      className = await (await text?.getProperty('className'))?.jsonValue() as string;
      expect(className?.includes('Checked')).toBeFalsy();
    })

});

