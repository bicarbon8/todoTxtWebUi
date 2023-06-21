import { DomSanitizer } from '@angular/platform-browser';
import { TodoTxtWebUiComponent } from '../src/app/todo-txt-web-ui/todo-txt-web-ui.component';
import { ChangeDetectorRef, HostListener } from '@angular/core';

describe('TodoTxtWebUiComponent', () => {
  it('can be mounted', () => {
    cy.mount('<app-todo-txt-web-ui></app-todo-txt-web-ui>', {
      declarations: [TodoTxtWebUiComponent],
      providers: [DomSanitizer, ChangeDetectorRef]
    });
  })

  it('will display 3 cards for priorities contexts and projects', () => {
    cy.mount(TodoTxtWebUiComponent, {
      providers: [DomSanitizer, ChangeDetectorRef]
    });
    cy.get('.card').should('contain', 'Priorities');
  })
})