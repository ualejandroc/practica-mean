import {Component, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Answer } from './answer.model';
import {User} from '../auth/user.model'
import { Question } from '../question/question.model';

import {QuestionService} from '../question/question.service'


import SweetScroll from 'sweet-scroll'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

import { Location } from '@angular/common';

@Component({
    selector:'app-answer-form',
    templateUrl:'./answer-form.component.html',
    styles: [   
        `
        form{            
            margin-top: 20px; /*solo se va a pisar el top margin*/
        }
        `
    ],
    providers:[QuestionService]
})

export class  AnswerFormComponent{

    @Input() question: Question; 

    sweetScroll: SweetScroll;

    constructor(
        private questionService: QuestionService,
        private authService: AuthService,
        private router: Router ,
        private location: Location  ){
        this.sweetScroll= new SweetScroll()
    }


    onSubmit(form:NgForm){

        if(!this.authService.isLoggedIn()){
            this.router.navigateByUrl('/signin')
        }
        
        const answer= new Answer(
            form.value.description,
            this.question,
            // new Date(),
            // new User(null, null, 'Paula','Becerra'),
        );

        this.questionService.addAnswer(answer)
            .subscribe(   // debemos suscribirnos a la respuestata tanto si es exitosa o hay error
                          // esta funcion recibe 2 funcioes como paramentro
                a=>{
                    this.question.answers.unshift(a)
                    this.sweetScroll.to("#title-scroll")
                },
                err => this.authService.handleError(err)
            )
        
        form.reset();

        setTimeout(function(){ location.reload()  }, 3000)
    }

}