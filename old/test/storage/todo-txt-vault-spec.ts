import { TodoTxtTask } from "../../../src/app/todo-txt-web-ui/tasks/todo-txt-task";
import { TodoTxtVault } from "../../../src/app/todo-txt-web-ui/storage/todo-txt-vault";
import { TodoTxt } from "../../src/todo-txt";

describe('TodoTxtVault', () => {
    beforeEach(() => {
        TodoTxtVault._clear();
    });

    afterAll(() => {
        TodoTxtVault._clear();
    });
    
    /**
     * NOTE: this test places too heavy a burden on the build agent so it
     * has been disabled with the expectation it should be run locally on 
     * major changes
     */
    xit('can add massive number of tasks', () => {
        let max: number = 5000;
        let startTime = Date.now();
        for (var i=0; i<max; i++) {
            let task: TodoTxtTask = new TodoTxtTask(`(A) do some work for @Foo${i} because of +Bar${i}`);
            TodoTxtVault.addTask(task);
        }
        let endTime = Date.now();
        let elapsed = endTime - startTime;

        expect(elapsed).toBeLessThan(30000);
    }, 120000);

    it('can save without localStorage', () => {
        spyOn(localStorage, 'setItem').and.throwError('no worky...');
        spyOn(localStorage, 'getItem').and.throwError('also no worky...');

        let task: TodoTxtTask = new TodoTxtTask('(B) present +ImportantThing to @ImportantPerson');
        TodoTxtVault.addTask(task);

        let actual: TodoTxtTask = TodoTxt.getTask(task.id);
        expect(actual).not.toBeNull();
        expect(actual.text).toEqual(task.text);
    });

    it('can remove task', () => {
        let task: TodoTxtTask = new TodoTxtTask('(A) do the +Things for @Karen');
        TodoTxtVault.addTask(task);

        let actual: TodoTxtTask = TodoTxt.getTask(task.id);
        expect(actual).not.toBeNull();
        expect(actual.text).toEqual(task.text);

        TodoTxtVault.removeTask(task.id);

        expect(() => TodoTxt.getTask(task.id)).toThrow();
    });

    it('throws exception on calling getTask if task does not exist', () => {
        expect(() => TodoTxt.getTask('does-not-exist')).toThrow();
    });
});