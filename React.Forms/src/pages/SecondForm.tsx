import { yupResolver } from '@hookform/resolvers/yup';
import formSchema from '../utils/formSchema';
import { useForm } from 'react-hook-form';
import { DataType, FormFields, genderFields } from '../types/types';
import { IFormData, addUser } from '../store/Slices/formData.slice';
import { toBase64 } from '../utils/imageTransform';
import { useAppDispatch } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const SecondForm = () => {
  const { countries } = useSelector((state: DataType) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });
  const onSubmit = async (
    data: Omit<IFormData, 'image'> & { image: FileList }
  ) => {
    const image = await toBase64(data.image![0]);
    dispatch(addUser({ ...data, image }));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor={FormFields.name}>{FormFields.name}</label>
      <input {...register('name')} />
      {errors.name ? <p>{errors.name.message}</p> : null}

      <label htmlFor={FormFields.age}>{FormFields.age}</label>
      <input {...register('age')} />
      {errors.age ? <p>{errors.age.message}</p> : null}

      <label htmlFor={FormFields.email}>{FormFields.email}</label>
      <input {...register('email')} />
      {errors.email ? <p>{errors.email.message}</p> : null}

      <label htmlFor={FormFields.password}>{FormFields.password}</label>
      <input {...register('password')} />
      {errors.password ? <p>{errors.password.message}</p> : null}

      <label htmlFor={FormFields.confirmPassword}>
        {FormFields.confirmPassword}
      </label>
      <input {...register('confirmPassword')} />
      {errors.confirmPassword ? <p>{errors.confirmPassword.message}</p> : null}

      <label htmlFor={FormFields.image}>{FormFields.image}</label>
      <input type="file" {...register('image')} />
      {errors.image ? <p>{errors.image.message}</p> : null}

      <label htmlFor={FormFields.gender}>{FormFields.gender}</label>
      <select {...register('gender')}>
        {(Object.keys(genderFields) as Array<keyof typeof genderFields>).map(
          (key, index) => {
            return (
              <option key={index} value={genderFields[key]}>
                {genderFields[key]}
              </option>
            );
          }
        )}
      </select>
      {errors.gender ? <p>{errors.gender.message}</p> : null}

      <label htmlFor={FormFields.country}>{FormFields.country}</label>
      <input
        type="search"
        list={FormFields.country}
        placeholder="Enter country.."
        autoComplete="on"
      />
      <datalist id={FormFields.country} {...register('country')}>
        {countries.countries.map((el, index) => {
          return (
            <option key={index} value={el}>
              {el}
            </option>
          );
        })}
      </datalist>
      {errors.country ? <p>{errors.country.message}</p> : null}

      <label htmlFor={FormFields.accept}>{FormFields.accept}</label>
      <input type="checkbox" {...register('accept')} />
      {errors.accept ? <p>{errors.accept.message}</p> : null}

      <button type="submit">Submit</button>
    </form>
  );
};
