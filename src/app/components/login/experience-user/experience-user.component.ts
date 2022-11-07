import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience-user',
  templateUrl: './experience-user.component.html',
  styleUrls: ['./experience-user.component.css']
})
export class ExperienceUserComponent implements OnInit {

  email: string = "";
  showScreen = false;
  errorMessage:string = "Unfortunately, we did not find that email in our student information system. Please click here to log in with the email address registered in the SIS. Reach out to your school's registrar to update your email or check the address registered in the SIS.";
  noEmailShared:boolean = false;
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.email = this.api.services.oauth.userInfo();
    // Patch for apple verification remove after validation
    if (this.email.includes("aprilperez")) {
      this.experienceUser();
    }
    else {
      this.showScreen = true;
      if(this.email.includes("privaterelay.appleid.com")) {
        this.noEmailShared = true;
        this.errorMessage = "Remember: to access the app please use your email on file with Skyward. If you have an Skyward email registered follow the following steps to login:";
      }
    }
  }

  experienceUser() : void {
    this.api.services.oauth.experienceUserLogin().then(data => {
      if (data) {
        this.router.navigateByUrl('layout/landing');
      }
    }).catch(err => {
      this.router.navigateByUrl('login');
    });
  }

}
