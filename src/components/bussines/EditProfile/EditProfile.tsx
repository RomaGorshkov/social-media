import React from 'react';
import { useFormik } from 'formik';

import { validationEditUserSchema } from '../../../yupSchemas/editUserSchema';
import { updateUserProfile } from '../../../store/slices/updateUserProfileSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { userProfileUpdated } from '../../../store/reducers/auth';
import { UserInputs } from '../../../types';
import CustomInput from '../../shared/CustomInput/CustomInput';

import styles from './EditProfile.module.scss';

const editProfileInputs: UserInputs[] = [
  { type: 'text', id: 'displayName', name: 'displayName', placeholder: 'Enter your new display name' },
  { type: 'email', id: 'email', name: 'email', placeholder: 'Enter your new email' },
  { type: 'password', id: 'password', name: 'currentPassword', placeholder: 'Confirm your password' },
];

interface EditProfileProps {
  changeEditMode: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ changeEditMode }) => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      displayName: user?.displayName || '',
      email: user?.email || '',
      photoURL: user?.photoURL || '',
      currentPassword: '',
    },
    validationSchema: validationEditUserSchema,
    onSubmit: async (values, { setFieldError, resetForm }) => {
      try {
        const action = await dispatch(updateUserProfile(values));

        if (updateUserProfile.rejected.match(action)) {
          const { code, message } = action.error;

          switch (code) {
            case 'auth/invalid-credential':
              setFieldError('currentPassword', 'Wrong password. Please try again.');
              break;
            case 'auth/missing-password':
              setFieldError('currentPassword', 'Current password is required.');
              break;
            default:
              alert(message || 'An unknown error occurred. Please try again.');
          }
          return;
        }

        const result = action.payload;

        dispatch(userProfileUpdated(result));
        resetForm({
          values: {
            displayName: result.displayName,
            email: result.email,
            photoURL: result.photoURL,
            currentPassword: '',
          },
        });

        changeEditMode();
      } catch (err) {
        console.error('Unknown error:', err);
        alert('Unknown error. Please try again.');
      }
    },
  });

  return (
    <div className={styles.editProfile}>
      <h2 className={styles.editProfile__title}>Edit Profile</h2>
      <form onSubmit={formik.handleSubmit} className={styles.editProfile__form}>
        {user?.photoURL ? (
          <img src={user.photoURL} alt="User Avatar" className={styles.editProfile__avatar} />
        ) : (
          <div className={styles.editProfile__avatarPlaceholder}>{user?.displayName ? user.displayName?.[0] : 'U'}</div>
        )}
        <h2 className={styles.editProfile__name}>{user?.displayName}</h2>
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
          <button type="button" className={styles.editProfile__cancelButton} onClick={changeEditMode}>
            Cancel
          </button>
          <button
            type="submit"
            className={styles.editProfile__submitButton}
            disabled={!formik.isValid || !formik.dirty || isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
