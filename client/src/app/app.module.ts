import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {routing} from "./app.routing";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { ExamComponent } from './exam/exam.component';
import { QuestionsComponent } from './questions/questions.component';
import { ResultComponent } from './result/result.component';
import { HistoryComponent } from './history/history.component';
import { TypePipe } from './_pipes/type.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./_services/auth.service";
import {RegistrationService} from "./_services/registration.service";
import {FormValidationService} from "./_validators/form-validation.service";
import { SortPipe } from './_pipes/sort.pipe';
import { ExamPipe } from './_pipes/exam.pipe';
import { SortNumberPipe } from './_pipes/sort-number.pipe';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ExamComponent,
    QuestionsComponent,
    ResultComponent,
    HistoryComponent,
    TypePipe,
    SortPipe,
    ExamPipe,
    SortNumberPipe,
    NewsListComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    AuthService,
    RegistrationService,
    FormValidationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
