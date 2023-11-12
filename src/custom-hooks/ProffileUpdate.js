import { auth } from '../firebase.config';

export const updateProfile = async (displayName, email, password) => {
  const user = auth.currentUser;
  if (displayName) {
    await user.updateProfile({ displayName });
  }

  if (email !== user.email) {
    await user.updateEmail(email);
  }

  if (password) {
    await user.updatePassword(password);
  }
};






