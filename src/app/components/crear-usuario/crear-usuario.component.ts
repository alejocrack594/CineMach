import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BdloginService } from '../bdlogin.service';
import { Usuario } from '../entidades/Usuario';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  
  ListaUsuarios: Usuario[] = [];
  creUsuario: FormGroup;
  submitted: boolean = false;
  showPassword = false; // Variable para controlar la visibilidad de la contraseña
  
  ngOnInit() {
    this.mostrarDatos();
  }

  mostrarDatos() {
    this.bdlogin.obtenerUsuarios().subscribe((data: Usuario[]) => {
      this.ListaUsuarios = data;
      console.log(this.ListaUsuarios);
    });
  }

  constructor(private router: Router, private fb: FormBuilder, private bdlogin: BdloginService) {
    this.creUsuario = this.fb.group({
      ced_user: ['', [Validators.required, Validators.pattern(/^\d{10}$/),  this.validarDNI.bind(this)]],
      ema_num_user: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/), this.validarCampo.bind(this)]],
      nom_com_user: ['', [Validators.required, this.validarNombre.bind(this)]],
      nom_user: ['', [Validators.required, this.validarUsername.bind(this)]],
      pass_user: ['', Validators.required]
    }); 
  }

  Mostrar() {
    this.showPassword = !this.showPassword;
  }

  // Define la función de validación personalizada
  validarDNI(control: AbstractControl): ValidationErrors | null {
    const nuevoDNI = control.value;

    // Verifica si el dniExistente ya existe en la lista de Usuarios
    const dniExistente = this.ListaUsuarios.some(u => u.ced_user === nuevoDNI);

    // Si el dniExistente no existe, retorna validación
    if (!dniExistente) {
      return null;
    }

    return { dniDuplicado: true }; // El dni no es válido
  }
  
  // Define la función de validación personalizada
  validarNombre(control: AbstractControl): ValidationErrors | null {
    const nuevoNombre = control.value;

    // Verifica si el nameExistente ya existe en la lista de Usuarios
    const nameExistente = this.ListaUsuarios.some(u => u.nom_com_user === nuevoNombre);

    // Si el nameExistente no existe, retorna validación
    if (!nameExistente) {
      return null;
    }

    return { nameDuplicado: true }; // El nombre no es válido
  }

  // Define la función de validación personalizada
  validarUsername(control: AbstractControl): ValidationErrors | null {
    const nuevoUsername = control.value;

    // Verifica si el username ya existe en la lista de Usuarios
    const usernameExistente = this.ListaUsuarios.some(u => u.nom_user === nuevoUsername);

    // Si el username ya existe, retorna validación
    if (!usernameExistente) {
      return null;
    }

    return { usernameDuplicado: true }; // El username no es válido
  }

  // Define la función de validación personalizada
  validarCampo(control: AbstractControl): ValidationErrors | null {
    const nuevoCampo = control.value;

    // Verifica si el campoExistente ya existe en la lista de Usuarios
    const campoExistente = this.ListaUsuarios.some(u => u.ema_num_user === nuevoCampo);

    // Si el campoExistente no existe, retorna validación
    if (!campoExistente) {
      return null;
    }

    return { campoDuplicado: true }; // El campo no es válido
  }

  insertUsuario()
  {

    this.submitted = true;
    if(this.creUsuario.invalid) { return ; }

    const nuevoUsuario: Usuario = this.creUsuario.value;
    
    this.bdlogin.insertarUsuario(nuevoUsuario)
    .subscribe((data) => {
      alert('Se ha creado correctamente!');
      console.log('Usuario insertado', data);
    });

    this.creUsuario.reset({
      ced_user: '',
      ema_num_user: '',
      nom_com_user: '',
      nom_user: '',
      pass_user: ''
    });
    this.submitted = false;   
  }  
}