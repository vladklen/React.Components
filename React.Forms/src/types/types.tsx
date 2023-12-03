import { ICountryData } from '../store/Slices/countryData.slice';
import { IFormData } from '../store/Slices/formData.slice';

export type DataType = {
  form: IFormData[];
  countries: ICountryData;
};

export enum FormFields {
  name = 'name',
  age = 'age',
  email = 'email',
  password = 'password',
  confirmPassword = 'confirmPassword',
  image = 'image',
  gender = 'gender',
  country = 'country',
  accept = 'accept',
}

export enum genderFields {
  male = 'male',
  female = 'female',
}

export const FieldsValidation = {
  [FormFields.name]: undefined,
};
