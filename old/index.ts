import * as $ from 'jquery';
import { TodoTxtView } from './src/ui/todo-txt-view';

$('document').ready(() => {
    TodoTxtView.initializeElements();
    TodoTxtView.refreshUi();
});