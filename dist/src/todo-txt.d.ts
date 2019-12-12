import { TodoTxtTask } from './tasks/todo-txt-task';
export declare module TodoTxt {
    /**
     * function will return a sorted array of tasks as pulled from
     * localStorage.
     * @returns {array} a sorted list of tasks from localStorage
     */
    function getSortedTaskArray(): TodoTxtTask[];
    /**
     * function will return a filtered array of tasks based on the passed in
     * filter string.  Matching uses an ordered fuzzy match so for the following:
     * "(A) 2014-03-02 don't forget to file @report with +John" a passed in filter
     * string of "for John" will match, but "John report" will not match
     * @param {string} filterStr - a string containing characters to match against the existing tasks
     * @returns {array} a sorted list of tasks matching the passed in <b><i>filterStr</i></b>
     */
    function getFilteredTaskArray(filterStr: string): TodoTxtTask[];
    /**
     * function will process each line of the todo.txt, sort by priority,
     * creationDate, and state (active or closed).
     *
     * @param {string} todoTxt - the "\n" delimited lines from a todo.txt file
     * @param {boolean} append - a boolean indicating if existing tasks should be cleared
     * first or just appended to with the new file
     */
    function parseTodoTxtFile(todoTxt: string, append?: boolean): void;
    /**
     * function creates a new task and saves to {TodoTxtVault}
     * @param {string} textStr - a string representing a raw task
     * @returns {string} the ID of the newly created {TodoTxt.Task}
     */
    function createTask(textStr: string): string;
    /**
     * function will get a specified task from TodoTxtVault by id
     * @param {string} taskId - the unique id of the task to be returned
     * @returns {TodoTxtTask} a task or null if task not found
     */
    function getTask(taskId: string): TodoTxtTask;
    /**
     * function updates the task and saves it to the TodoTxtVault cache
     * @param {string} taskId - unique ID used to retrieve the task from Storage
     * @param {string} newText - a string representing the updated, raw task text
     * @returns {boolean} true if task could be updated otherwise false
     */
    function updateTask(taskId: string, newText: string): boolean;
    /**
     * function adds this task to the browser's local cache allowing for
     * retained data on subsequent reloads of the page
     * @param {TodoTxtTask} task - a task to be added to Storage
     */
    function addTask(task: TodoTxtTask): void;
    /**
     * function will append an "x YYYY-MM-DD " to a stored
     * task if not already closed and will remove any priority
     * declarations in the text of the Task
     * @param {string} taskId - unique ID used to retrieve the task from Storage
     * @returns {boolean} true if task could be closed, otherwise false
     */
    function closeTask(taskId: string): boolean;
    /**
     * function will remove "x YYYY-MM-DD " from a stored
     * task if not already active
     * @param {string} taskId - unique ID used to retrieve the task from Storage
     * @returns {boolean} true if task could be activated, otherwise false
     */
    function activateTask(taskId: string): boolean;
}
