import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  public tasks: Task[];

  constructor(public tasksService: TasksService) {
    this.tasks = [];
  }

  ngOnInit(): void {
    this.tasks = this.tasksService.list();
  }

  remove(id: number) {
    this.tasksService.remove(id);
    this.ngOnInit()
  }
}