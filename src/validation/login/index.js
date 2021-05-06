import * as yup from 'yup';

export const loginSchema = () => {
  const isEmail = 'email must be a valid';
  const requiredEmail = 'email is required';
  const requiredPassword = 'password is required';

  return yup.object({
    email: yup.string().email(isEmail).required(requiredEmail),
    pwd: yup.string().required(requiredPassword),
  });
};
