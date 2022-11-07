import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class ConfirmationService {
    private confirmedSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor() { } 

    public confirmed(value: any): void {
        this.confirmedSubject.next(value);
    }

    public getBehaviorSubject(): BehaviorSubject<any> {
        return this.confirmedSubject;
    }
}