import { Injectable } from '@angular/core';

@Injectable()
export abstract class  ProviderServices {
    /** */
    abstract logIn();
    abstract logOut();
    abstract accessToken();
    abstract isAuthenticated();
}