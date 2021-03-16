import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css']
})
export class TaskFilterComponent {
  filterStr: string;

  async change_UpdateFilter(event: any): Promise<void> {
    this.filterStr = event.target.value;
  }

  async click_ClearFilter(event: any): Promise<void> {
    this.filterStr = null;
    event.target.value = undefined;
  }
}
