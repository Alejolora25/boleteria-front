import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginPayload = {
      correo: this.loginData.email, // Mapear email a correo
      contraseña: this.loginData.password, // Mapear password a contraseña
    };
  
    this.authService.login(loginPayload).subscribe({
      next: (response: any) => {
        // Asumiendo que el backend devuelve un objeto con 'token'
        if (response.token) {
          localStorage.setItem('token', response.token);
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/home']); // Redirigir al home
        } else {
          alert('Error en la respuesta del servidor.');
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert('Credenciales incorrectas');
      },
      complete: () => {
        console.log('Proceso de inicio de sesión completado');
      },
    });
  }
}
