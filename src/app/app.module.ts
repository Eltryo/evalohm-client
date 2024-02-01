import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './authentication/landing/login/login.component';
import {RegisterComponent} from './authentication/landing/register/register.component';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LandingComponent} from './authentication/landing/landing/landing.component';
import {MatTabsModule} from "@angular/material/tabs";
import {RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {NavbarComponent} from './navbar/navbar.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {authenticatedGuard} from "./utility/route-guards/authenticated.guard";
import {
  RegistrationConfirmationComponent
} from './authentication/registration/registration-confirmation/registration-confirmation.component';
import {
  RegistrationCompleteComponent
} from './authentication/registration/registration-complete/registration-complete.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ResetPasswordComponent} from './authentication/reset-password/reset-password/reset-password.component';
import {AccountComponent} from './account/account.component';
import {RenewPasswordComponent} from './authentication/reset-password/renew-password/renew-password.component';
import {NotificationComponent} from './notification/notification.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CourseComponent} from './course/course.component';
import {EvaluationComponent} from './evaluation/evaluation.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {StarRatingComponent} from './evaluation/ratingblocks/star-rating/star-rating.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {AssessmentCreationComponent} from "./assessment/assessment-creation/assessment-creation.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {
  MultipleChoiceRatingComponent
} from './evaluation/ratingblocks/multiple-choice-rating/multiple-choice-rating.component';
import {MatRadioModule} from "@angular/material/radio";
import {profGuard} from "./utility/route-guards/prof.guard";
import {studentGuard} from "./utility/route-guards/student.guard";
import {AssessmentsComponent} from './assessment/assessments/assessments.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {ContactComponent} from './contact/contact.component';
import {EditAssessmentComponent} from './assessment/edit-assessment/edit-assessment.component';
import {
  AssessmentCloseConfirmationDialogComponent
} from './assessment/assessment-close-confirmation-dialog/assessment-close-confirmation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AssessmentResultComponent} from './assessment/assessment-result/assessment-result.component';
import {
  BarGraphMultipleChoiceComponent
} from './assessment/assessment-result/bar-graph-multiple-choice/bar-graph-multiple-choice.component';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';
import {CommentsComponent} from './assessment/assessment-result/comments/comments.component';
import {DialogComponent} from './course/dialog/dialog.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: CourseComponent, canActivate: [authenticatedGuard]},
  {path: 'contact', component: ContactComponent},
  {path: 'assessments/:id/evaluate', component: EvaluationComponent, canActivate: [authenticatedGuard, studentGuard]},
  {path: 'assessments', component: AssessmentsComponent, canActivate: [authenticatedGuard, profGuard]},
  {path: 'assessments/:id/edit', component: EditAssessmentComponent, canActivate: [authenticatedGuard, profGuard]},
  {path: 'assessments/create', component: AssessmentCreationComponent, canActivate: [authenticatedGuard, profGuard]},
  {path: 'assessments/:id/result', component: AssessmentResultComponent, canActivate: [authenticatedGuard]},
  {path: 'assessments/:id/result/comments', component: CommentsComponent, canActivate: [authenticatedGuard, profGuard]},
  {path: 'account', component: AccountComponent, canActivate: [authenticatedGuard]},
  {path: 'authenticate', component: LandingComponent},
  {path: 'confirmRegistration', component: RegistrationConfirmationComponent},
  {path: 'registrationComplete', component: RegistrationCompleteComponent},
  {path: 'resetPassword', component: ResetPasswordComponent},
  {path: 'renewPassword', component: RenewPasswordComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    AssessmentCreationComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    NavbarComponent,
    RegistrationConfirmationComponent,
    RegistrationCompleteComponent,
    ResetPasswordComponent,
    AccountComponent,
    RenewPasswordComponent,
    NotificationComponent,
    AppComponent,
    CourseComponent,
    AppComponent,
    EvaluationComponent,
    StarRatingComponent,
    MultipleChoiceRatingComponent,
    AssessmentsComponent,
    DialogComponent,
    ContactComponent,
    EditAssessmentComponent,
    AssessmentCloseConfirmationDialogComponent,
    AssessmentResultComponent,
    BarGraphMultipleChoiceComponent,
    CommentsComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    RouterOutlet,
    MatButtonModule,
    RouterLink,
    NgForOf,
    MatIconModule,
    MatRadioModule,
    MatTooltipModule,
    MatDialogModule,
    CanvasJSAngularChartsModule
  ],
  providers: [
    MatSnackBar,
    {provide: MAT_DATE_LOCALE, useValue: "de"},
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
