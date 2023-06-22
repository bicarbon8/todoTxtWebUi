import { DomSanitizer } from '@angular/platform-browser';
import { TodoTxtWebUiComponent } from '../src/app/todo-txt-web-ui/todo-txt-web-ui.component';
import { ChangeDetectorRef } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';
import { TodoTxtVault } from 'src/app/todo-txt-web-ui/storage/todo-txt-vault';

const pri: string = '(A)';
const proj: string = '+todo'
const ctx: string = '@task';
const todotxt: string = `${pri} sample ${proj} ${ctx}`;

describe('TodoTxtWebUiComponent', () => {
  beforeEach(() => {
    TodoTxtVault.removeAllTasks();
  })

  it('can be mounted', () => {
    cy.mount('<app-todo-txt-web-ui></app-todo-txt-web-ui>', {
      declarations: [TodoTxtWebUiComponent],
    });
  })

  it('will display 3 cards for priorities contexts and projects', () => {
    cy.mount(TodoTxtWebUiComponent);
    cy.get('.card').should('contain', 'Priorities')
      .should('contain', 'Projects')
      .should('contain', 'Contexts');
  })

  it('can add a new Todo', () => {
    cy.mount(TodoTxtWebUiComponent);

    cy.get('#addtask_button').click();
    cy.get('[id^=textarea]').type(todotxt).type('{enter}');
    
    cy.get('button.text-start.w-100').contains(todotxt);

    cy.get('button[title^="Filter by priority"]').contains(pri);
    cy.get('button[title^="Filter by project"]').contains(proj);
    cy.get('button[title^="Filter by context"]').contains(ctx);
  })

  it('can mark a Todo as complete', () => {
    cy.mount(TodoTxtWebUiComponent);

    cy.get('#addtask_button').click();
    cy.get('[id^=textarea]').type(todotxt).type('{enter}');
    cy.get('button[aria-label="mark as complete"]').click();

    cy.get('button.text-start.w-100').should('not.exist');
    cy.get('button[title^="Filter by priority"]').should('not.exist');
    cy.get('button[title^="Filter by project"]').should('not.exist');
    cy.get('button[title^="Filter by context"]').should('not.exist');
  })

  it('can show completed Todo', () => {
    cy.mount(TodoTxtWebUiComponent);

    cy.get('#addtask_button').click();
    cy.get('[id^=textarea]').type(todotxt).type('{enter}');
    cy.get('button[aria-label="mark as complete"]').click();

    cy.get('#flexSwitchCheckDefault').click();

    cy.get('button.text-start.w-100').contains(todotxt.replace(`${pri} `, '')).should('be.visible');
    cy.get('button[aria-label="mark as incomplete"]').should('be.visible');
    cy.get('button[title^="Filter by priority"]').should('not.exist');
    cy.get('button[title^="Filter by project"]').contains(proj);
    cy.get('button[title^="Filter by context"]').contains(ctx);
  })

  it('can filter a list of tasks by keyword', () => {
    cy.mount(TodoTxtWebUiComponent);

    const paragraph: string = new LoremIpsum({
      sentencesPerParagraph: {
        max: 5,
        min: 5
      }, wordsPerSentence: {
        max: 10,
        min: 5
      }
    }).generateSentences();
    const tasks: string[] = paragraph.split('. ');
    const words: string[] = tasks[randInt(0, tasks.length)].split(' ');
    const filter: string = words[randInt(0, words.length)];
    let tasksContainingFilter: number = 0;
    for (var i=0; i<tasks.length; i++) {
      let task: string = tasks[i];
      cy.get('#addtask_button')
        .click()
        .get('[id^=textarea]')
        .type(task)
        .type('{enter}');
      if (task.toUpperCase().includes(filter.toUpperCase())) { tasksContainingFilter++; }
    }

    // verify the list contains all 5 tasks
    cy.get('button.text-start.w-100').should('have.length', 5);

    // enter filter text and verify list is filtered
    cy.get('input[aria-label="task filter"]').type(filter.toUpperCase());
    cy.get('button.text-start.w-100').should('have.length', tasksContainingFilter);

    // clear filter and verify all 5 tasks displayed
    cy.get('button[title="Clear filter"]').click();
    cy.get('button.text-start.w-100').should('have.length', 5);
  })

  it('can filter a list of tasks by priority', () => {
    cy.mount(TodoTxtWebUiComponent);

    const paragraph: string = new LoremIpsum({
      sentencesPerParagraph: {
        max: 5,
        min: 5
      }, wordsPerSentence: {
        max: 10,
        min: 5
      }
    }).generateSentences();
    const tasks: string[] = paragraph.split('. ');
    const priorities: string[] = ['(A)', '(B)', '(C)', '(D)', '(E)'];
    const filter: string = priorities[randInt(0, priorities.length)];
    let tasksContainingFilter: number = 0;
    for (var i=0; i<tasks.length; i++) {
      let task: string = tasks[i];
      let pri: string = priorities[i];
      cy.get('#addtask_button')
        .click()
        .get('[id^=textarea]')
        .type(`${pri} ${task}`)
        .type('{enter}');
      if (pri == filter) { tasksContainingFilter++; }
    }

    cy.get('button.text-start.w-100').should('have.length', 5);

    cy.get(`button[title^="Filter by priority: ${filter}"]`).first().click();

    cy.get('button.text-start.w-100').should('have.length', tasksContainingFilter);
  })

  it('can filter a list of tasks by project', () => {
    cy.mount(TodoTxtWebUiComponent);

    const paragraph: string = new LoremIpsum({
      sentencesPerParagraph: {
        max: 5,
        min: 5
      }, wordsPerSentence: {
        max: 10,
        min: 5
      }
    }).generateSentences();
    const tasks: string[] = paragraph.split('. ');
    const words: string[] = tasks[randInt(0, tasks.length)].split(' ');
    const filter: string = words[randInt(0, words.length)];
    let tasksContainingFilter: number = 0;
    for (var i=0; i<tasks.length; i++) {
      let task: string = tasks[i];
      task = task.replace(filter, `+${filter}`);
      cy.get('#addtask_button')
        .click()
        .get('[id^=textarea]')
        .type(task)
        .type('{enter}');
      if (task.includes(`+${filter}`)) { tasksContainingFilter++; }
    }

    cy.get('button.text-start.w-100').should('have.length', 5);

    cy.get(`button[title^="Filter by project: +${filter}"]`).first().click();

    cy.get('button.text-start.w-100').should('have.length', tasksContainingFilter);
  })

  it('can filter a list of tasks by context', () => {
    cy.mount(TodoTxtWebUiComponent);

    const paragraph: string = new LoremIpsum({
      sentencesPerParagraph: {
        max: 5,
        min: 5
      }, wordsPerSentence: {
        max: 10,
        min: 5
      }
    }).generateSentences();
    const tasks: string[] = paragraph.split('. ');
    const words: string[] = tasks[randInt(0, tasks.length)].split(' ');
    const filter: string = words[randInt(0, words.length)];
    let tasksContainingFilter: number = 0;
    for (var i=0; i<tasks.length; i++) {
      let task: string = tasks[i];
      task = task.replace(filter, `@${filter}`);
      cy.get('#addtask_button')
        .click()
        .get('[id^=textarea]')
        .type(task)
        .type('{enter}');
      if (task.includes(`@${filter}`)) { tasksContainingFilter++; }
    }

    cy.get('button.text-start.w-100').should('have.length', 5);

    cy.get(`button[title^="Filter by context: @${filter}"]`).first().click();

    cy.get('button.text-start.w-100').should('have.length', tasksContainingFilter);
  })
})

const randInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min);