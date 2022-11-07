export interface ITelephone {
    primaryMethodOfContact: boolean,
    smsDomain: any,
    telephoneCarrierTypeId: number,
    telephoneNumber: string,
    telephoneNumberTypeId: number
    textMessageCapabilityIndicator: boolean,
    editable: boolean;
}

export class TelephoneModel implements ITelephone {
    primaryMethodOfContact: boolean;
    smsDomain: any;
    telephoneCarrierTypeId: number;
    telephoneNumber: string;
    telephoneNumberTypeId: number;
    textMessageCapabilityIndicator: boolean;
    editable: boolean;
}