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
/**
 * Utility methods used by the project library
 * @namespace
 */
export declare module TodoTxtUtils {
    /**
     * function will format a Date object to a string of YYYY-MM-DD
     * @returns {string} formatted date
     */
    function formatDate(dateObj: Date): string;
    /**
     * function will get the current browser language-locale
     * @returns {string} a ISO language-locale for the browser
     */
    function getLanguage(): string;
    /**
     * function generates a GUID
     * @returns {string} a GUID (NNNNNNNN-NNNN-NNNN-NNNN-NNNNNNNNNNNN)
     */
    function guid(): string;
    /**
     * function will strip out any characters from the passed in string that are
     * not compatible with html and replace with html-friendly versions
     * @param {string} str - the string to be html encoded
     * @returns {string} a html encoded version of the string that can be used safely
     * within a html page
     */
    function htmlEncode(str: string): string;
    /**
     * function will strip out any characters from the passed in string that are
     * html character entities and replace with standard string versions
     * @param {string} str - the string to be html unencoded
     * @returns {string} a version of the string that can contains non-html-friendly
     * strings
     */
    function htmlUnencode(str: string): string;
}
