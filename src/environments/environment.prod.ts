export const environment = {
  production: true,
  isMovile: true,
  api: {
    rootApiUrl: "/api",
    key: "",
    secret: "",
    apiEndpoint: 'http://localhost/Student1.ParentPortal.Web/'
  },
  azureAd: {
    mode: 'B2B',
    b2b: {
      tenantId: 'toolwise.onmicrosoft.com',
      clientId: 'c34f1634-092c-476e-baa9-29e429717879',
      instance: 'https://login.microsoftonline.com/',
      redirectUri: 'api/redirect',
      resource: 'https://graph.windows.net/',
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
  version: 'v1.0.0'
};