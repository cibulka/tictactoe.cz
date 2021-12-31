import { ValidationRule } from 'react-hook-form';

export interface InputValidation {
  validate?: {
    [type: string]: (value: string) => boolean;
  };
}

export interface InputTextValidation extends InputValidation {
  maxLength?: number;
  minLength?: number;
  pattern?: ValidationRule<RegExp>;
  required?: boolean;
}

export interface InputNumberValidation extends InputValidation {
  max?: number;
  min?: number;
  required?: boolean;
}
