import * as Yup from 'yup';

import { EditUserSchema } from '../types';

export const validationEditUserSchema = Yup.object<EditUserSchema>().shape({
  displayName: Yup.string().min(3, 'Display name must be at least 3 characters long'),
  email: Yup.string().email('Invalid email format'),
  photoURL: Yup.string().url('Invalid URL format'),
});
