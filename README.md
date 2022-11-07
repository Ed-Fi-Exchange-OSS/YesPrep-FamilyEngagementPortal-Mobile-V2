# Family Engagement Mobile App provided by YesPrep and Student1
This Family Engagement Mobile App was made possible thanks to Yes Prep Public Schools, Student1 and the kind donations from the Michael & Susan Dell Foundation.

## Description
The Family Engagement Mobile App provides an easy-to-use view of student information, attendance, discipline, grades, and assessment scores with links to parent views in other applications. The Portal enables the communication between members of the student’s “success team” by supporting text communications with automatic language translation.

# Live Demo - Provided by Student1
Download the application from the aprorpiate stores

<div>
<a href="https://play.google.com/store/apps/details?id=org.student1.familyengagementapp" style=" display: block; margin-left: auto; margin-right:auto;"><img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" width="200" ></a><a href="https://apps.apple.com/mx/app/student1-family-engagement/id1516015641" style="padding: 10px;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Available_on_the_App_Store_%28black%29.png/640px-Available_on_the_App_Store_%28black%29.png" width="180" ></a>
</div>

### Credentials:

 ```sh
  Email: perry.savage@toolwise.onmicrosoft.com
  Password: Parent1234
```
# Setup
We tried to make the setup and deployment of this mobile application as easy as possible.

## Windows
##### Prerequisites
 - [Node.js 14.12.0 or higher](https://nodejs.org/)
 - [Angular CLI](https://cli.angular.io/)
 - [Android Studio](https://developer.android.com/studio)
 - [Android SDK](https://developer.android.com/studio/)
 - [Gradle](https://gradle.org/install/)
 - [Cordova](https://www.npmjs.com/package/cordova/)
 - [Visual Studio Code](https://code.visualstudio.com/) (Recomended)

##### Compile
Open a new terminal on visual studio code  
![alt text](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_1.PNG?raw=true)  
Clone the repository to your local machine using the following command
 ```sh
$  git clone https://github.com/Student1-org/ParentPortalMobile.git
$  cd ParentPortalMobile
```
Install all the necessary node packages using the following command
 ```sh
$  npm install
```
Once all the dependencies have been installed, build the application using Angular CLI
 ```sh
$  ng build
```
Create the android application using Cordova
 ```sh
$  Cordova platform add android
```
Run the application
```sh
$  Cordova run android
```  
If Cordova compiles the application correctly the folders "Platforms" and "Plugins" will be created on the same folder where the application lives.  
![alt text](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_3.PNG?raw=true)  

## Push Notifications
Create a project in [firebase](https://firebase.google.com/) and follow this article:
- [Configurate push notification for mobile apps](https://medium.com/@JakenH/implementing-apache-cordova-push-notifications-in-android-using-firebase-3a9e129132fc)


## Publish
 - [Sign your app](https://developer.android.com/studio/publish/app-signing)
 - [How to publish an app on Google Play Store](https://medium.com/@the_manifest/how-to-publish-an-app-on-google-play-a-step-by-step-guide-80f9f533e370)

## Apple
##### Prerequisites 
 - [XCode Latest]()
 - [Cocoa Pods](https://cocoapods.org/) (only for ios)
 - [Cordova](https://www.npmjs.com/package/cordova/)
 - [NodeJS 14.12.0 or higher](https://nodejs.org/)
 - [Angular CLI](https://cli.angular.io/)
 - [Visual Studio Code](https://code.visualstudio.com/) (recomended)

##### Compile
Open a new terminal, press [Command] + [Space] an type "Terminal" 
![alt text](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_4.PNG?raw=true)  
Clone the repository to you local machine, for this you can move to the folder where you want to clone the code
 ```sh
$  cd documents/[folder]
$  git clone https://github.com/Student1-org/ParentPortalMobile.git
$  cd ParentPortalMobile
```
##### Note:
 You may need to provide your git credentials when cloning the repository.
 
 Install Node packages
```sh
$  npm install
```
 Build the application with Angular CLI
```sh
$  ng build
```
Once the application has been compiled, add the iOS platform using Cordova
```sh
$  Cordova platform add ios
```
If Cordova compiles the application correctly the folders [Platforms] and [Plugins] will be created on the same folder where the app is.  
![alt text](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_3.PNG?raw=true)  
 
 ##### Publish
 - [How to publish an app in Apple Store](https://blog.codemagic.io/how-to-code-sign-publish-ios-apps/)

# Frequently Encountered Issues
### Error with Cocoa Pods when running the Cordova command (iOS)
Cocoa Pods may throw an error regarding permissions when running the Cordova command, in this case, you can modify your user permissions to allow cocoa pods to install plugins.  
![alt text](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_2.PNG?raw=true)  
 ```sh
$ sudo chown -R $USER ~/Library/Caches/CocoaPods
$ sudo chown -R $USER ~/.cocoapods
```
### Gradle error when running the Cordova command (Android)
Sometimes when running the command "Cordova platform add Android" you may get the following error  
![alt text](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_15.png?raw=true)  
Android studio already has Gradle integrated but in order to run the Cordova command to build the application, you have to manually install Gradle (click on Gradle on the prerequisites section).

### ANDROID_HOME error when running Cordova command  (Android)  
![alt text](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_16.png?raw=true)  
If you face an error regarding the ANDROID_HOME environment variable go to Control Panel\System and Security\System and click "Advance Settings" then click on the "Environment Variables" button and add "ANDROID_HOME", on the value, you should provide the path of your Android SDK.  
![alt text](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_17.png?raw=true)
![alt text](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_18.png?raw=true)
![alt text](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_19.png?raw=true)

### JAVA_HOME error when running Cordova command  (Android)
If you face an error regarding the JAVA_HOME environment variable go to Control Panel\System and Security\System and click "Advance Settings" then click on the "Environment Variables" button and add "JAVA_HOME", on the value, you should provide the path of your Java JDK installation folder (See the "ANDROID_HOME error above).  
![alt text](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_20.png?raw=true)

# Production Release Considerations
For this application to work in production you will need to make sure you take into consideration the following:  

- Name of application and package name: [img_14](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_14.png?raw=true)
  - *Id*: Name of package project 
  - *version*: Verion of the application ([Semantic Versioning](https://semver.org/spec/v1.0.0.html))
  - *Name*: Name of the application
  - *description*: Description of the application
  - *author*: Autor of the application

- Use and configure the [Family Engagement Api](https://github.com/Ed-Fi-Exchange-OSS/ParentPortal) and configure the API URL in the app.
- Go to the file environment.ts in src/environments/environments.ts and configure the follow credentials:

```sh
environment = {
  production: false,
  isMovile: true,
  api: {
    rootApiUrl: "/api",
    key: "",
    secret: "",
    apiEndpoint: 'https://[the URL to the API]]/'
  },
  azureAd: {
    mode: 'B2C',
    b2b: {
      tenantId: 'tenant.onmicrosoft.com',
      clientId: 'XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      instance: 'https://login.microsoftonline.com/',
      redirectUri: 'api/redirect',
      resource: 'https://graph.windows.net/',
      policy: ''
    },
    btc: {
      tenantId: 'tenant.onmicrosoft.com/',
      clientId: 'XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      redirectUri: 'api/redirect',
      instance: 'https://TenantB2C.b2clogin.com/',
      resource: 'https://graph.windows.net/',
      policy: 'B2C_Policy'
    }
  },
  google: {
    notifications: {
      senderId: '000000000000'
    }
  }
  }
```
  - *apiEnpoint*: This is the route of the API
  - *mode*: This only accepts two types of value B2C and B2B 
  - *B2B & B2C*: Credentials of Azure Active Directory
  - *google:notifications:senderId*: 
    - Identifier of the project for push notification (firebase)
    - Update the variable **SENDER_ID** in the file config.xml ![sender_id](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_8.png?raw=true)
    
## Customize the Application
To customize the application to look and feel like its yours we recomend updating these configuration parameters:

### Logo
<!-- 
![img_folders](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_11.png?raw=true)
![img_android](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_9.png?raw=true)
![img_ios](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_10.png?raw=true)
![img_folder_android](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_12.png?raw=true)
![img_folder_ios](https://github.com/Student1-org/ParentPortalMobile/blob/master/readme_files/ss_13.png?raw=true) -->


## Legal Information

Copyright (c) 2020 Ed-Fi Alliance, LLC, and contributors.

Licensed under the [Apache License, Version 2.0](LICENSE) (the "License").

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.

See [NOTICES](NOTICES.md) for additional copyright and license notifications.