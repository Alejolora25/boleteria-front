import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'boleteria-app';
  menuOpen = false;
  showMenu = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Escucha los cambios en la ruta para ocultar/mostrar el menú
    this.router.events.subscribe(() => {
      this.showMenu = this.router.url !== '/login';
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    const menu = document.querySelector('.navbar-collapse');
    if (menu?.classList.contains('show')) {
      menu.classList.remove('show'); // Cierra el menú
    }
    this.menuOpen = false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
