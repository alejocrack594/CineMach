import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BdloginService } from '../bdlogin.service';
import { Router } from '@angular/router';
import { Usuario } from '../entidades/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  ListaUsuarios: Usuario[] = [];
  creLogin: FormGroup;
  submitted: boolean = false;
  showPassword = false; // Variable para controlar la visibilidad de la contraseña
  
  ngOnInit() {
    this.mostrarDatos();
  }

  mostrarDatos() {
    this.bdlog.obtenerUsuarios().subscribe((data: Usuario[]) => {
      this.ListaUsuarios = data;
    });
  }

  constructor(private router: Router, private bdlog: BdloginService, private fb: FormBuilder) {
    this.creLogin = this.fb.group({
      ema_num_user: ['', Validators.required],
      pass_user: ['', Validators.required]
    });
  }

  emailUnicoValidator(control: AbstractControl): ValidationErrors | null {
    const nuevoCodigo = control.value;
    // Verifica si el email ya existe en la lista de correos existentes
    const codigoExistente = this.ListaUsuarios.some(l => l.ema_num_user === nuevoCodigo);;
    // Si el código no existe, retorna un error de validación
    if (!codigoExistente) {
      return { codigoDuplicado: true };
    }
    return null; // El correo existe
  }

  passwordUnicoValidator(control: AbstractControl): ValidationErrors | null {
    const nuevoCodigo = control.value;
    // Verifica si el email ya existe en la lista de correos existentes
    const codigoExistente = this.ListaUsuarios.some(l => l.pass_user === nuevoCodigo);;
    // Si el código no existe, retorna un error de validación
    if (!codigoExistente) {
      return { codigoDuplicado: true };
    }
    return null; // La clave existe
  }

  checkCredentials() {
    this.submitted = true;
    if(this.creLogin.invalid) { return ; }
    const { ema_num_user, pass_user} = this.creLogin.value;
    this.bdlog.iniciarSesion(ema_num_user, pass_user).subscribe(
      (response: any) => {
        if(response.success) {
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/homepage']);
          this.creLogin.reset({
            ema_num_user: '',
            pass_user: ''
          });
        } else {
          alert('Inicio de sesión fallido');
          console.log('Inicio de sesión fallido', response);
        }
      }
    );
    this.submitted = false;
  }

  Mostrar() {
    this.showPassword = !this.showPassword;
  }
}