import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-individual-messages-students-list',
  templateUrl: './individual-messages-students-list.component.html',
  styleUrls: ['./individual-messages-students-list.component.css']
})
export class IndividualMessagesStudentsListComponent implements OnInit {
  @Input() students: Array<any>;
  @Output() parentsUsis = new EventEmitter<Array<number>>();
  
  selectedStudent:any;
  namesArray:string[];
  parentsUsisArray:number[];
  recipientsNames:string;

  public DataSize: number;
  displayedColumns: string[] = [
    'parentName',
    'studentName'
  ]
  selectedRows = new Set<any>();
  todelete:any;
  constructor() { }

  ngOnInit(): void {
    this.DataSize = this.students.length;
  }

  clickedRow(row){
    var isSelected = this.checkIfIsSelected(row);
    //alert(JSON.stringify(row))
    
    if(!isSelected)
      this.selectedRows.add(row)
    else
      {
        this.selectedRows.forEach((value) => {
          if(value.parentUsi == row.parentUsi)
            {
              this.todelete = value;
            }
        })
        this.selectedRows.delete(this.todelete)
      }
    this.setRecipientsNames();
  }

  updateRecipientsUSI(value: number[]) {
    // alert('update from child')
    this.parentsUsis.emit(value);
  }
  checkIfIsSelected(row){
    var array = Array.from(this.selectedRows);
    if(array.find(x=>x.parentUsi == row.parentUsi) != undefined)
      {
        return true;
      }
      return false;
  }
  
  setRecipientsNames(){
    this.namesArray = [];
    this.parentsUsisArray = [];

    this.selectedRows.forEach((value) => {
      //alert(JSON.stringify(value))
      this.namesArray.push(value.parentName)
      this.parentsUsisArray.push(value.parentUsi)
    });
    this.updateRecipientsUSI(this.parentsUsisArray);
    this.recipientsNames = this.namesArray.join(', ');

  }
}
