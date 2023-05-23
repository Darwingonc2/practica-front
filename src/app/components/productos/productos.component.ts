import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{

  public productos: any;

  constructor(private usuarioService: UserService) {
  }

  ngOnInit(): void {
    this.encontrarProductos();
  }

  async encontrarProductos() {
    this.usuarioService.encontrar_productos().then((query: any) => {
      if (query.ok){
        this.productos = query.data;
        console.log(this.productos);
      } else{
        alert('ocurrio un error');
      }
    });
  }

}
