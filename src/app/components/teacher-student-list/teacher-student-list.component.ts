import { Component, Input, OnInit } from '@angular/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { StudentBriefModel } from 'src/app/models/IStudent';

@Component({
  selector: 'app-teacher-student-list',
  templateUrl: './teacher-student-list.component.html',
  styleUrls: ['./teacher-student-list.component.css']
})

export class TeacherStudentListComponent implements OnInit {
  @Input() students: Array<StudentBriefModel>;
  public DataSize: number;
  constructor() { }

  ngOnInit(): void {
    this.DataSize = this.students.length;
  }

}
