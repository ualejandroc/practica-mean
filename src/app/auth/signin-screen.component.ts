import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './user.model';
import {AuthService}  from './auth.service';

@Component({
    selector:'app-signin-screen',
    templateUrl:'./signin-screen.component.html',
})
export class SigninScreenComponent implements OnInit{
    constructor(private authService: AuthService ){}

  signinForm: FormGroup;  


  ngOnInit(){
    this.signinForm= new FormGroup({
        email: new FormControl(null,[
            Validators.required,
            Validators.pattern("/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/")
        ]),

        password: new FormControl(null,
        Validators.required)
       
    })
  }

  onSubmit(){
    if(this.signinForm.valid){
        const {email, password}= this.signinForm.value;
        const user = new User (email, password,null,null );
        this.authService.singin(user)
            .subscribe(
                                // si esta bien el sigin entonces ejecutamos login de auth service
                                // para elmacenar el token en local storage
                this.authService.login,
                err => this.authService.handleError(err)
            )
    }
  }

}