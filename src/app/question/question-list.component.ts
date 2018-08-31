import {Component, Input} from '@angular/core';

import {Question} from './question.model'

import {QuestionService} from './question.service';

import {OnInit} from "@angular/core";


// const q = new Question(
//     'Como reutilizo componente en android?',
//     'Miren mi pregunta',
//     new Date(),
//     'none'
// );



@Component({
    selector: 'app-question-list',   // este es el selector que va  a tener el componente dentro de los archivos html
                                        //el inici app-  ... idica que es un coponente nuestro de a aplicacion
    templateUrl: './question-list.component.html',
    styles:[
        `
        .icon-question{
            font-size: 36px;
        }
        .add-question{
            position:fixed;
            bottom:30px;
            right:30px;
            font-size: 24 px;
        }
        `
    ],
    providers:[QuestionService]
})

export class QuestionListComponent implements OnInit{
    constructor(private questionService: QuestionService){}

    @Input() sort = '-CreatedAt';   //El signo menos significa orden descendente

    questions: Question[];

    loading: boolean;

    ngOnInit(){
        this.loading=true;
        this.questionService
        .getQuestions(this.sort)
        .then((questions:Question[]) =>{
            this.questions=questions;
            this.loading=false;
        })
    }
   
}