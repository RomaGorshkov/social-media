import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { validationEditUserSchema } from '../../../yupSchemas/editUserSchema';
import { useAppSelector } from '../../../store/storeHooks';
import { UserInputs } from '../../../types';
import CustomInput from '../../shared/CustomInput/CustomInput';

import styles from './EditProfile.module.scss';

const editProfileInputs: UserInputs[] = [
  { type: 'text', id: 'displayName', name: 'Display Name', placeholder: 'Enter your new display name' },
  { type: 'email', id: 'email', name: 'Email', placeholder: 'Enter your new email' },
  { type: 'tel', id: 'phoneNumber', name: 'Phone Number', placeholder: 'Enter your new phone number' },
];

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      displayName: user?.displayName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      photoURL: user?.photoURL || '',
    },
    validationSchema: validationEditUserSchema,
    onSubmit: async (values, { setFieldError }) => {
      navigate('/profile');
    },
  });

  return (
    <div className={styles.editProfile}>
      <h2 className={styles.editProfile__title}>Edit Profile</h2>
      <form onSubmit={formik.handleSubmit} className={styles.editProfile__form}>
        {user?.photoURL ? (
          <img src={user.photoURL} alt="User Avatar" className={styles.editProfile__avatar} />
        ) : (
          <div className={styles.editProfile__avatarPlaceholder}>{user?.displayName ? user.displayName[0] : 'U'}</div>
        )}
        {editProfileInputs.map(({ type, id, name, placeholder }) => (
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
        <div className={styles.editProfile__submitGroup}>
          <button type="button" className={styles.editProfile__cancelButton} onClick={() => navigate('/profile')}>
            Cancel
          </button>
          <button
            type="submit"
            className={styles.editProfile__submitButton}
            disabled={!formik.isValid || !formik.dirty}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
