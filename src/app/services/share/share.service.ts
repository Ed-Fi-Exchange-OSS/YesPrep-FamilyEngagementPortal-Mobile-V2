import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ShareService {
  private emitChangeTitleMenu = new Subject<any>();
  private emitChangeBackButton = new Subject<any>()
  private emitChangeNavBArChat = new Subject<any>();
  private emitChangeLanguageData = new Subject<any>();
  private emitChangeLanguageSelected = new Subject<any>();
  private emitChangeSessionExpired = new Subject<any>();
  private emitChangeUnreadMessages = new Subject<any>();
  private emitChangeLanguageUserProfile = new Subject<any>();
  public changeTitleMenuEmitted = this.emitChangeTitleMenu.asObservable();
  public changeBackButtonEmitted = this.emitChangeBackButton.asObservable();
  public changeNavBarEmitted = this.emitChangeNavBArChat.asObservable();
  public changeLanguageData = this.emitChangeLanguageData.asObservable();
  public changeLanguageSelected = this.emitChangeLanguageSelected.asObservable();
  public changeSessionExpired = this.emitChangeSessionExpired.asObservable();
  public changeUnreadMessages = this.emitChangeUnreadMessages.asObservable();
  public changeLanguageUserProfile = this.emitChangeLanguageUserProfile.asObservable();

  emitTitleMenu(change: any) {
      this.emitChangeTitleMenu.next(change);
  }

  emitBackButton(change: boolean, urlFrom: string, urlTo?: any) {
    this.emitChangeBackButton.next({ change: change, urlFrom: urlFrom, urlTo: urlTo });
  }

  emitNavBarChat(change: any) {
    this.emitChangeNavBArChat.next(change);
  }

  emitLanguageData(data:any) {
    this.emitChangeLanguageData.next(data);
  }

  emitLanguageSelected(data:any) {
    this.emitChangeLanguageSelected.next(data);
  }

  emitSessionExpired(change: boolean) {
    this.emitChangeSessionExpired.next(change);
  }

  emitUnreadMessage(change: any ) {
    this.emitChangeUnreadMessages.next(change);
  }

  emitUserProfileLanguageChange(change: any) {
    this.emitChangeLanguageUserProfile.next(change);
  }
}
