import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpModule} from '@angular/http'

import { AppComponent } from './app.component';

//material angular
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//clase creada para anadir componentes
import { MaterialModule } from './material.module';

//hammer js para mobiles
import 'hammerjs';

//component2-moment
import { MomentModule } from 'ngx-moment';

//componentes propios
import { QuestionDetailComponent } from './question/question-detail.component';

import {AnswerFormComponent } from './answer/answer-form.component';

import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';


import {SigninScreenComponent} from './auth/signin-screen.component';
import {SignupScreenComponent} from './auth/signup-screen.component';
import { QuestionListComponent } from './question/question-list.component';
import { QuestionFormComponent } from './question/question-form.component';

//Modulo de routing
import {Routing} from './app.routing';


//Servicio de autenticacion
import {AuthService} from './auth/auth.service';


import { QuestionScreenComponent } from './question/question-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    AnswerFormComponent,
    SigninScreenComponent,
    SignupScreenComponent,
    QuestionListComponent,
    QuestionFormComponent,

    QuestionScreenComponent
  ],
  imports: [
    BrowserModule,
    [BrowserAnimationsModule],
    MaterialModule,  //siempre que se crea un nuevo componente hay que anadirlo aqui
    MomentModule,
    FormsModule,
    ReactiveFormsModule,

    //Modulo de routing
    Routing,

    //modulo de http
    HttpModule,
    QuestionScreenComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
