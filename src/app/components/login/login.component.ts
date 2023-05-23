import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public id: any;
  public token: any;
  public identity: any;

  constructor(
    private usuarioService: UserService,
    private router: Router) {
  }

  formLogin = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }

  submitForm(form: any): void {
    const data = {
      correo: form.correo,
      password: form.password,
    };
    this.usuarioService.login(data).then((query: any) => {
        if (query.ok){
          console.log(query)
          this.token = query.token;
          this.id = query.data.id;
          localStorage.setItem('token', this.token);
          localStorage.setItem('id', this.id);
          this.router.navigate(['home']);
        } else{
          alert('los datos estan mal');
        }
      }
    );
  }

}
