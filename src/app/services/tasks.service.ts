import { inject, Injectable } from '@angular/core';
import { NewTask, Task } from '../models/task.model';
import { TasksApiService } from './tasks-api.service';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  list(): Task[] {
    return this.tasks;
  }

  add(data: NewTask): Task {
    const created: Task = { id: this.nextId++, ...data };
    this.tasks = [created, ...this.tasks];
    return created;
  }

  remove(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}