import  {Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Question } from "./question.model";
import  icons from "./icons";

import {QuestionService} from './question.service';

import {Router} from '@angular/router'
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-question-form',
    templateUrl:'question-form.component.html',
    styles:[
        `
        .icons-list{
            font-size:40px;            
        }
        small{
            display: block;
        }
        `
    ],
    providers:[QuestionService]
})
export class QuestionFormComponent implements OnInit{
    constructor(
        private questionService: QuestionService,
        private authService: AuthService,
        private router : Router){}

    ngOnInit(){
        if(!this.authService.isLoggedIn()){
            this.router.navigateByUrl('/signin')
        }        
    }

    icons:Object[]=icons;

    onSubmit(form:NgForm){
        const q = new Question(
            form.value.title,
            form.value.description,
            new Date(),
            form.value.icon
        );
        
        
        this.questionService.addQuestion(q)
        .subscribe(
            ({_id})=> this.router.navigate(["/question",_id]),
            err => this.authService.handleError(err)
        );

        form.resetForm();
    }

    getIconVersion(icon:any){
        let version;
        if(icon.versions.font.includes('plain-word-wordmark')){
            version='plain-wordmark';
        }else{
            version=icon.versions.font[0];
        }

        return version;
    }

}