import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'success-team-member-modal',
  templateUrl: './success-team-member-modal.component.html',
  styleUrls: ['./success-team-member-modal.component.css']
})
export class SuccessTeamMemberModalComponent {

  @Input() profile: any;
  @Input() color: string;
  @Input() usi: any;
  @Input() uniqueId: string;

  

  constructor(private modalService: NgbModal, private services: ApiService, private translate: TranslateService,
    private route: ActivatedRoute,private router: Router) { }
  
  cleanUrlImage(url) {
    let img = url.replace('clientapp/', '');
    return img;
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  viewPage() {
    this.translate.get("Family Portal").subscribe(label => {
      this.services.services.share.emitTitleMenu(label);
    })
    this.services.services.share.emitBackButton(true, `studentdetail/${this.profile.studentUsi}/true`);
  }

  goToChat(){
    var recipient: any;
    this.route.data.subscribe((data) => {
      recipient = data.studentInfo.successTeamMembers[0];       
      this.selectRecipient(recipient, this.profile);  
    });    
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
}
