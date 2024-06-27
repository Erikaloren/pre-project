import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-create-account',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.css'],
  })
export class CreateAccountComponent {
  registrationSuccess = false;
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrservice: ToastrService,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      if (formData.confirmPassword !== formData.password) {
        this.toastrservice.error('Las contraseñas no coinciden.');
        return;
      }

      this.userService.createUser(formData).subscribe(
        (response) => {
          if (response.resultado === 'bien') {
            this.registrationSuccess = true;
            this.toastrservice.success('¡Usuario creado exitosamente!');
            this.router.navigate(['/login']);
          } else {
            console.error('Error creating user:', response.mensaje);
            this.toastrservice.error('Hubo un error. Asegúrate de que la contraseña cumpla con las condiciones');
          }
        },
        (error) => {
          console.error('Error:', error);
          this.toastrservice.error('Hubo un error al comunicarse con el servidor.');
        }
      );
    } else {
      this.toastrservice.error('Por favor, complete todos los campos correctamente.');
    }
  }
}


  

