import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskNewComponent } from './pages/task-new/task-new.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tareas', component: TasksComponent, canActivate: [AuthGuard] },
  {
    path: 'tareas/nueva',
    component: TaskNewComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];
