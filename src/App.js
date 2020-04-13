import React, { useEffect, useState, useMemo } from 'react';
import TableContainer from './TableContainer';

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('https://randomuser.me/api/?results=100');
      const body = await response.json();
      const contacts = body.results;
      console.log(contacts);
      setData(contacts);
    };
    doFetch();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'name.title',
      },
      {
        Header: 'First Name',
        accessor: 'name.first',
      },
      {
        Header: 'Last Name',
        accessor: 'name.last',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'City',
        accessor: 'location.city',
      },
    ],
    []
  );

  return <TableContainer columns={columns} data={data} />;
};

export default App;
