import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';
import { TasksApiService } from '../../services/tasks-api.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  public tasks: Task[];

  constructor(public tasksService: TasksApiService) {
    this.tasks = [];
  }

  ngOnInit(): void {
    this.tasksService.list().subscribe({
      next: tasks => this.tasks = tasks
    });
  }

  remove(id: number) {
    this.tasksService.remove(id);
    this.ngOnInit()
  }
}