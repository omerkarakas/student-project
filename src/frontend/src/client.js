import fetch from 'unfetch';

export const getAllStudents = async () => {
  try {
    const response = await fetch('api/v1/students');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return 'Error';
  }
};
//
//const checkStatus = response => {
//    if (response.ok) {
//        return response;
//    }
//    // convert non-2xx HTTP responses into errors:
//    const error = new Error(response.statusText);
//    error.response = response;
//    return Promise.reject(error);
//}
//
//export const getAllStudents = () =>
//    fetch("api/v1/students")
//     .then(checkStatus);
