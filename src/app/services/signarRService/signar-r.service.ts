import { MeService } from './../me/me.service';
import { environment } from './../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

declare var $: any;
@Injectable()
export class SignarRService {
  messageReceived = new EventEmitter<any>();
  proxy: any;

  constructor(private me: MeService) { }

  public init(hubName) {
    const uniqueId = this.me.getBriefProfile().uniqueId;
    let connection = $.hubConnection(environment.api.apiEndpoint);
    connection.qs = { data: uniqueId };
    let proxy = connection.createHubProxy(hubName);

    return {
      on: (eventName, callback) => {
        proxy.on(eventName, (result) => {
          if (callback) {
            callback(result);
          }
        });
      },
      invoke: (methodName, model, callback) => {
        proxy.invoke(methodName, model)
          .done((result) => {
            if (callback) {
              callback(result);
            }
          });
      },
      start: () => {
        connection.start().done();
      }
    }
  }
}
