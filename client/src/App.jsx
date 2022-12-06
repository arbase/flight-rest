import { useState, useEffect } from 'react';
import Select from 'react-select';

// import airports from '../data/airports.json';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const airportData = data?.filter((res) => res.type === 'airport');
  const airportDataChildren = data
    ?.map((res) => res.children)
    .filter((item) => item !== undefined)
    .flat();
  const allAirports =
    airportData && airportDataChildren
      ? [...airportData, ...airportDataChildren]
      : [];

  // Renamed key name of airportCode to value and airportName to label for react-select
  const options = allAirports?.map(
    ({ airportCode: value, airportName: label, cityName: city, ...rest }) => ({
      value,
      label: `${label}, ${city}`,
      ...rest,
    })
  );

  const generateRandomAirports = () => {
    const randomized = [];
    for (let i = 0; i < 10; i++) {
      randomized.push(
        options.filter((x) => x.countryName === 'Indonesia')[
          Math.round(Math.random() * 142)
        ]
      );
    }
    return randomized;
  };

  const randomAirports = generateRandomAirports();

  const API_URL =
    'https://gist.githubusercontent.com/arbase/c65f04d59bd771d5e54c948d27fabef1/raw/7737c405a3de74e4d308d13f47928f53998f28c2/airports.json';

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL);
      const responseData = await response.json();
      setData(responseData);
    })();
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      <Select
        options={options}
        className="basic-single"
        classNamePrefix="select"
        placeholder={'Departure Airport'}
        defaultValue={{ label: 'Afa iyah ini default', value: 'Btul' }}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            width: '500px',
            textAlign: 'start',
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
          }),
        }}
      />
      {/* <select autoComplete="on">
        {allAirports?.map((item) => (
          <option value={item.airportCode} key={item.id}>
            {item.airportName}
          </option>
        ))}
      </select> */}
      <h2>Random airports</h2>
      {randomAirports?.map((item) => (
        <p>{item?.label}</p>
      ))}
    </div>
  );
}

export default App;
