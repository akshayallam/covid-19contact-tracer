import React, { useEffect, useState } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {useHttpClient} from '../../shared/hooks/http-hook';
import '../pages/Users.css'

const Users = () => {
  const [cases, setCases] = useState();
  const [usa, setUSA] = useState();
  const [time, setTime] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const responseData = await sendRequest('https://corona.lmao.ninja/v2/states?sort');
        setCases(responseData);
        const usaData = await sendRequest('https://corona.lmao.ninja/v2/countries/USA');
        setUSA(usaData);
        setTime(new Date(usaData.updated).toLocaleString());
      } catch (err) {
      }
    }
    fetchCases();
  }, [sendRequest])

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      {isLoading && (<div className="center"><LoadingSpinner></LoadingSpinner></div>)}
      {!isLoading && cases && usa &&
        <div className="app-grid-container">
          <h5 className="grid-title">U.S. COVID-19 Cases <small>(Last Updated: {time} PST)</small></h5>
          <div id="menu" className="center">
            <ul>
              <li>{usa.cases.toLocaleString()} Total Cases</li>
              <li>{usa.deaths.toLocaleString()} Total Deaths</li>
              <li>{usa.todayCases.toLocaleString()} New Cases Today</li>
              <li>{usa.todayDeaths.toLocaleString()} Deaths Today</li>
            </ul> 
          </div>
          {
          cases.slice(0,51).map(state => (
          <div className="app-wrapper app-d" key={state.state}>
            <div className="app-content">
              <h5 className="app-name state">{state.state}</h5>
              <h5 className="app-name">{state.cases.toLocaleString()} Total Cases</h5>
              <h5 className="app-name">{state.deaths.toLocaleString()} Total Deaths</h5>
              <h5 className="app-name">{state.todayCases.toLocaleString()} New Cases Today</h5>
              <h5 className="app-name">{state.todayDeaths.toLocaleString()} Deaths Today</h5>
            </div>
          </div>
          ))
          }
        </div>
      }
    </React.Fragment>
  );
};

export default Users;
