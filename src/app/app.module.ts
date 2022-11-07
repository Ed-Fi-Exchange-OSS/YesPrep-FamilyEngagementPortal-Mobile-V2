import { NgxMaskModule } from 'ngx-mask';
import { CommonService } from './services/common/common.service';
import { NotificationsService } from './services/notifications/notifications.service';
import { ShareService } from './services/share/share.service';
import { PreloaderService } from './services/preloader/preloader.service';
import { TypesResolve } from './resolves/types.resolve';
import { MeResolve } from './resolves/me.resolve';
import { TranslateResolve } from './resolves/translate.resolve';
import { TranslateServices } from './services/translate/translate-services';
import { LogService } from './services/log/log.service';
import { MeService } from './services/me/me.service';
import { StudentResolve } from './resolves/student.resolve';
import { LandingRouteService } from './services/landingRoute/landing-route.service';
import { StudentsService } from './services/students/students.service';
import { OAuthInterceptor } from './services/oauth/oauth.interceptor';
import { OAuthService } from './services/oauth/oauth.service';
import { AzureService } from './services/oauth/providers/azure/azure.service';
import { TeachersService } from './services/teachers/teachers.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient, HttpBackend } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MomentModule } from 'ngx-moment';
import { MatStepperModule } from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/parent/landing/landing.component';
import { MobileService } from './services/common/mobile.service';
import { StudentcardComponent } from './components/parent/studentcard/studentcard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ParentService } from './services/parent/parent.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InterpretationIconComponent } from './components/share/interpretation-icon/interpretation-icon.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from './services/communication/communication.service';
import { StudentDetailComponent } from './components/studentDetail/student-detail/student-detail.component';
import { StudentProfileComponent } from './components/studentDetail/student-profile/student-profile.component';
import { Indicator2Component } from './components/share/indicator/indicator2/indicator2.component';
import { StudentAttendanceComponent } from './components/studentDetail/student-attendance/student-attendance.component';
import { DisciplineIncidentsComponent } from './components/share/discipline-incidents/discipline-incidents.component';
import { CurrentGradesComponent } from './components/share/grades/current-grades/current-grades.component';
import { ApiService } from './services/api.service';
import { LanguageChooserComponent } from './components/share/language-chooser/language-chooser.component';
import { MissingAssigmentsComponent } from './components/share/missing-assigments/missing-assigments.component';
import { StudentCalendarComponent } from './components/studentDetail/student-calendar/student-calendar.component';
import { StudentSuccessTeamComponent } from './components/studentDetail/student-success-team/student-success-team.component';
import { CustomParametersService } from './services/customParameters/custom-parameters.service';
import { IndicatorComponent } from './components/share/indicator/indicator/indicator.component';
import { StudentStaarAssessmentComponent } from './components/studentDetail/student-staar-assessment/student-staar-assessment.component';
import { CustomParamstResolve } from './resolves/custom-params.resolve';
import { StudentAssessmentComponent } from './components/studentDetail/student-assessment/student-assessment.component';
import { AlertResolve } from './resolves/alert.resolve';
import { AlertsService } from './services/alerts/alerts.service';
import { SubmitButtonComponent } from './components/share/forms/submit-button/submit-button.component';
import { SwitchComponent } from './components/share/switch/switch.component';
import { AlertComponent } from './components/alert/alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/userProfile/user-profile.component';
import { EmailsComponent } from './components/share/emails/emails.component';
import { TelephoneComponent } from './components/share/telephone/telephone.component';
import { AddressesComponent } from './components/share/addresses/addresses.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TypesService } from './services/types/types.service';
import { PreloaderComponent } from './components/share/preloader/preloader.component';
import { PreloaderInterceptor } from './services/preloader/preloader.interceptor';
import { SuccessTeamMemberModalComponent } from './components/share/modals/success-team-member-modal/success-team-member-modal.component';
import { PrivacyPolicyComponent } from './components/privacyPolicy/privacy-policy.component';
import { RecipientsResolve } from './resolves/recipients.resolve';
import { ChatResolve } from './resolves/chat.resolve';
import { SenderResolve } from './resolves/sender.resolve';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SearchPipe } from './pipe/search.pipe';
import { SignarRService } from './services/signarRService/signar-r.service';
import { DeleteConfirmationModalComponent } from './components/share/modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { ContactsComponent } from './components/communications/contacts/contacts.component';
import { ConversationComponent } from './components/communications/conversation/conversation.component';
import { LanguageSelectModalComponent } from './components/share/modals/language-select-modal/language-select-modal.component';
import { AlertsModalComponent } from './components/share/modals/alerts-modal/alerts-modal.component';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FeedbackService } from './services/feedback/feedback.service';
import { FeedbackModalComponent } from './components/share/modals/feedback/feedback-modal.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppleService } from './services/oauth/providers/apple/apple.service';
import { ExperienceUserComponent } from './components/login/experience-user/experience-user.component';
import { CampusleaderlandingComponent } from './components/campusleader/campusleaderlanding/campusleaderlanding.component';
import { TeacherLandingComponent } from './components/teacher/teacher-landing/teacher-landing.component';
import { TeacherStudentListComponent } from './components/teacher-student-list/teacher-student-list.component';
import { GroupMessagingComponent } from './components/share/group-messages/group-messaging/group-messaging.component';
import { GroupMessagesSentComponent } from './components/share/group-messages/group-messages-sent/group-messages-sent.component';
import { CustomAdapter, CustomDateParserFormatter } from './services/dateParserAdapter/date-parser-adapter.service';
import { ConfirmationService } from './services/confirmation/confirmation.service';
import { IndividualMessagesComponent } from './components/campusleader/individual-messages/individual-messages.component';
import { IndividualMessagesStudentsListComponent } from './components/campusleader/individual-messages-students-list/individual-messages-students-list.component';
import { MatTableModule } from '@angular/material/table'  
import { LogAccessService } from './services/logAccess/logAccess.service';

export function HttpLoaderFactory(httpBackend: HttpBackend): TranslateHttpLoader {
  return new TranslateHttpLoader( new HttpClient(httpBackend), "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    StudentcardComponent,
    NavbarComponent,
    InterpretationIconComponent,
    StudentDetailComponent,
    StudentProfileComponent,
    Indicator2Component,
    StudentAttendanceComponent,
    DisciplineIncidentsComponent,
    CurrentGradesComponent,
    LanguageChooserComponent,
    MissingAssigmentsComponent,
    StudentCalendarComponent,
    StudentSuccessTeamComponent,
    IndicatorComponent,
    StudentStaarAssessmentComponent,
    StudentAssessmentComponent,
    AlertComponent,
    SwitchComponent,
    SubmitButtonComponent,
    UserProfileComponent,
    EmailsComponent,
    TelephoneComponent,
    AddressesComponent,
    LayoutComponent,
    PreloaderComponent,
    SuccessTeamMemberModalComponent,
    PrivacyPolicyComponent,
    SearchPipe,
    DeleteConfirmationModalComponent,
    ContactsComponent,
    ConversationComponent,
    LanguageSelectModalComponent,
    AlertsModalComponent,
    FeedbackModalComponent,
    WizardComponent,
    ExperienceUserComponent,
    CampusleaderlandingComponent,
    TeacherLandingComponent,
    TeacherStudentListComponent,
    GroupMessagingComponent,
    GroupMessagesSentComponent,
    IndividualMessagesComponent,
    IndividualMessagesStudentsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend]
      }
    }),
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MomentModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    NgxMaskModule.forRoot(),
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OAuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PreloaderInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'accent' },
    },
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    ApiService,
    AzureService,
    OAuthService,
    MobileService,
    ParentService,
    CommunicationService,
    StudentsService,
    LandingRouteService,
    TeachersService,
    StudentResolve,
    CustomParamstResolve,
    MeService,
    LogService,
    LogAccessService,
    CustomParametersService ,
    AlertsService,
    AlertResolve,
    TypesService,
    TranslateServices,
    TranslateResolve,
    MeResolve,
    TypesResolve,
    PreloaderService,
    RecipientsResolve,
    CommunicationService,
    ChatResolve,
    SenderResolve,
    ShareService,
    SignarRService,
    NotificationsService,
    CommonService,
    FeedbackService,
    AppleService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
