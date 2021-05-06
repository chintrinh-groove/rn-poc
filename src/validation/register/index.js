import * as yup from 'yup';

export const registerSchema = () => {
  const requiredFullName = 'fullname is required';
  const isEmail = 'email must be a valid';
  const requiredEmail = 'email is required';
  const requiredPwd = 'new password is required';
  const matchedPwd = 'passwords must match';

  return yup.object({
    fullName: yup.string().required(requiredFullName),
    email: yup.string().email(isEmail).required(requiredEmail),
    pwd: yup.string().required(requiredPwd),
    confirmPwd: yup.string().oneOf([yup.ref('pwd'), null], matchedPwd),
  });
};
