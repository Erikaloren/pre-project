import { NgxPaginationModule } from 'ngx-pagination';
import { Component, NgModule, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { AdminService } from '../../services/admin.service';
 

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})

export class ShopComponent implements OnInit {
  books: any[] = [];
  p: number = 1;
  nombre: string = '';

  constructor(
    private loginService: LoginService,
    private adminService: AdminService // Inyecta el servicio de administración
  ) {}

  ngOnInit() {
    this.fetchBooks(); // Obtener libros al inicializar el componente

    const token: any = localStorage.getItem('token');
    if (token) {
      this.loginService.validateToken(token).subscribe((response: any) => {
        if (response.resultado === 'bien') {
          this.nombre = response.datos.name;
        } else {
          this.loginService.logout();
        }
      });
    } else {
      this.loginService.logout();
    }
  }

  fetchBooks() {
    this.adminService.getBooks().subscribe({
      next: (response: any) => {
        if (response.resultado === 'successful' && response.datos) {
          this.books = response.datos;
        } else {
          console.error('Error fetching books:', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching books:', error);
      }
    });
  }
}
