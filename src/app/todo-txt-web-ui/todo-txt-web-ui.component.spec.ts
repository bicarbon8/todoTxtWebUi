import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoTxtVault } from './storage/todo-txt-vault';

import { TodoTxtWebUiComponent } from './todo-txt-web-ui.component';

describe('TodoTxtWebUiComponent', () => {
  let component: TodoTxtWebUiComponent;
  let fixture: ComponentFixture<TodoTxtWebUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoTxtWebUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTxtWebUiComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
    TodoTxtVault.removeAllTasks();
  });

  it('should create and instance successfully', () => {
    expect(component).toBeDefined();
  });
});
