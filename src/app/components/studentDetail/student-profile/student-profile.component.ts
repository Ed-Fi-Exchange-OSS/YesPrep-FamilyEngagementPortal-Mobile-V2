import { ApiService } from './../../../services/api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  @Input() model: any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.services.communications.messageReceived.subscribe(() =>{
      this.api.services.communications.recipientUnread().then((data: any) => {
        this.model.unreadMessageCount = data.unreadMessagesCount;
      }).catch(error => console.log("error in reacipientUnread" + error));
    });
  }

  
  cleanUrlImage(url) {
    let img = url.replace('clientapp/', '');
    return img;
  }
}
