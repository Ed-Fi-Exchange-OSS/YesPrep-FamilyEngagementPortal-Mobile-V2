import { ExperienceUserComponent } from './components/login/experience-user/experience-user.component';
import { ConversationComponent } from './components/communications/conversation/conversation.component';
import { ContactsComponent } from './components/communications/contacts/contacts.component';
import { SenderResolve } from './resolves/sender.resolve';
import { RecipientsResolve } from './resolves/recipients.resolve';
import { PrivacyPolicyComponent } from './components/privacyPolicy/privacy-policy.component';
import { TranslateResolve } from './resolves/translate.resolve';
import { TypesResolve } from './resolves/types.resolve';
import { MeResolve } from './resolves/me.resolve';
import { UserProfileComponent } from './components/userProfile/user-profile.component';
import { LayoutComponent } from './components/layout/layout.component';
import { StudentResolve } from './resolves/student.resolve';
import { StudentDetailComponent } from './components/studentDetail/student-detail/student-detail.component';
import { LandingComponent } from './components/parent/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomParamstResolve } from './resolves/custom-params.resolve';
import { AlertComponent } from './components/alert/alert.component';
import { AlertResolve } from './resolves/alert.resolve';
import { ChatResolve } from './resolves/chat.resolve';
import { TeacherLandingComponent } from './components/teacher/teacher-landing/teacher-landing.component';
import { CampusleaderlandingComponent } from './components/campusleader/campusleaderlanding/campusleaderlanding.component';

const routes: Routes = [
  { path: '', redirectTo: 'layout/landing', pathMatch: 'full' },
  {
    path: 'layout', component: LayoutComponent, children: [
      {
        path: 'landing', component: LandingComponent,
        resolve: {
          customParams: CustomParamstResolve
        }
      },
      {
        path: 'teacher', component: TeacherLandingComponent,
        resolve: {
          customParams: CustomParamstResolve
        }
      },
      {
        path: 'campusleader', component: CampusleaderlandingComponent,
        resolve: {
          customParams: CustomParamstResolve
        }
      },
      {
        path: 'studentdetail/:studentId', component: StudentDetailComponent,
        resolve: {
          studentInfo: StudentResolve,
          customParams: CustomParamstResolve
        }
      },
      {
        path: 'studentdetail/:studentId/:anchor', component: StudentDetailComponent,
        resolve: {
          studentInfo: StudentResolve,
          customParams: CustomParamstResolve
        }
      },  {
        path: 'studentdetail/:studentId/:successTeam', component: StudentDetailComponent,
        resolve: {
          studentInfo: StudentResolve,
          customParams: CustomParamstResolve
        }
      },
      { path: 'alert', component: AlertComponent, resolve: { alerts: AlertResolve } },
      {
        path: 'profile',
        component: UserProfileComponent,
        resolve: {
          model: MeResolve,
          methodOfContactTypes: TypesResolve,
          languages: TranslateResolve
        }
      },
      { path: 'privacypolicy', component: PrivacyPolicyComponent },
      {
        path: 'communications/contacts/:studentUsi',
        component: ContactsComponent,
        resolve: {
          recipients: RecipientsResolve
        }
      },
      {
        path: 'communications/convertation/:studentUsi/:recipientUniqueId/:recipientTypeId/:unreadMessageCount',
        component: ConversationComponent,
        resolve: {
          recipients: RecipientsResolve,
          chatModel: ChatResolve,
          languages: TranslateResolve,
          sender: SenderResolve
        }

      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'experienceUser', component: ExperienceUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
