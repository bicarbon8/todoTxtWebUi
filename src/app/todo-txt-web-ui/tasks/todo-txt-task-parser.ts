import { TodoTxtUtils } from "../helpers/todo-txt-utils";
import { TodoTxtTask } from "./todo-txt-task";

export module TodoTxtTaskParser {
    export function get(text: string): TodoTxtTask {
        let task: TodoTxtTask = {
            id: TodoTxtUtils.guid(),
            text: text,
            isActive: getIsActive(text),
            priority: getPriority(text),
            completedDate: getCompletedDate(text),
            createdDate: getCreatedDate(text),
            projects: getProjects(text),
            contexts: getContexts(text)
        };
        return task;
    }

    export function getMany(...texts: string[]): TodoTxtTask[] {
        let tasks: TodoTxtTask[] = [];
        if (texts) {
            for (var i=0; i<texts.length; i++) {
                tasks.push(get(texts[i]));
            }
        }
        return tasks;
    }

    function getIsActive(str: string): boolean {
        // check for strings starting with something like "x "
        let match: RegExpMatchArray = str.match(/^(x )/);
        if (match && match.length > 0) {
            return false;
        }
        return true;
    }

    function getPriority(str: string): string {
        let pri: string;
        if (str) {
            // parse out the priority RegEx: /\^([A-Z]\).*/ 
            // check for strings starting with something like "(A) "
            let priPattern: RegExp = /^(\([A-Z]\)[\s]+)/;
            var match = str.match(priPattern); // returns null if not found
            if (match) {
                // found an active match so get the priority
                pri = match[0].replace(/[\s]*/g, "");
            }
        }
        return pri;
    }

    function getCompletedDate(str: string): string {
        var completed: string;
        
        // parse out the completedDate if closed (starts with "x ")
        if (!getIsActive(str)) {
            let dates: string[] = getDatesFromText(str);
            if (dates) {
                completed = dates[0] ? dates[0].replace(/[\s]*/g, "") : undefined;
            }
        }
        
        return completed;
    }

    function getCreatedDate(str: string): string {
        var created: string;
        // parse out the createdDate (will be 2nd if item is closed)
        let dates: string[] = getDatesFromText(str);
        if (dates) {
            if (!getIsActive(str)) {
                if (dates.length > 1) { // we have created and completed
                    created = dates[1] ? dates[1].replace(/[\s]*/g, "") : undefined;
                }
                // only 1 date and is completed so no created date
            } else {
                created = dates[0] ? dates[0].replace(/[\s]*/g, "") : undefined;
            }
        }
        
        return created;
    }

    function getDatesFromText(str: string): string[] {
        var dates: string[] = [];
        if (str) {
            // check for strings with something like "2012-08-09"
            let datePattern: RegExp = /(?:\s|^)(\d{4}-\d{2}-\d{2})(?=\s)/g;
            let match: RegExpMatchArray = str.match(datePattern); // returns null if not found
            if (match) {
                for (var i=0; i<match.length; i++) {
                    dates.push(match[i]);
                }
            }
        }
        return dates;
    }

    function getProjects(str: string): string[] {
        var tmpSet: Set<string> = new Set<string>(); // used to hold the project if set
        if (str) {
            // parse out the projects RegEx: /\+[0-9A-Za-z]+\s/ (words starting with "+")
            // check for strings like "+ABC123"
            var projPattern = /((\s|^)[\(\{\["']?\+[0-9A-Za-z]+[\)\}\]"']?(?=\s|$))/g;
            var match = str.match(projPattern); // returns null if not found
            if (match) {
                // only store one instance of duplicate project entries
                for (var i=0; i<match.length; i++) {
                    var p = match[i].replace(/[\s]*/g, "").replace(/[\(\{\[\)\}\]"']/g, "");;
                    tmpSet.add(p);
                }
            }
        }
        return Array.from(tmpSet);
    }

    function getContexts(str: string): string[] {
        var tmpSet: Set<string> = new Set<string>(); // used to hold the context if set
        if (str) {
            // parse out the contexts RegEx: /\@[0-9A-Za-z]+\s/ (words starting with "@")
            // check for strings like "@ABC123"
            var ctxPattern = /((\s|^)[\(\{\["']?\@[0-9A-Za-z]+[\)\}\]"']?(?=\s|$))/g;
            var match = str.match(ctxPattern); // returns null if not found
            if (match) {
                // only store one instance of duplicate project entries
                for (var i=0; i<match.length; i++) {
                    var c = match[i].replace(/[\s]*/g, "").replace(/[\(\{\[\)\}\]"']/g, "");;
                    tmpSet.add(c);
                }
            }
        }
        return Array.from(tmpSet);
    }
}