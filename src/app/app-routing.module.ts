import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './home/main-page/main-page.component';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  {path: 'home', component: MainPageComponent},
  {path: 'survey', component: SurveyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
