import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

import { AuthInput } from '../../../types';

import { useAppDispatch } from '../../../store/storeHooks';
import { loginUser } from '../../../firebase/authUser';
import { setLoginUser } from '../../../store/reducers/auth';
import { validationLoginSchema } from '../../../yupSchemas/loginSchema';

import AuthLayout from '../../../layouts/AuthLayout/AuthLayout';
import CustomInput from '../../shared/CustomInput/CustomInput';

import styles from './Login.module.scss';

const loginInputs: AuthInput[] = [
  { type: 'email', id: 'email', name: 'email', placeholder: 'Email address' },
  { type: 'password', id: 'password', name: 'password', placeholder: 'Password' },
];

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: validationLoginSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const user = await loginUser(values.email, values.password, values.rememberMe);
        dispatch(
          setLoginUser({
            email: user.email,
            displayName: user.displayName,
          }),
        );
        navigate('/profile');
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/invalid-credential') {
            setFieldError('password', 'Invalid credentials. Please try again.');
          }
        } else {
          console.error('Unknown error:', error);
        }
      }
    },
  });

  return (
    <AuthLayout title="Login">
      <form onSubmit={formik.handleSubmit} className={styles.loginContainer__form}>
        {loginInputs.map(({ type, id, name, placeholder }) => (
          <CustomInput
            key={id}
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={String(formik.values[name as keyof typeof formik.values])}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors[name as keyof typeof formik.errors]}
            touched={formik.touched[name as keyof typeof formik.touched]}
          />
        ))}
        <div className={styles.loginContainer__submitGroup}>
          <div className={styles.loginContainer__checkboxGroup}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
              name="rememberMe"
              className={styles.loginContainer__checkbox}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <button type="submit" className={styles.loginContainer__submit}>
            Login
          </button>
        </div>
        <p className={styles.loginContainer__registerLink}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
