import * as yup from 'yup';

export const professorValidationSchema = yup.object().shape({
  activity: yup.string().required(),
  user_id: yup.string().nullable(),
});
