import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { TodoTxt } from '../../../src/app/todo-txt-web-ui/todo-txt';
import { TodoTxtView } from '../../src/ui/todo-txt-view';
import { TodoTxtVault } from '../../../src/app/todo-txt-web-ui/storage/todo-txt-vault';
import { waitUntil } from '../test-helper';
import { TodoTxtTask } from '../../../src/app/todo-txt-web-ui/tasks/todo-txt-task';

describe('TodoTxtView', () => {
    beforeAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    });

    beforeAll(() => {
        TodoTxtVault._clear();
        try {
            document.querySelector('#todotxt').remove();
        } catch (e) {}
    });
    
    beforeEach(async () => {
        TodoTxtVault._clear();
        let div: HTMLDivElement = document.createElement('div');
        div.id = 'todotxt';
        document.body.appendChild(div);

        TodoTxtView.initializeElements();
        TodoTxtView.refreshUi();
    });

    afterEach(() => {
        TodoTxtVault._clear();
        try {
            document.querySelector('#todotxt').remove();
        } catch (e) {}
    });
    
    xit('can mark task as completed from list view', async () => {
        // add a new Task
        let text: string = '(A) Call Mom & Dad @Phone +Family <tuesday>';
        let id: string = TodoTxt.createTask(text);
        TodoTxtView.displayTasks();

        // expect default button class because Task is open
        await waitUntil(() => {
            return document.querySelector('#listContainer-div span').className.match(/(btn-default)/) != null;
        }, 3000);
        
        // click on Task completion button to mark as completed
        $('#listContainer-div span').click();

        // expect completed Task to be removed from DOM
        await waitUntil(() => {
            return document.querySelector('#listContainer-div span') == null;
        }, 3000);

        let task: TodoTxtTask = TodoTxt.getTask(id);
        expect(task.isActive).toBeFalse();
    });

    xit('can display closed tasks', async () => {
        // ensure configuration is set to NOT display closed tasks
        if (TodoTxtVault.getConfig().showClosed) {
            TodoTxtVault.setConfig({showClosed: false});
            await waitUntil(() => {
                return !TodoTxtVault.getConfig().showClosed;
            }, 1000);
        }

        let showClosedSpy = spyOn(TodoTxtView, 'toggleShowClosedStatus').and.callThrough();
        
        // click UI Button to display closed Tasks
        $('#showClosed-label').click();

        expect(showClosedSpy).toHaveBeenCalledTimes(1);

        // ensure configuration is set to display closed tasks
        await waitUntil(() => {
            return TodoTxtVault.getConfig().showClosed;
        }, 5000);

        // create closed Task
        let id: string = TodoTxt.createTask('x 2019-12-01 completed task');
        TodoTxtView.refreshUi();
        
        await waitUntil(() => {
            let task: TodoTxtTask = TodoTxt.getTask(id);
            return !task.isActive && document.querySelector('#listContainer-div span').className.match(/(btn-danger)/).length > 0;
        }, 5000);
    });

    it('can handle input containing HTML characters', () => {
        // add a new Task
        let text: string = '& I have > you do &';
        let expectedText: string = '&amp; I have &gt; you do &amp;';
        let id: string = TodoTxt.createTask(text);
        TodoTxtView.displayTasks();

        let taskTextContainer: Element = document.querySelector('#listContainer-div button');
        let actualUiText: string = taskTextContainer.innerHTML;
        let actualUiTextContent: string = taskTextContainer.textContent;

        expect(actualUiText).toEqual(expectedText);
        expect(actualUiTextContent).toEqual(text);

        let actualObjText: string = TodoTxt.getTask(id).text;

        expect(actualObjText).toEqual(text);
    });

    it('instantiates all the required elements', () => {
        let el: HTMLElement;
        
        el = document.querySelector('#fileDrop-div') as HTMLElement;
        expect(el).not.toBeNull();
        el = document.querySelector('#fileUpload-input') as HTMLElement;
        expect(el).not.toBeNull();
        el = document.querySelector('#addTaskButton-button') as HTMLElement;
        expect(el).not.toBeNull();
        el = document.querySelector('#saveFileButton-button') as HTMLElement;
        expect(el).not.toBeNull();
        el = document.querySelector('#showClosed-label') as HTMLElement;
        expect(el).not.toBeNull();
        el = document.querySelector('#filter-input') as HTMLElement;
        expect(el).not.toBeNull();
        el = document.querySelector('#clearFilter-button') as HTMLElement;
        expect(el).not.toBeNull();
        el = document.querySelector('#listContainer-div') as HTMLElement;
        expect(el).not.toBeNull();
        el = document.querySelector('#priorities-div') as HTMLElement;
        expect(el).not.toBeNull();
        el = document.querySelector('#priorities-ul') as HTMLElement;
        expect(el).not.toBeNull();
        el = document.querySelector('#projects-div') as HTMLElement;
        expect(el).not.toBeNull();
        el = document.querySelector('#projects-ul') as HTMLElement;
        expect(el).not.toBeNull();
        el = document.querySelector('#contexts-div') as HTMLElement;
        expect(el).not.toBeNull();
        el = document.querySelector('#contexts-ul') as HTMLElement;
        expect(el).not.toBeNull();
    });

    it('does not display Projects from completed tasks', async () => {
        // ensure configuration is set to NOT display closed tasks
        if (TodoTxtVault.getConfig().showClosed) {
            TodoTxtVault.setConfig({showClosed: false});
            await waitUntil(() => {
                return !TodoTxtVault.getConfig().showClosed;
            }, 1000);
        }
        
        // add a new completed Task
        let text: string = 'x 2019-12-01 Call +Family on the @Phone';
        let id: string = TodoTxt.createTask(text);
        TodoTxtView.displayTasks();

        let task: TodoTxtTask = TodoTxt.getTask(id);
        expect(task.isActive).toBeFalse();
        let projList: HTMLUListElement = document.querySelector('#projects-ul');
        let projects: NodeListOf<Element> = projList.querySelectorAll('li');
        expect(projects.length).toEqual(0);
    });

    it('does not display Contexts from completed tasks', async () => {
        // ensure configuration is set to NOT display closed tasks
        if (TodoTxtVault.getConfig().showClosed) {
            TodoTxtVault.setConfig({showClosed: false});
            await waitUntil(() => {
                return !TodoTxtVault.getConfig().showClosed;
            }, 1000);
        }
        
        // add a new completed Task
        let text: string = 'x 2019-12-01 Call +Family on the @Phone';
        let id: string = TodoTxt.createTask(text);
        TodoTxtView.displayTasks();

        let task: TodoTxtTask = TodoTxt.getTask(id);
        expect(task.isActive).toBeFalse();
        let projList: HTMLUListElement = document.querySelector('#contexts-ul');
        let projects: NodeListOf<Element> = projList.querySelectorAll('li');
        expect(projects.length).toEqual(0);
    });
});