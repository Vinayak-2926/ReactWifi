import React, { useEffect, useState } from 'react';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  const [data, setData] = useState([]);
  const [fetchData, setFetchData] = useState(false);

  function handleFetchClick() {
    setFetchData(true);
  }

  function ApiCall() {
    useEffect(() => {
      if (fetchData) {
        fetch('https://data.cityofnewyork.us/resource/varh-9tsp.json')
          .then(response => response.json())
          .then(data => {
            const filteredData = data.map(item => {
              const { postcode, provider, location, location_t } = item;
              return { postcode, provider, location, location_t };
            });
            setData(filteredData);
          })
          .catch(error => console.log(error));

        setFetchData(false);
      }
    }, [fetchData]);

    return (
      <div>
        <h1>API Data:</h1>
        <ul>
          {data.map(item => (
            <li key={item.id}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <Header title="Nearest WIFI!!" />
      <button onClick={handleFetchClick}>Fetch</button>
      <ApiCall />
    </div>
  );
}
