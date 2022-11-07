import { Injectable } from '@angular/core';
declare var cordova: any;
@Injectable()
export class CommonService {
  private _model: any;
  constructor() { }

  public setShareModel (entry) : void {
    this._model = entry;
  }
  public getShareModel() {
    return this._model;

  }

  public NewGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }); 
  }

  public OpenUrlExtern(url) { 
    cordova.InAppBrowser.open(url, '_blank', 'location=no,clearcache=yes,zoom=no');
  }
}
