import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  loginService = inject(LoginService);

  nombre: string = '';
  ngOnInit() {
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
}
