export interface ITelephoneType {
    shortDescription: string,
    telephoneNumberTypeId: number,
}

export class TelephoneType implements ITelephoneType {
    shortDescription: string;
    telephoneNumberTypeId: number;
}