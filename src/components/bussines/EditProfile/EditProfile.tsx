import React from 'react';
import { useFormik } from 'formik';

import { validationEditUserSchema } from '../../../yupSchemas/editUserSchema';
import { updateUserProfile } from '../../../store/slices/updateUserProfileSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { UserInputs } from '../../../types';
import CustomInput from '../../shared/CustomInput/CustomInput';

import styles from './EditProfile.module.scss';

const editProfileInputs: UserInputs[] = [
  { type: 'text', id: 'displayName', name: 'displayName', placeholder: 'Enter your new display name' },
  { type: 'email', id: 'email', name: 'email', placeholder: 'Enter your new email' },
];

interface EditProfileProps {
  changeEditMode: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ changeEditMode }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      photoURL: '',
    },
    validationSchema: validationEditUserSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const updatedUser = {
          displayName: values.displayName,
          email: values.email,
          photoURL: values.photoURL,
        };
        await dispatch(updateUserProfile(updatedUser)).unwrap();
        console.log('User profile updated successfully:', updatedUser);
      } catch (error) {
        setFieldError('email', 'Failed to update email. Please try again.');
        console.error('Error updating user profile:', error);
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
          <div className={styles.editProfile__avatarPlaceholder}>{user?.displayName ? user.displayName[0] : 'U'}</div>
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
