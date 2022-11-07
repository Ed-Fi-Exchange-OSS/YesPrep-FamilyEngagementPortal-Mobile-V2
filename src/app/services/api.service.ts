import { FeedbackService } from './feedback/feedback.service';
import { CommonService } from './common/common.service';
import { ShareService } from './share/share.service';
import { TypesService } from './types/types.service';
import { AlertsService } from './alerts/alerts.service';
import { CustomParametersService } from './customParameters/custom-parameters.service';
import { MobileService } from './common/mobile.service';
import { CommunicationService } from './communication/communication.service';
import { LandingRouteService } from './landingRoute/landing-route.service';
import { LogService } from './log/log.service';
import { MeService } from './me/me.service';
import { OAuthService } from './oauth/oauth.service';
import { ParentService } from './parent/parent.service';
import { Injectable } from '@angular/core';
import { StudentsService } from './students/students.service';
import { TranslateServices } from './translate/translate-services';
import { TeachersService } from './teachers/teachers.service';
import { SchoolsService } from './schools/schools.service';
import { LogAccessService } from './logAccess/logAccess.service';



@Injectable()
export class ApiService {

  constructor(private studentService: StudentsService, 
              private parentService: ParentService, 
              private oAuthService: OAuthService,
              private meService: MeService,
              private logService: LogService,
              private logAccessService: LogAccessService,
              private landingRouteService: LandingRouteService,
              private communicationService: CommunicationService,
              private mobileService: MobileService,
              private customParametersService: CustomParametersService,
              private alertService: AlertsService,
              private typesService: TypesService,
              private translateService: TranslateServices,
              private shareService: ShareService,
              private commonService: CommonService,
              private feedbackService: FeedbackService,
              private teachersService: TeachersService,
              private schoolsService: SchoolsService
              ) { }

  public get services() {
    return {
      oauth: this.oAuthService,
      students: this.studentService,
      parents: this.parentService,
      me: this.meService,
      log: this.logService,
      logAccess: this.logAccessService,
      landingRoutes: this.landingRouteService,
      communications: this.communicationService,
      mobile: this.mobileService,
      customParameters: this.customParametersService,
      alerts: this.alertService,
      translate: this.translateService,
      types: this.typesService,
      share: this.shareService,
      common: this.commonService,
      feedback: this.feedbackService,
      teachers: this.teachersService,
      schools: this.schoolsService
    };
  }
}
