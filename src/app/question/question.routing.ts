import {QuestionListComponent} from './question-list.component';
import {QuestionDetailComponent} from './question-detail.component';
import { QuestionFormComponent } from './question-form.component';
import { QuestionScreenComponent } from './question-screen.component';

export const QUESTION_ROUTES=[
    {path:'', component: QuestionScreenComponent, pathMatch: 'full'},
    {path:'new',component :QuestionFormComponent},
    {path:':id', component: QuestionDetailComponent}
];