import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from '../../../src/environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public id: any;
  public token: any;
  public url: string;
  constructor(private  httpClient: HttpClient) {
    this.url = environment.apiUrl;
  }

  async login(data: any) {
    const query = this.httpClient.post(this.url + '/login', data).toPromise() ;
    return query;
  }

  public getTokenFromLocalStorage(): any {
    const token = localStorage.getItem('token');

    if (token != null) {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

  async encontrar_productos() {
    const query = this.httpClient.get(this.url + '/encontrar_productos').toPromise();
    return query;
  }
  public crear_productos(token: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.httpClient.post(this.url + '/crear_productos', data, {headers});
  }

  public actualizar_productos(token: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.httpClient.patch(this.url + '/actualizar_productos', data, {headers});
  }

  public eliminar_productos(token: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    // @ts-ignore
    return this.httpClient.post(this.url + '/eliminar_productos', data, {headers});
  }


}
