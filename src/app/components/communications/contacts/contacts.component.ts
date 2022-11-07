import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  model: any = {};
  searchValue: string = '';
  filteredRecipients: any[] = [];
  recipients: any;
  selectedLanguage: any;
  chatModel: any;
  recipientsLoading: boolean = false;
  studentUsi: number = null;
  showAll:boolean=true;
  constructor(private api: ApiService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router) {
    this.api.services.share.emitBackButton(true, '');
    this.translateService.get('view.communications.title').subscribe(label => {
      this.api.services.share.emitTitleMenu(label);
    });
    

    
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{ 
      let studentUsi = this.route.snapshot.params.studentUsi;   
      if (studentUsi != undefined && studentUsi != "undefined") {
        this.studentUsi = Number(studentUsi); //this.showAll=false;
      }else{
        this.showAll=true;
      }      
    });

    this.route.data.subscribe((data) => {
      this.recipients = data.recipients;
    });

    if(this.studentUsi != null) {
      this.filteredRecipients = this.recipients.studentRecipients.slice(0,1);
    }else{
      this.filteredRecipients = this.recipients.studentRecipients.slice(0);
    }
    
    this.checkAvatar(this.recipients.studentRecipients);
    this.model.selectedStudent = this.recipients.studentRecipients.find((x) => {
      return x.studentUsi == this.studentUsi;
    });
    
    if(this.studentUsi != null)     
      this.selectStudentRecipient(this.model.selectedStudent);      

    this.api.services.communications.messageReceived.subscribe((m) => {
      let message = JSON.parse(m);
      this.filteredRecipients.forEach((fr) => {
        if (fr.studentUniqueId == message.studentUniqueId) {
          fr.unreadMessageCount++;
          fr.recipients.forEach((r) => {
            if (r.uniqueId == message.senderUniqueId) {
              r.unreadMessageCount++;
            }
          });
        }
      });

    });
  }

  search(event) {
    if (this.searchValue.length > 0) {
      this.filteredRecipients = this.recipients.studentRecipients.filter((sr) => {
        return sr.fullName.toUpperCase().indexOf(this.searchValue.toUpperCase()) != -1 || sr.recipients.some((r) => { return r.fullName.toUpperCase().indexOf(this.searchValue.toUpperCase()) != -1 });
      });
      this.filteredRecipients.forEach((sr) => { sr.show = true; });
     
    } else {
      this.filteredRecipients = this.recipients.studentRecipients.slice(0);
      this.filteredRecipients.forEach((sr) => {
        sr.show = false || (this.model.selectedStudent && sr.studentUsi == this.model.selectedStudent.studentUsi);
      });
    }
  }

  expandRecipients() {

    this.recipients.studentRecipients.forEach((recipient) => {
      recipient.show = true;
    });
  }

  collapseRecipients() {
    this.recipients.studentRecipients.forEach((recipient) => {
      recipient.show = false;
    });

  }

  selectStudentRecipient(studentRecipient) {
    if (this.model.selectedStudent && this.model.selectedStudent.studentUsi == studentRecipient.studentUsi) {
      this.model.selectedStudent = null;
      this.model.selectedRecipient = null;
    }
    if (studentRecipient.recipients.length > 0)
      studentRecipient.show = !studentRecipient.show;
    else {
      this.translateService.get('Student with no Parents').subscribe(label => {
        alert(label);
      })
    }
  }

  cleanUrlImage(url) {
    let img = url.replace('clientapp/', '');
    return img;
  }

  selectRecipient(recipient, student) {

    let data = {
      selectStudent: student,
      selectedRecipient: recipient
    }
    this.router.navigateByUrl(`/layout/communications/convertation/${student.studentUsi}/${recipient.uniqueId}/${recipient.personTypeId}/${recipient.unreadMessageCount}`,
      {
        state: data
      });
  }

  activeAccordion(r, model) {
    if (model.selectedRecipient) {
      return r.uniqueId == model.selectedRecipient.uniqueId
    } else {
      return false;
    }

  }

  containerStyle() {
    if (this.api.services.mobile.device == 'Android') {
      return 'container-android-contacts';
    }
    return 'container-ios-contacts';
  }

  randomAvatarColor() {
    return "hsla(" + ~~(360 * Math.random()) + "," +
      "70%," +
      "80%,1)"
  }

  checkAvatar(recipients) {
    recipients.forEach((fr) => {
        if (fr.imageUrl == null || fr.imageUrl == "") {
            fr.avatar = {
                color: this.randomAvatarColor(),
                name: fr.firstName.charAt(0) + fr.lastSurname.charAt(0)
            }
        }
        fr.recipients.forEach((r) => {
            if (r.imageUrl == null || r.imageUrl == "") {
                r.avatar = {
                    color: this.randomAvatarColor(),
                    name: r.firstName.charAt(0) + r.lastSurname.charAt(0)
                }
            }
        })
        
    });
}
}
