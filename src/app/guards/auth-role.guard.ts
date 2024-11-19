import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']); // Redirige al login si no hay token
    return false;
  }

  try {
    // Decodificar el token
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token mal formado');
    }

    const base64Payload = parts[1];
    const payload = JSON.parse(atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/')));

    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

    // Verificar si el token ha expirado
    if (payload.exp < currentTime) {
      console.warn('Token expirado');
      localStorage.removeItem('token'); // Eliminar token expirado
      router.navigate(['/login']);
      return false;
    }

    // Validar roles requeridos
    const requiredRoles = route.data?.['roles'] || [];
    const userRoles = payload.roles ? payload.roles.split(',') : [];

    const hasAccess = requiredRoles.some((role: string) => userRoles.includes(role));

    if (!hasAccess) {
      router.navigate(['/home']); // Redirigir si no tiene los roles necesarios
      return false;
    }

    return true; // Permitir acceso
  } catch (e) {
    console.error('Error al procesar el token:', e);
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }
};
