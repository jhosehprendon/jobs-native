// import axios from 'axios'; 
// import qs from 'qs';
// // import { Location } from 'expo';
import JOB_DATA from './indeedJobData.json';

import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from './types';

// const JOB_ROOT_URL = 'https://jobs.github.com/positions.json?' 

// const JOB_QUERY_PARAMS = {
//     publisher: '4201738803816157',
//     format: 'json', 
//     v: '2',
//     latlong: 1,
//     radius: 10,
//     q: 'javascript'
// }

// const buildJobsUrl = (zip) => {
//     const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip })
//     return `${JOB_ROOT_URL}${query}`
// }

export const fetchJobs = (region, callback) => async (dispatch) => {
    try {
      //let zip = await reverseGeoCode(region);
      //const url = buildJobsUrl(zip);
      //let { data } = await axios.get(url);
      const data = JOB_DATA;
      //console.log(data);
      dispatch({ type: FETCH_JOBS, payload: data });
      callback();
    } catch (e) {
      console.log(e);
    }
  };

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  }
}

export const clearLikedJobs = () => {
  return {
    type: CLEAR_LIKED_JOBS
  }
}
