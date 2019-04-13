import {Component, OnInit} from '@angular/core';

import {Question} from './question.model'

import {QuestionService} from './question.service'

import {ActivatedRoute} from '@angular/router'

import {OnDestroy} from '@angular/core'

@Component({
    selector: 'app-question-detail',   // este es el selector que va  a tener el componente dentro de los archivos html
                                        //el inici app-  ... idica que es un coponente nuestro de a aplicacion
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css'],
    providers:[QuestionService]
})

export class QuestionDetailComponent implements OnInit , OnDestroy{

    

    constructor(
        private questionService: QuestionService,
        private route:ActivatedRoute
    ){

    }

    // question:Question= new Question(
    //     'Esta es una nueva pregunta sobre android',
    //     'Miren, tengo una duda ',
    //      new Date,
    //      'dev-icon-andreoid-plain'  //clase para icono de android
    // );

    question?: Question;
    loading:boolean;

    sub: any;

     ngOnInit(){
         this.sub=  this.route.params.subscribe(  params=>  {
             this.questionService
            .getQuestion(params.id)
            .then((question:Question)=>{
                this.question=question;
                console.log(this.question);
                this.loading=false;
            })
            
        })  
       
   }

   ngOnDestroy(){
    this.sub.unsuscribe();
     }

}