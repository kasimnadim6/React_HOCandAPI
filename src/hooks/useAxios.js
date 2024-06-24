import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { get } from 'lodash';

const useAxios = ({
  filterParams,
  url,
  method,
  data = null,
  headers = null,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState([]);

  const invokeAPI = useCallback(() => {
    axios({
      url,
      method,
      headers,
      data,
    })
      .then((res) => {
        setResponse(res);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [data, headers, method, url]);

  const preparedData = ({ year, customerName = '' }) => {
    return (missions = []) => {
      const filteredMissions = missions.reduce((acc, mission) => {
        if (+year === +mission.launch_year) {
          const payloads = get(mission, 'rocket.second_stage.payloads', []);
          payloads.forEach((payload) => {
            if (payload.customers.includes(customerName)) {
              acc.push({
                flight_number: mission.flight_number,
                mission_name: mission.mission_name,
                payloads_count: mission.payloads_count++ || 1,
              });
            }
          });
        }
        return acc;
      }, []);
      filteredMissions.sort(
        (a, b) => get(b, 'payloads_count') - get(a, 'payloads_count')
      );
      return filteredMissions;
    };
  };

  useEffect(() => {
    invokeAPI();
  }, [invokeAPI, data, headers, method, url]);

  return {
    loading,
    error,
    response,
    data: preparedData(filterParams)(get(response, 'data.missions', [])),
  };
};

export default useAxios;
