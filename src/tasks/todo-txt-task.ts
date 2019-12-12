/**********************************************************************
 * This javascript was created according to the specifications at
 * http://todotxt.com/ and is intended to allow users to access their
 * todo.txt files in a user-friendly and easy to visualize manner.
 *
 * Once initially uploaded, the todo.txt file will
 * be loaded into an HTML5 localStorage and managed from there.
 * The web page then allows downloading changes back to the user
 * in a txt format compliant with the todo.txt specifications, but
 * having re-sorted the tasks.
 * 
 * @Created: 08/14/2012
 * @Author: Jason Holt Smith (bicarbon8@gmail.com)
 * @Version: 0.0.1
 * Copyright (c) 2012 Jason Holt Smith. todoTxtWebUi is distributed under
 * the terms of the GNU General Public License.
 * 
 * This file is part of todoTxtWebUi.
 * 
 * todoTxtWebUi is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * todoTxtWebUi is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with todoTxtWebUi.  If not, see <http://www.gnu.org/licenses/>.
 **********************************************************************/
import { TodoTxtUtils } from "../helpers/todo-txt-utils";

export class TodoTxtTask {
    id: string;
    priority: string;
    createdDate: string;
    completedDate: string;
    projects: string[] = [];
    contexts: string[] = [];
    metadatas: string[] = [];
    isActive: boolean;
    text: string;

    constructor(text?: string) {
        this.id = TodoTxtUtils.guid();
        this.isActive = true;
        this.parseInput(text);
    }

    parseInput(input: string): void {
        if (input) {
            this.text = input;
            this.parseStatus();
            this.parsePriority();
            this.parseCompletedDate();
            this.parseCreatedDate();
            this.parseProjects();
            this.parseContexts();
        }
    }

    private parseStatus(): void {
        // check for strings starting with something like "x "
        let match: RegExpMatchArray = this.text.match(/^(x )/);
        if (match && match.length > 0) {
            this.isActive = false;
        } else {
            this.isActive = true;
        }
    }

    private parsePriority(): void {
        let pri: string = null; // used to hold the priority if set
        
        // parse out the priority RegEx: /\^([A-Z]\).*/ 
        // check for strings starting with something like "(A) "
        let priPattern: RegExp = /^(\([A-Z]\)[\s]+)/;
        var match = this.text.match(priPattern); // returns null if not found
        if (match) {
            // found an active match so get the priority
            pri = match[0].replace(/[\s]*/g, "");
        }
        
        this.priority = pri;
    }

    private parseCompletedDate(): void {
        var completed = null;
        
        // parse out the completedDate if closed (starts with "x ")
        if (!this.isActive) {
            let dates: string[] = this.getDatesFromText();
            if (dates) {
                completed = dates[0] ? dates[0].replace(/[\s]*/g, "") : null;
            }
        }
        
        this.completedDate = completed;
    }

    private parseCreatedDate(): void {
        var created = null;
        // parse out the createdDate (will be 2nd if item is closed)
        let dates: string[] = this.getDatesFromText();
        if (dates) {
            if (!this.isActive) {
                if (dates.length > 1) { // we have created and completed
                    created = dates[1] ? dates[1].replace(/[\s]*/g, "") : null;
                }
            } else {
                created = dates[0] ? dates[0].replace(/[\s]*/g, "") : null;
            }
        }
        
        this.createdDate = created;
    }

    private getDatesFromText(): string[] {
        var dates: string[] = [];
        
        // check for strings with something like "2012-08-09"
        let datePattern: RegExp = /(?:\s|^)(\d{4}-\d{2}-\d{2})(?=\s)/g;
        let match: RegExpMatchArray = this.text.match(datePattern); // returns null if not found
        if (match) {
            for (var i=0; i<match.length; i++) {
                dates.push(match[i]);
            }
        }
        
        return dates;
    }

    private parseProjects(): void {
        var tmpSet: Set<string> = new Set<string>(); // used to hold the project if set
        
        // parse out the projects RegEx: /\+[0-9A-Za-z]+\s/ (words starting with "+")
        // check for strings like "+ABC123"
        var projPattern = /((\s|^)[\(\{\["']?\+[0-9A-Za-z]+[\)\}\]"']?(?=\s|$))/g;
        var match = this.text.match(projPattern); // returns null if not found
        if (match) {
            // only store one instance of duplicate project entries
            for (var i=0; i<match.length; i++) {
                var p = match[i].replace(/[\s]*/g, "").replace(/[\(\{\[\)\}\]"']/g, "");;
                tmpSet.add(p);
            }
        }
        
        this.projects = Array.from(tmpSet);
    }

    private parseContexts(): void {
        var tmpSet: Set<string> = new Set<string>(); // used to hold the context if set
    
        // parse out the contexts RegEx: /\@[0-9A-Za-z]+\s/ (words starting with "+")
        // check for strings like "@ABC123"
        var ctxPattern = /((\s|^)[\(\{\["']?\@[0-9A-Za-z]+[\)\}\]"']?(?=\s|$))/g;
        var match = this.text.match(ctxPattern); // returns null if not found
        if (match) {
            // only store one instance of duplicate project entries
            for (var i=0; i<match.length; i++) {
                var c = match[i].replace(/[\s]*/g, "").replace(/[\(\{\[\)\}\]"']/g, "");;
                tmpSet.add(c);
            }
        }
    
        this.contexts = Array.from(tmpSet);
    }
}