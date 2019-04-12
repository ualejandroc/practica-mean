import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';

@Component({
    selector:'app-signup-screen',
    templateUrl:'./signup-screen.component.html',
})
export class SignupScreenComponent implements OnInit{
    constructor( private authService : AuthService){}

   signinForm: FormGroup;  

  ngOnInit(){
    this.signinForm= new FormGroup({
        email: new FormControl(null,[
            Validators.required,
            Validators.email
            // Validators.pattern("/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/")
        ]),

        password: new FormControl(null,
        Validators.required),

        firstName: new FormControl(null,
            Validators.required),
        lastName: new FormControl(null,
                Validators.required)
    })
  }

  onSubmit(){
    if(this.signinForm.valid){
        const {firstName, lastName, email, password}= this.signinForm.value;
        const user = new User (email, password,firstName,lastName );
        
        this.authService.signup(user)
            .subscribe(
                this.authService.login,
                err => this.authService.handleError(err)
            )
        
        this.signinForm.reset();
    }
    
  }

}