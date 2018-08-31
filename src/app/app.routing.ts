import {Routes, RouterModule} from '@angular/router';
import { QuestionScreenComponent } from './question/question-screen.component';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { SignupScreenComponent } from './auth/signup-screen.component';

//children Routes
import{QUESTION_ROUTES} from './question/question.routing';

const APP_ROUTES: Routes=[
    {path:'', component: QuestionScreenComponent, pathMatch:'full'} ,    //Cuando estemos en home el cmponente que queremos mostrar  questionlist component
    {path:'signin',component: SigninScreenComponent},
    {path:'signup',component: SignupScreenComponent},

    //children
    {path:'questions', children:QUESTION_ROUTES}
]    // este array tien cada una de nuestras rutas


export const Routing=RouterModule.forRoot(APP_ROUTES);
