import * as yup from 'yup';

const REGEXP_NAME = /^[A-Z]/;
const REGEXP_NUMBER = /[0-9]/;
const REGEXP_UPPERCASE = /[A-Z]/;
const REGEXP_LOWERCASE = /[a-z]/;
const REGEXP_CHARACTER = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
const IMAGE_SIZE = 1100000;

const formSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Required field')
    .min(2, 'Length should be more than 2 letters')
    .matches(REGEXP_NAME, 'First letter should be capital'),
  age: yup
    .string()
    .required('Required field')
    .test({
      test(value, ctx) {
        if (isNaN(+value)) {
          return ctx.createError({
            message: 'Should be a  number',
          });
        }
        if (+value <= 0) {
          return ctx.createError({
            message: 'Should be a positive number',
          });
        }
        return true;
      },
    }),
  email: yup.string().email().required('Required field'),
  password: yup
    .string()
    .required('Required field')
    .test({
      test(value, ctx) {
        if (!REGEXP_NUMBER.test(value)) {
          return ctx.createError({
            message: 'Should contain at least one number',
          });
        }
        if (!REGEXP_UPPERCASE.test(value)) {
          return ctx.createError({
            message: 'Should contain at least one uppercase letter',
          });
        }
        if (!REGEXP_LOWERCASE.test(value)) {
          return ctx.createError({
            message: 'Should contain at least one lowercase letter',
          });
        }
        if (!REGEXP_CHARACTER.test(value)) {
          return ctx.createError({
            message: 'Should contain at least one special symbol',
          });
        }
        return true;
      },
    }),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  image: yup
    .mixed<FileList>()
    .required('Required field')
    .test({
      test(value, ctx) {
        if (!value['0']) {
          return ctx.createError({
            message: 'Plz download file',
          });
        }
        const { name, size } = value['0'];
        if (!['png', 'jpeg'].includes(String(name.split('.').at(-1)))) {
          return ctx.createError({
            message: 'Format should be PNG or JPEG',
          });
        }
        if (size > IMAGE_SIZE) {
          return ctx.createError({
            message: 'Should be less then 1MB',
          });
        }
        return true;
      },
    }),
  country: yup.string().required('Required field'),
  gender: yup.string().required('Required field'),
  accept: yup
    .boolean()
    .required('Required field')
    .oneOf([true], 'You must accept the terms and conditions'),
});

export default formSchema;
