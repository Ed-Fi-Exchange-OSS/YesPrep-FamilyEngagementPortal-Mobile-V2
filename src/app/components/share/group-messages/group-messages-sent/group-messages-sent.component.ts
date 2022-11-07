import { Component, OnInit, Input , OnChanges } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
var inAppBrowserRef;
declare const window: any;
declare var cordova: any;

@Component({
  selector: 'app-group-messages-sent',
  templateUrl: './group-messages-sent.component.html',
  styleUrls: ['./group-messages-sent.component.css']
})

export class GroupMessagesSentComponent implements OnInit, OnChanges  {
  @Input() schoolId: number;
  @Input() role: string;
  @Input() teacherSchoolId: number;
  
  gradeLevels:any;
  programs:any;
  schools:any;
  sections:any;
  courseTitle:string;
  initDate:NgbDateStruct;
  endDate:NgbDateStruct;
  searchTerm:string;
  messagesFounded:any;
  hasMessageSelected:boolean;
  selectedMessage:any;
  public showSchools = false;

  public GradeId: string = '0';
  public selectedProgramId: string = '0';

  constructor(private apiService: ApiService) { }

  ngOnChanges() {
    this.apiService.services.schools.getGradeLevels(this.schoolId).subscribe((data) => {
      this.gradeLevels = data;
      this.GradeId = this.gradeLevels[0].id;
      this.apiService.services.schools.getPrograms(this.schoolId).subscribe((data) => {
        this.programs = data;
        this.selectedProgramId = this.programs[0].id;

      });
    });
  }
  ngOnInit(): void {
    this.hasMessageSelected = false;
    if(this.role === "teacher"){
      this.apiService.services.teachers.getSections().subscribe((data) => {
        this.sections = data; //This field not exists in request to API
        if(this.sections.length>=1){
          this.schoolId= this.sections[0].schoolId;
        }
      });
    
    }
    
  }
  onChange(){
    this.searchMessages();
  }
  
  onChangeSchool() {
    this.apiService.services.schools.getGradeLevels(this.schoolId).subscribe((data) => {
      this.gradeLevels = data;
      this.GradeId = this.gradeLevels[0].id;
      this.apiService.services.schools.getPrograms(this.schoolId).subscribe((data) => {
        this.programs = data;
        this.selectedProgramId = this.programs[0].id;

      });
    });
  }

  splitMessage(message,indexToReturn){
    var array = message.split('|file');
    return array[indexToReturn];
  }
  
  getUrlFromMessage(message) {
    if (message.startsWith('https')) {
      console.log('not splitting ' + message)
      return (message)
    }
    else {
      console.log('splitting ' + this.splitMessage(message, 2))
      return this.splitMessage(message, 2)
    }
  }

  getFileNameFromUrl(url) {
    var array = url.split('chat/');
    var fileName = array[1].split('?sv')
    return fileName[0];
  }
  downloadFile(message){
    var fileURL = this.getUrlFromMessage(message);
    var fileName = this.getFileNameFromUrl(fileURL)
    // console.log(`fileURL:${fileURL}`);
    //console.log(`calling getFileXHRReq:${fileURL}`);
    //this.getFileXHRReq(fileURL);
    console.log(`calling getFileHttpClient:${fileURL}`);
    this.download(fileURL,fileName)
  }

  download(fileURL,fileName){
    var target = "_blank";
    var options = "location=yes,hidden=yes,beforeload=yes";
    var fileType = this.GetFileType(fileName)

    
    // inAppBrowserRef.addEventListener('message', this.messageCallBack);


    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
      var cacheDir = fileSystem.root.toURL();
      fileSystem.root.getDirectory("YPrep", {
          create: true, exclusive: false
      }, function (dirEntry) {
        // console.log('dir created stringify' + JSON.stringify(dirEntry))
        // console.log('dir created to url' + dirEntry.toURL())
        var donwloadPath = dirEntry.toURL()+fileName;
        // console.log('download path')
        // console.log(donwloadPath)
        // console.log('dirEntry.fullPath')
        // console.log(dirEntry.fullPath)
          var ft = new FileTransfer();
          ft.download(fileURL, dirEntry.toURL()+fileName , function (entry) {
            console.log('entry.toURL()')
            console.log(entry.toURL())
              console.log(fileName + " downloaded successfully at:" + dirEntry.fullPath);

              cordova.plugins.fileOpener2.open(
                dirEntry.toURL()+fileName, // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Downloads/starwars.pdf
                fileType,
                {
                    error : function(e) {
                        console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                    },
                    success : function () {
                        console.log('file opened successfully');
                    }
                }
            );


              // window.open(dirEntry.toURL() + fileName, "_blank", "location=yes");
          }, function (error) {
              alert("download failed: " + JSON.stringify(error));
          });
      }, function (error) {
          alert("dir creation failed: " + JSON.stringify(error));
      });
  }, function (error) {
      alert("requesting file system failed: " + JSON.stringify(error));
  });
  }
  
  GetFileType(fileName){
    var splitstring = fileName.split('.');
    var extension = splitstring[splitstring.length-1];
    switch(extension)
    {
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
        
      case 'pdf':
        return 'application/pdf';
      case 'doc':
      case 'docx':
        return 'application/msword';
      case 'xls':
        return 'application/vnd.ms-excel';
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'pptx':
        return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
      case 'ppt':
        return 'application/vnd.ms-powerpoint';
      default:
          return  'application/'+extension
        
    }
  }

  cleanAdvancedSearch(){
    this.initDate=null;
    this.endDate=null;
    this.courseTitle="";
  }
  searchMessages(){
    
    var request = {
      from: this.initDate,
      gradeLevels:[],
      programs:[],
      searchTerm:this.searchTerm,
      to:this.endDate,
      sectionName:""
    }

    if(this.role=="teacher"){
      request.sectionName = this.courseTitle == "All Sections" ? "" : this.courseTitle
    }else{
      const grade = Number.parseInt(this.GradeId, 0);
      const program = Number.parseInt(this.selectedProgramId, 0);
  
      let gradesList: number[] = [];
      let programsList: number[] = [];
  
      if (grade === 0) {
        this.gradeLevels.forEach(element => {
          gradesList.push(element.id);
        });
        
        gradesList.shift();
      } else {
        gradesList.push(grade);
      }
      
      if(program != 0){
        programsList.push(program);
      }else{
        this.programs.forEach(element => {
          programsList.push(element.id);
        });
        programsList.shift();
  
      }    
      
      request.gradeLevels=gradesList
      request.programs=programsList

    }
    
   // alert(JSON.stringify(request))

    this.apiService.services.communications.getGroupMessagesQueues(this.schoolId,request).then((data)=>{
      this.messagesFounded = data
    }).catch((err)=>{
      alert(JSON.stringify(err))
    })
  }
  
  toggleHasSelectedMessage(){
    this.hasMessageSelected = !this.hasMessageSelected;
  }

  messageDetail(message){
    this.toggleHasSelectedMessage();
    this.selectedMessage = message;
    // alert(JSON.stringify(message))

  }

  returnToList(){
    this.toggleHasSelectedMessage();
    this.selectedMessage = null;
  }


}
