import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../services/api.service';
import { Component,NgZone, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var navigator: any;
declare var cordova: any;
declare var Camera: any;
declare var device: any;
declare const window: any;
var inAppBrowserRef;

@Component({
  selector: 'chat-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  isAndroid: boolean = true;
  appVersion: any;

  model: any = {};
  selectedLanguage: any;
  languages: any;
  sender: any;
  chatModel: any;
  simultaneousTranslation: boolean = true;
  simultaneousTranslationDone: boolean = false;
  filteredRecipients: any[] = [];
  recipients: any;

  studentUsi: string;
  recipientUniqueId: string;

  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router,
    private http: HttpClient) {

    this.route.params.subscribe(params => {
      this.studentUsi = params.studentUsi;
      this.recipientUniqueId = params.recipientUniqueId;
    });

    this.route.data.subscribe((data) => {
      this.recipients = data.recipients;
      this.languages = data.languages;
      this.chatModel = data.chatModel;
      this.sender = data.sender;
    });

    this.filteredRecipients = this.recipients.studentRecipients.slice(0);
    this.model.selectedStudent = this.recipients.studentRecipients.find((x) => {
      return x.studentUsi == this.studentUsi;
    });

    this.model.selectedRecipient = this.model.selectedStudent.recipients.find((x) => {
      return x.uniqueId == this.recipientUniqueId;
    });

    this.api.services.share.emitTitleMenu(this.model.selectedRecipient.fullName);

    var request = {
      studentUsi: this.model.selectedStudent.studentUsi,
      recipientUniqueId: this.model.selectedRecipient.uniqueId,
      recipientTypeId: this.model.selectedRecipient.personTypeId,
      rowsToSkip: 0,
      unreadMessageCount: this.model.selectedRecipient.unreadMessageCount
    };
    this.api.services.communications.getChatThread(request).then((chatModel: any) => {
      this.chatModel = chatModel;
      this.model.selectedRecipient.imageUrl = chatModel.recipient.imageUrl;
      this.api.services.share.emitNavBarChat({ showIconImage: true, studentName: this.model.selectedStudent.fullName, image: this.model.selectedRecipient.imageUrl });
      this.model.selectedRecipient.unreadMessageCount = 0;
      this.scrollBottom();
      this.api.services.share.emitUnreadMessage(true);
      this.transalteMessages(sessionStorage.getItem('language'));
    });
    
    this.selectedLanguage = this.languages.find((lang) => { return lang.code == this.sender.languageCode }) || this.languages[0];
    this.api.services.share.emitLanguageData({ languages: this.languages, selectedLanguage: this.selectedLanguage });
    this.api.services.communications.messageReceived.subscribe(message => {
      if(this.router.url.includes("convertation")) {
        let model = JSON.parse(message);
        model.dateSent=model.dateSent.split('+')[0];
        this.chatModel.conversation.messages.push(model);
        if (this.sender.uniqueId === model.recipientUniqueId && this.sender.personTypeId === model.recipientTypeId) {
          model.read = true;
          this.api.services.communications.recipientRead(model);
        }
        setTimeout(() => {
          this.scrollBottom();
        }, 100);
      }
    });

    this.api.services.share.changeLanguageSelected.subscribe(item => {
      this.selectedLanguage = item;
      this.transalteMessages(item.code);
    });
  }

  ngOnInit() {
    this.scrollBottom();
    console.log('ngOnInit')
    
    // console.log('fileTransfer');
    // console.log(fileTransfer);
    console.log('device.platform ' + device.platform)
    if (device.platform == 'iOS') {
      this.isAndroid = false;
    }
  this.api.services.mobile.mobileVersionDevice().then(version => {
    this.ngZone.run(() => this.appVersion = version);
    console.log('appVersion ' + version)

  });
  }


  cleanUrlImage(url) {
    let img = url.replace('clientapp/', '');
    return img;
  }

  takePicture(){
    let __this=this;
    var cameraOptions =  { 
      quality: 10,
      destinationType: Camera.DestinationType.DATA_URL
    }
    
    navigator.camera.getPicture( function(imageData){ 
      let imageBase64= imageData;
      __this.sendImage(imageBase64);
      // __this.sendMessage(imageBase64);
    }, this.cameraError, cameraOptions);
  }

  cameraError(message){
    console.log('failed because ' + message)
    //alert(message)
  }

  loadMore() {
    let request = {
      studentUsi: this.model.selectedStudent.studentUsi,
      recipientUniqueId: this.model.selectedRecipient.uniqueId,
      recipientTypeId: this.model.selectedRecipient.personTypeId,
      rowsToSkip: this.chatModel.conversation.messages.length
    };
    this.api.services.communications.getChatThread(request).then((chatModel: any) => {
      this.chatModel.conversation.endOfMessageHistory = chatModel.conversation.endOfMessageHistory;
      this.chatModel.conversation.messages.unshift(...chatModel.conversation.messages);
    });
  }


  simulTran() {
    if (!this.simultaneousTranslation)
      return;

    if (this.model.selectedRecipient.lenguageCode == 'en')
      return;

    if (this.model.message.length >= 2) {
      this.api.services.translate.autoDetectTranslate({
        textToTranslate: this.model.message,
        toLangCode: 'en'
      }).then((t) => {
        this.model.translatedMessage = t;
        this.simultaneousTranslationDone = true;
      });
    }
  }

  sendImage(image){
    var chatModel = {
      studentUniqueId: this.model.selectedStudent.studentUniqueId,
      recipientUniqueId: this.model.selectedRecipient.uniqueId,
      recipientTypeId: this.model.selectedRecipient.personTypeId,
      translatedMessage: this.model.message,
      englishMessage: image,
      translatedLanguageCode: sessionStorage.getItem('language')
    };
    console.log(JSON.stringify(chatModel))
    this.api.services.communications.uploadImageString(chatModel).then((data) => {
      //alert('Information saved' + data);
      this.sendMessage(data);
      var request = {
        studentUsi: this.model.selectedStudent.studentUsi,
        recipientUniqueId: this.model.selectedRecipient.uniqueId,
        recipientTypeId: this.model.selectedRecipient.personTypeId,
        rowsToSkip: 0,
        unreadMessageCount: this.model.selectedRecipient.unreadMessageCount
      };
      this.api.services.communications.getChatThread(request).then((chatModel: any) => {
        this.chatModel = chatModel;
        this.model.selectedRecipient.imageUrl = chatModel.recipient.imageUrl;
        this.api.services.share.emitNavBarChat({ showIconImage: true, studentName: this.model.selectedStudent.fullName, image: this.model.selectedRecipient.imageUrl });
        this.model.selectedRecipient.unreadMessageCount = 0;
        this.scrollBottom();
        // this.api.services.share.emitUnreadMessage(true);
        // this.transalteMessages(sessionStorage.getItem('language'));
      });
      this.scrollBottom();

    })
    this.scrollBottom();

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
    var storageLocation = this.isAndroid ? cordova.file.externalDataDirectory: cordova.file.documentsDirectory;
    

    
    // console.log(`start downloadFile. message:${message}`);
    var fileURL = this.getUrlFromMessage(message);
    var fileName = this.getFileNameFromUrl(fileURL)
    // console.log(`fileURL:${fileURL}`);
    //console.log(`calling getFileXHRReq:${fileURL}`);
    //this.getFileXHRReq(fileURL);
    console.log(`calling getFileHttpClient:${fileURL}`);
    this.download(fileURL,fileName)
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
  beforeloadCallBack(params, callback) {
    console.log('beforeload')
    
    console.log(params.url)
        if (params.url.startsWith("https://")) {
    
            // Load this URL in the inAppBrowser.
            callback(params.url);
        } else {
    
            // The callback is not invoked, so the page will not be loaded.
            console.log("This browser only opens pages on http://www.example.com/");
        }
    
    }
    
  onBeforeLoad(webAppWindow, params, callback){
    // Special handling of downloads. InAppBrowser doesn't handle them
    // so we have to manually preprocess and open in system browser:
    console.log('beforeLoad()')
    console.log(params.url)
    if(params.url.match(".pdf")){
      cordova.InAppBrowser.open(params.url, '_system');
    } else {
      // Default handling:
      callback(params.url);
    }
  }

  loadStartCallBack() {
    console.log("loading please wait ...");
  }

 loadStopCallBack() {

    if (inAppBrowserRef != undefined) {

        inAppBrowserRef.insertCSS({ code: "body{font-size: 25px;}" });

        inAppBrowserRef.executeScript({ code: "\
            var message = 'this is the message';\
            var messageObj = {my_message: message};\
            var stringifiedMessageObj = JSON.stringify(messageObj);\
            webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);"
        });

        inAppBrowserRef.show();
    }

}

 loadErrorCallBack(params) {

    

    var scriptErrorMesssage =
       "alert('Sorry we cannot open that page. Message from the server is : "
       + params.message + "');"

    inAppBrowserRef.executeScript({ code: scriptErrorMesssage }, this.executeScriptCallBack);

    inAppBrowserRef.close();

    inAppBrowserRef = undefined;

}

 executeScriptCallBack(params) {

    if (params[0] == null) {

      console.log(
           "Sorry we couldn't open that page. Message from the server is : '"
           + params.message + "'");
    }

}


 messageCallBack(params){
   console.log("message received: "+params.data.my_message);
}
  sendMessage(image=null) {
    console.log('sending message')
    if (!this.model.message || this.model.message.length <= 1){
      if(image.length<1){
        return;
      }
    }
      
    // Call SignalR.
    var chatModel = {
      studentUniqueId: this.model.selectedStudent.studentUniqueId,
      recipientUniqueId: this.model.selectedRecipient.uniqueId,
      recipientTypeId: this.model.selectedRecipient.personTypeId,
      translatedMessage: this.model.message,
      englishMessage: this.model.translatedMessage ? this.model.message:image,
      translatedLanguageCode: sessionStorage.getItem('language')
    };
    
    this.api.services.communications.postMessage(chatModel).then((data) => {
      this.model.message = '';
      this.model.englishMessage = ''; 
      
      data['dateSent']=data['dateSent'].split('+')[0]; 
      this.chatModel.conversation.messages.push(data);
      setTimeout(() => {
        this.scrollBottom();
      }, 100);

    });
    this.scrollBottom();
  }  

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () { resolve(reader.result) };
      reader.onerror = function (error) { reject(error) };
    });
  }

  splitMessage(message,indexToReturn){
    var array = message.split('|file');
    return array[indexToReturn];
  }
  
  GetFileName(fileName){
    var firstSplit = fileName.split('.')
    console.log('first split')
    console.log(firstSplit)
    var extension = firstSplit[firstSplit.length - 1]
    var secondSplit = firstSplit[firstSplit.length - 2].split('\\')
    console.log('second split')
    console.log(secondSplit)
    var name = secondSplit[secondSplit.length - 1]
    return name + '.' + extension;
  }
  uploadImage(fileInput: any) {
    let file = <File>fileInput.target.files[0];

    let fd = new FormData();
    
    fd.append("file", file);
    
    
    console.log('fd')
    console.log(fd)
    console.log(JSON.stringify(fd))

    if(device.platform == 'iOS'){
      var filessd = (<HTMLInputElement>document.getElementById('file-input')).value
      var fileNameToPass = this.GetFileName(filessd)
      console.log('fileNamdsfsdfsdfe: ' + fileNameToPass)
      console.log(filessd)
      console.log(JSON.stringify(filessd))

      fd.append("filename", fileNameToPass);


      console.log('***********************************************************')
      console.log('uploading fd file with parameters')
      console.log(fd)
      console.log(JSON.stringify(fd))
      console.log('***********************************************************')
      this.api.services.communications.uploadImageiOS(fd).then((data) => {
        console.log('uploadImageiOS')
        this.sendMessage(data);
      }).catch((err)=>{
        console.log('error en upload ios')
        console.log(err)
      })
    }else{
      this.api.services.communications.uploadImage(fd).then((data) => {
        this.sendMessage(data);
      })
    }
    
  }

  alignToRight(chatModel, sender) {
    ////alert("chatModel.senderUniqueId: "+ chatModel.senderUniqueId+ " sender.uniqueId "+ sender.uniqueId);
    return chatModel.senderUniqueId == sender.uniqueId && chatModel.senderTypeId == sender.personTypeId;
  }

  localTime(value)
  {
    value = value + "Z";
    return new Date(value);
  }

  paintBlueMessage(isAlignToRight) {

    if (isAlignToRight) {
      return '#b3e5fc';
    }
    return '';
  }
/*
  ctrl.getFileNameFromUrl = function (emessage) {

  }
  <a download href="{{m.englishMessage}}" class="link-download-file"><i class="ion ion-md-download" style="padding-top: 0.3rem; margin-right: 5px;"></i><span>Download File {{ctrl.getFileNameFromUrl(m.englishMessage)}}</span> </a>
*/
  scrollBottom() {
    window.scrollTo(0, document.getElementById('message-history').scrollHeight);
  }

  transalteMessages(transCode) {
    if(transCode != null) {
      this.chatModel.conversation.messages.forEach(m => {
        if(m.englishMessage.includes('data:image') || m.englishMessage.includes('data:application'))
          m.translatedMessage = m.englishMessage
        else{
          this.api.services.translate.autoDetectTranslate({
            textToTranslate: m.englishMessage,
            toLangCode: transCode
          }).then((t) => {
            m.translatedMessage = t;
          });
        }
        
      });
    }
  }

  
}
