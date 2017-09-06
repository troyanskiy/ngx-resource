export enum TGetParamsMappingType {
  Plain,
  Bracket,
  JQueryParamsBracket
}

export class ResourceGlobalConfig {
  static url: string | Promise<string> = null;
  static path: string | Promise<string> = null;
  static headers: any | Promise<any> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  static params: any | Promise<any> = null;
  static data: any | Promise<any> = null;

  static add2Provides: boolean = null;

  static lean: boolean = null;

  static toPromise: boolean = null;
  static toObservable: boolean = null;

  static getParamsMappingType: any = TGetParamsMappingType.Plain;
}
