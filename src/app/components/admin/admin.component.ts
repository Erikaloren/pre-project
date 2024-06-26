import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  toastrService = inject(ToastrService);
  loginService = inject(LoginService);
  adminService = inject(AdminService);

  name: string = ''; // To greet the user

  Title: string = '';
  Author: string = '';
  Price: number = 0;
  Currency: string = '';
  Available: boolean = false;
  Items: number = 0;
  Picture: File | null = null;

  books: any[] = [];

  ngOnInit() {
    const token: any = localStorage.getItem('token');
    if (token) {
      this.loginService.validateToken(token).subscribe({
        next: (response: any) => {
          if (response.resultado === 'bien') {
            this.name = response.datos.name;
            this.toastrService.success(`Hello, ${this.name}!`);
            this.fetchBooks();
          } else {
            this.loginService.logout();
          }
        },
        error: (error: any) => {
          console.error('Error validating token:', error);
          this.loginService.logout();
        }
      });
    } else {
      this.loginService.logout();
    }
  }

  inputFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.Picture = event.target.files[0];
    }
  }

  handleSubmit() {
    if (this.Picture) {
      this.adminService.createBook(this.Title, this.Author, this.Price, this.Currency, this.Available, this.Items, this.Picture)
        .subscribe({
          next: (response: any) => {
            if (response.success) {
              this.toastrService.success(response.message);
              this.fetchBooks();
            } else {
              this.toastrService.error(response.message || 'An error occurred while creating the book');
            }
          },
          error: (error: any) => {
            console.error('Error occurred while creating the book:', error);
            this.toastrService.error('An error occurred while creating the book');
          }
        });
    } else {
      this.toastrService.warning('All fields are required');
    }
  }

  fetchBooks() {
    this.adminService.getBooks().subscribe({
      next: (response: any) => {
        console.log("response: ", response)
        if (response.resultado === 'successful' && response.datos) {
          this.books = response.datos;
        } else {
          this.toastrService.error('An error occurred while fetching books');
          console.error('Error in response:', response);
        }
      },
      error: (error: any) => {
        console.error('Error occurred while fetching books:', error);
        this.toastrService.error('An error occurred while fetching books');
      }
    });
  }

  handleInfo() {
    console.log('...handleInfo...');
  }

  handleUpdate() {
    console.log('...handleUpdate...');
  }

  handleDelete(id: string) {
    this.adminService.deleteBook(id).subscribe({
      next: (res: any) => {
        console.log('respuesta:', res)
        if (res.resultado === 'successful') {
          this.toastrService.success(res.mensaje);
          this.fetchBooks(); // Update books after successful deletion
        } else {
          this.toastrService.error('An error occurred while deleting the book');
        }
      },
      error: (error: any) => {
        console.error('Error occurred while deleting the book:', error);
        this.toastrService.error('An error occurred while deleting the book');
      }
    });
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
}





