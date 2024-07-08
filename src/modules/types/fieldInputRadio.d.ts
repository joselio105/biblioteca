import { ReactNode } from 'react'
import { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";

export type TSetValue = UseFormSetValue<Record<string, string>>;

export interface IFieldInputRadio {
  title: string;
  defaultValue: string;
  radios: IInptRadio[];
  errorMessage?: string;
  canRender?: boolean;
  register: UseFormRegisterReturn;
  setValue: TSetValue;
}

export interface IInptRadio {
  labelText: string;
  labelIcon?: ReactNode;
  value?: string;
}