import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  authenticationForm = new FormGroup({
    username: new FormControl<string>(""),
    password: new FormControl<string>("")
  })
  error: string|null = null;

  constructor(private auth: AuthService, private router: Router) {}

  validate() {
    const credentials = this.authenticationForm.getRawValue();
    this.error = null;

    if (credentials.username == null || credentials.username == "") {
      this.error = 'No username provided!';
      return;
    }

    if (credentials.password == null ||credentials.password == "") {
      this.error = 'Password required!';
      return;
    }

    this.auth.login(credentials.username, credentials.password).subscribe({
      next: () => this.router.navigate(['/tareas']),
      error: () => this.error = 'Credenciales inválidas',
    });
  }
}
