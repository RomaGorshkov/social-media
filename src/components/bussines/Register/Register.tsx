import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

import { setRegisterUser } from '../../../store/reducers/auth';
import { useAppDispatch } from '../../../store/storeHooks';
import { registerUser } from '../../../firebase/authUser';

import { AuthInput } from '../../../types';

import AuthLayout from '../../../layouts/AuthLayout/AuthLayout';
import CustomInput from '../../shared/CustomInput/CustomInput';

import { validationRegisterSchema } from '../../../yupSchemas/registerSchema';

import styles from './Register.module.scss';

const registerInputs: AuthInput[] = [
  { type: 'text', id: 'username', name: 'username', placeholder: 'Username' },
  { type: 'email', id: 'email', name: 'email', placeholder: 'Email' },
  { type: 'password', id: 'password', name: 'password', placeholder: 'Password' },
];

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationRegisterSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const userPayload = {
          username: values.username,
          email: values.email,
          password: values.password,
        };
        await registerUser(userPayload.username, userPayload.email, userPayload.password);
        dispatch(setRegisterUser(userPayload));
        navigate('/profile');
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/email-already-in-use') {
            setFieldError('email', 'This email is already in use.');
          } else {
            console.error('Firebase error:', error.message);
          }
        } else {
          console.error('Unknown error:', error);
        }
      }
    },
  });

  return (
    <AuthLayout title="Register">
      <form onSubmit={formik.handleSubmit} className={styles.registerContainer__form}>
        <div className={styles.registerContainer__formGroup}>
          {registerInputs.map(({ type, id, name, placeholder }) => (
            <CustomInput
              key={id}
              type={type}
              id={id}
              name={name}
              placeholder={placeholder}
              value={formik.values[name as keyof typeof formik.values]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors[name as keyof typeof formik.errors]}
              touched={formik.touched[name as keyof typeof formik.touched]}
            />
          ))}
        </div>
        <div className={styles.registerContainer__submitGroup}>
          <button type="submit" className={styles.registerContainer__submit}>
            Register
          </button>
        </div>
        <p className={styles.registerContainer__loginLink}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
