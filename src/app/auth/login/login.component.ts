import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  username = new FormControl<string>('');
  password = new FormControl<string>('');
  error = new FormControl<string | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

  validate() {
    this.error.setValue(null);

    if (this.username.value == null) {
      this.error.setValue('No username provided!');
      return;
    }

    if (this.password.value == null) {
      this.error.setValue('Password required!');
      return;
    }

    this.auth.login(this.username.value, this.password.value).subscribe({
      next: () => this.router.navigate(['/tareas']),
      error: () => this.error.setValue('Credenciales inválidas'),
    });
  }
}
