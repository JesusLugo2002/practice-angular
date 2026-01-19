import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { TasksApiService } from '../../services/tasks-api.service';

@Component({
  selector: 'app-task-new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-new.component.html',
  styleUrl: './task-new.component.css',
})
export class TaskNewComponent {
  private fb = inject(FormBuilder);
  private tasks = inject(TasksApiService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    description: this.fb.nonNullable.control(''),
    completed: this.fb.nonNullable.control(false),
  });

  save() {
    if (this.form.invalid) {
      console.warn('form inválido', this.form.errors, this.form.value);
      this.form.markAllAsTouched();
      return;
    }
    const task = this.form.getRawValue();
    this.tasks.create(task).subscribe({
      next: created => console.log("Task created with id: " + created.id),
      error: err => console.error("Something wrong happend creating new task... ", err)
    });
    this.router.navigateByUrl('/tareas');
  }

  cancel() {
    this.router.navigateByUrl('/tareas');
  }
}