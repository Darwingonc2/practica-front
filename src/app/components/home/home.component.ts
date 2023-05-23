import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public productos: any;
  public token: any;
  public id: any;

  formProductos= new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    expiracion: new FormControl('', Validators.required),
    notas: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    activo: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
  });
  constructor(private usuarioService: UserService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.token = this.usuarioService.getTokenFromLocalStorage();
    this.encontrarProductos();
  }

  async encontrarProductos() {
    this.usuarioService.encontrar_productos().then((query: any) => {
      if (query.ok){
        this.productos = query.data;
      } else{
        alert('ocurrio un error');
      }
    });
  }

  async eliminarProducto(form: any){
    if (confirm('Seguro que desea eliminar el producto')){
      const data = {
        id: form,
      };
      this.usuarioService.eliminar_productos(this.token, data).subscribe(
        res => {
          this.encontrarProductos();
        }, error => {
          alert('token no valido');
        });
    }
  }

  async crearProducto(form: any) {
    console.log("se activó")
    const data = {
      nombre: form.nombre,
      precio: form.precio,
      expiracion: form.expiracion,
      notas: form.notas,
      stock: form.stock,
      activo: form.activo,
      img: form.img
    };
    this.usuarioService.crear_productos(this.token, data).subscribe(
      res => {
        //this.productos.push(res.data);
        this.showModal = false;
        this.encontrarProductos();
      }, error => {
        alert('token no valido');
      });
  }

  async actualizarProductos(form:any) {
    const data = {
      id: form.id,
      nombre: form.nombre,
      precio: form.precio,
      expiracion: form.expiracion,
      notas: form.notas,
      stock: form.stock,
      activo: form.activo,
      img: form.img
    };
    this.usuarioService.actualizar_productos(this.token, data).subscribe(
      res => {
        this.alertaProductoActualizado = true;
        /*alert("Se actualizó el producto");*/
        this.encontrarProductos();
      }, error => {
        this.alertaProductoNoActuaizado = true;
      });
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  showModal = false;
  editar = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }

/*alertas de productos*/

  alertaProductoActualizado = false;
  ocultarAlerta1() {
    this.alertaProductoActualizado = false;
  }

  alertaProductoNoActuaizado = false
  ocultarAlerta2() {
    this.alertaProductoNoActuaizado = false;
  }


}
