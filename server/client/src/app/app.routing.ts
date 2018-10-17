import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {MainComponent} from "./main/main.component";
import {ExamComponent} from "./exam/exam.component";
import {QuestionsComponent} from "./questions/questions.component";
import {HistoryComponent} from "./history/history.component";
import {ResultComponent} from "./result/result.component";
import {NewsComponent} from "./news/news.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: MainComponent},
  {path: 'exam', component: ExamComponent},
  {path: 'question', component: QuestionsComponent},
  {path: 'result', component: ResultComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'news', component: NewsComponent}
];

export const routing = RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"});
