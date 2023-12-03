import { useRef, useState } from 'react';
import { DataType, FormFields, genderFields } from '../types/types';
import formSchema from '../utils/formSchema';
import { ValidationError } from 'yup';
import { toBase64 } from '../utils/imageTransform';
import { addUser } from '../store/Slices/formData.slice';
import { useAppDispatch } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const FirstForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const { countries } = useSelector((state: DataType) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    const data = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      image: imageRef.current?.files,
      country: countryRef.current?.value,
      gender: genderRef.current?.value,
      accept: acceptRef.current?.checked,
    };

    try {
      await formSchema.validate(data, { abortEarly: false });
      const image = await toBase64(data.image![0]);
      dispatch(addUser({ ...data, image }));
      setErrors([]);
      navigate('/');
    } catch (error) {
      setErrors((error as ValidationError).inner);
      console.log((error as ValidationError).inner);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} autoComplete="on">
      <label>
        <span>{FormFields.name}</span>
      </label>
      <input type="text" ref={nameRef} autoComplete="on" />
      {errors.length ? (
        <p style={{ color: 'red' }}>
          {errors.find((e) => e.path === FormFields.name)?.message}
        </p>
      ) : null}

      <label>
        <span>{FormFields.age}</span>
      </label>
      <input type="number" ref={ageRef} autoComplete="on" />
      {errors.length ? (
        <p style={{ color: 'red' }}>
          {errors.find((e) => e.path === FormFields.age)?.message}
        </p>
      ) : null}

      <label>
        <span>{FormFields.email}</span>
      </label>
      <input type="text" ref={emailRef} autoComplete="on" />
      {errors.length ? (
        <p style={{ color: 'red' }}>
          {errors.find((e) => e.path === FormFields.email)?.message}
        </p>
      ) : null}

      <label>
        <span>{FormFields.password}</span>
      </label>
      <input type="text" ref={passwordRef} autoComplete="on" />
      {errors.length ? (
        <p style={{ color: 'red' }}>
          {errors.find((e) => e.path === FormFields.password)?.message}
        </p>
      ) : null}

      <label>
        <span>{FormFields.confirmPassword}</span>
      </label>
      <input type="text" ref={confirmPasswordRef} autoComplete="on" />
      {errors.length ? (
        <p style={{ color: 'red' }}>
          {errors.find((e) => e.path === FormFields.confirmPassword)?.message}
        </p>
      ) : null}

      <label>
        <span>{FormFields.image}</span>
      </label>
      <input type="file" ref={imageRef} autoComplete="on" />
      {errors.length ? (
        <p style={{ color: 'red' }}>
          {errors.find((e) => e.path === FormFields.image)?.message}
        </p>
      ) : null}

      <label>
        <span>{FormFields.gender}</span>
      </label>
      <select ref={genderRef} autoComplete="on">
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
      {errors.length ? (
        <p style={{ color: 'red' }}>
          {errors.find((e) => e.path === FormFields.gender)?.message}
        </p>
      ) : null}

      <label>
        <span>{FormFields.country}</span>
      </label>
      <input
        type="search"
        list={FormFields.country}
        placeholder="Enter country.."
        autoComplete="on"
      />
      <datalist id={FormFields.country}>
        {countries.countries.map((el, index) => {
          return (
            <option key={index} value={el}>
              {el}
            </option>
          );
        })}
      </datalist>

      <label htmlFor={FormFields.accept}>
        <span>{FormFields.accept}</span>
      </label>
      <input
        name={FormFields.accept}
        type="checkbox"
        ref={acceptRef}
        autoComplete="on"
      />
      {errors.length ? (
        <p style={{ color: 'red' }}>
          {errors.find((e) => e.path === FormFields.accept)?.message}
        </p>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};
