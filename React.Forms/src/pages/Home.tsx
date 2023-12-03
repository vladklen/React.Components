import { useSelector } from 'react-redux';
import { DataType } from '../types/types';
import { IFormData } from '../store/Slices/formData.slice';
import { useEffect, useState } from 'react';

const Home = () => {
  const { form } = useSelector((state: DataType) => state);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const timer = setTimeout(() => setActive(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <h1>Main page</h1>
      {[...form].reverse().map((el: IFormData, index) => {
        return (
          <div key={index} className={index === 0 && active ? 'active' : ''}>
            {Object.entries(el).map(([key, value]) => {
              if (key === 'image') {
                return <img key={key} src={value} id="base64image" />;
              }
              if (key === 'accept') {
                return null;
              }
              return (
                <p key={key}>
                  {key}:{value}
                </p>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default Home;
