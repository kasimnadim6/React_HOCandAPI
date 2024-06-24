import useAxios from './hooks/useAxios';
import PropTypes from 'prop-types';

const RocketList = ({ filterParams }) => {
  const { loading, error, data } = useAxios({
    filterParams,
    url: 'https://run.mocky.io/v3/0dc4491d-eaa6-4f6a-9153-91c61a224bad',
    method: 'GET',
  });

  //   useEffect(() => {
  //     // if (get(response, 'data.missions', []).length) {
  //     //   const data = getFilteredMissions(response.data.missions);
  //     //   console.log(data);
  //     //   //   setData(data);
  //     // }
  //   }, [response, data]);

  return (
    <div>
      {loading && <p>Loading....</p>}
      {error && <p>Unable to Load Data. Something went wrong!</p>}
      {!loading && !data.length && <p>No Data Found</p>}
      {data.map((_) => (
        <p
          key={_.flight_number}
        >{`#${_.flight_number} ${_.mission_name} (${_.payloads_count}) `}</p>
      ))}
    </div>
  );
};

RocketList.propTypes = {
  filterParams: PropTypes.object.isRequired,
};

export default RocketList;
