// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isMovile: true,
  api: {
    rootApiUrl: "/api",
    key: "",
    secret: "",
    apiEndpoint: 'https://familyportal.neltic.com/'
  },
  azureAd: {
    mode: 'B2B',
    b2b: {
     tenantId: 'toolwise.onmicrosoft.com',
     clientId: 'c34f1634-092c-476e-baa9-29e429717879',
     instance: 'https://login.microsoftonline.com/',
     redirectUri: 'api/redirect',
     policy: ''
    },
    btc: {
     tenantId: 'toolwise.onmicrosoft.com',
     clientId: 'c34f1634-092c-476e-baa9-29e429717879',
     instance: 'https://login.microsoftonline.com/',
     redirectUri: 'api/redirect',
     resource: 'https://graph.windows.net/',
     policy: 'B2C_1_FirstTest'
    }
  },
  google: {
    notifications: {
      senderId: '459661466842'
    }
  },
  facebook: {},
  apple: {
    clientId: 'com.onmicrosoft.YESPrepPublicSchoolsB2C',
    scopes: 'name email',
    redirectUri: 'api/redirect',
    state: '32678d07-070b-4fe5-83ce-19b662901faa'
  },
  storesUrls: {
    android: 'https://play.google.com/store/apps/details?id=org.yesprep.familyengagementapp',
    ios: 'https://apps.apple.com/us/app/yes-prep-family-portal-mobile/id1516887587'
  }
};
/*
* For easier debugging in development mode, you can import the following file
* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
*
* This import should be commented out in production mode because it will have a negative impact
* on performance if an error is thrown.
*/
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.