export interface IData {
    [key: string]: File | string | null | boolean | number;
  }
  
  export interface IQueryString {
    [key: string]: string | number;
  }
  
  export interface OnChangeHandler {
    (e: any): void;
  }
  
  export interface IDeleteData {
    controller: string;
    message: string;
    backToOnNo: string;
    backToOnYes: string;
    id: string;
  }

  export type TLanguage = 'pt' | 'en' | 'es'