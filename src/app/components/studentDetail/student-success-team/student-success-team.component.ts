import { SuccessTeamMember, Student } from './../../../models/IStudent';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'student-success-team',
  templateUrl: './student-success-team.component.html',
  styleUrls: ['./student-success-team.component.css']
})
export class StudentSuccessTeamComponent implements OnInit {

  @Input() data: Student;
  colors = ['red', 'pink', 'deep-purple', 'blue', 'cyan', 'yellow', 'orange', 'brown', 'light-blue'];
  model: any = {
    student: {},
    successTeam: [],
    successTeamMembers: []
  }
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.model.student = this.data;
    this.api.services.students.getStudentSuccessTeamMembers(this.data.studentUsi).then((sucessTeam:SuccessTeamMember[]) => {
      this.model.student.successTeamMembers = sucessTeam;
    });
    this.processSuccessTeam(this.data.successTeamMembers);
  }

  getColor = function (index) {
    return this.colors[index % this.colors.length];
  }
  processSuccessTeam(teamMemebers) {

    switch (teamMemebers.length) {
      case 1:
        this.model.successTeam[1] = teamMemebers[0];
        break;
      case 2:
        this.model.successTeam[3] = teamMemebers[0];
        this.model.successTeam[5] = teamMemebers[1];
        break;
      case 3:
        this.model.successTeam[1] = teamMemebers[0];
        this.model.successTeam[6] = teamMemebers[1];
        this.model.successTeam[8] = teamMemebers[2];
        break;
      case 4:
        this.model.successTeam[0] = teamMemebers[0];
        this.model.successTeam[2] = teamMemebers[1];
        this.model.successTeam[6] = teamMemebers[2];
        this.model.successTeam[8] = teamMemebers[3];
        break;
      case 5:
        this.model.successTeam[1] = teamMemebers[0];
        this.model.successTeam[3] = teamMemebers[1];
        this.model.successTeam[5] = teamMemebers[2];
        this.model.successTeam[6] = teamMemebers[3];
        this.model.successTeam[8] = teamMemebers[4];
        break;
      case 6:
        this.model.successTeam[0] = teamMemebers[0];
        this.model.successTeam[2] = teamMemebers[1];
        this.model.successTeam[3] = teamMemebers[2];
        this.model.successTeam[5] = teamMemebers[3];
        this.model.successTeam[6] = teamMemebers[4];
        this.model.successTeam[8] = teamMemebers[5];
        break;
      case 7:
        this.model.successTeam[0] = teamMemebers[0];
        this.model.successTeam[1] = teamMemebers[1];
        this.model.successTeam[2] = teamMemebers[2];
        this.model.successTeam[3] = teamMemebers[3];
        this.model.successTeam[5] = teamMemebers[4];
        this.model.successTeam[6] = teamMemebers[5];
        this.model.successTeam[8] = teamMemebers[6];
        break;
      case 8:
        this.model.successTeam[0] = teamMemebers[0];
        this.model.successTeam[1] = teamMemebers[1];
        this.model.successTeam[2] = teamMemebers[2];
        this.model.successTeam[3] = teamMemebers[3];
        //this.model.successTeam[4] = teamMemebers[0];
        this.model.successTeam[5] = teamMemebers[4];
        this.model.successTeam[6] = teamMemebers[5];
        this.model.successTeam[7] = teamMemebers[6];
        this.model.successTeam[8] = teamMemebers[7];
        break;
      default:
        for (var i = 0; i < teamMemebers.length; i++)
          this.model.successTeam[i] = teamMemebers[i];
    }
  }

  
  cleanUrlImage(url) {
    let img = url.replace('clientapp/', '');
    return img;
  }
}
