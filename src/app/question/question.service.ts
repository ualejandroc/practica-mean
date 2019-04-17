import {Injectable} from "@angular/core"
import { Question } from "./question.model"
import {Http, Headers, Response} from '@angular/http'
import {environment} from '../../environments/environment'
import 'rxjs/operator/toPromise' // para que funcione obsrvable


import 'rxjs/Rx'   //PARA QUE FUNCIONE .map()

import {Observable} from 'rxjs/Observable'

import urljoin from 'url-join'


import { Answer } from "../answer/answer.model";

@Injectable()
export class QuestionService{
    questionsUrl: string;
    constructor(private http:Http){
       this.questionsUrl=urljoin( environment.apiUrl, 'questions')
    }

    getQuestions(sort = '-createdAt'): Promise <void|Question[]> {
        return this.http.get(`${this.questionsUrl}?sort=${sort}`)
        .toPromise()
        .then(response=>response.json() as Question[])
        .catch(this.handleError)
    }

    getQuestion(id): Promise <void|Question>{
        const url= urljoin(this.questionsUrl, id)
        return this.http.get(url)
        .toPromise()
        .then(response=>response.json() as Question)
        .catch(this.handleError)
    }

    getToken(){
        const token =localStorage.getItem('token');
        return `?token=${token}`;
    }

    addQuestion(question:Question){

        const body= JSON.stringify(question);
        const headers = new Headers({'Content-Type':'application/json'});
        
        const token =localStorage.getItem('token');
        const url = this.questionsUrl + `?token=${token}`;

        return this.http.post(url,body,{headers})
            .map((response:Response)=>response.json())
           .catch((error:Response)=>Observable.throw(error.json()));
        
    }

    //reocrdar que la url de las answers quedaba asi
    //   /api/questions/:id/answers
    // esto se foemo en las child routes de server/question.js

    addAnswer(answer:Answer){

        const a ={
            description:answer.description,
            question:{
                _id:answer.question._id
            }
        }

        //const body= JSON.stringify(answer);
        const body= JSON.stringify(a);   //ahora el boy es mas liviano y se puede enviar facilmete al backend
        const headers = new Headers({'Content-Type':'application/json'});
        const token =localStorage.getItem('token');

        const url =urljoin(this.questionsUrl, answer.question._id, 'answer')

        return this.http.post(url+`?token=${token}`,body,{headers})
            .map((response:Response)=>response.json())
           .catch((error:Response)=>Observable.throw(error.json()));
        
    }

    handleError(error: any){
        let errMsg=error.messege? error.messenge:
        error.status? `${error.status} - ${error.statusText}`:
        'Server error'
        console.log(errMsg)
    }
}