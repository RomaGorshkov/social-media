import * as Yup from 'yup';

import { EditUserSchema } from '../types';

export const validationEditUserSchema = Yup.object<EditUserSchema>().shape({
  displayName: Yup.string().min(3, 'Display name must be at least 3 characters long'),
  email: Yup.string().email('Invalid email format'),
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number must be a valid international format')
    .required('Phone number is required'),
  photoURL: Yup.string().url('Invalid URL format'),
});
