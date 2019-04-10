import { Component } from "@angular/core";
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
      imports: [ ],
      providers: [],
      bootstrap: []
})

@Component({
    selector: 'app-question-screen',   // este es el selector que va  a tener el componente dentro de los archivos html
                                        //el inici app-  ... idica que es un coponente nuestro de a aplicacion
    templateUrl: './question-screen.component.html',
    styles:[  
        `       
        .add-question{
            position:fixed;
            bottom:30px;
            right:30px;
            font-size: 24 px;
        }
        `
    ],

})

export class QuestionScreenComponent  {
   
   
}