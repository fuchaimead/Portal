import axios from 'axios';
import { setFlash } from './flash';

export const getSections = (course_id, callback) => {
  return(dispatch) => {
    axios.get(`/api/courses/${course_id}/sections`)
      .then( res => dispatch({ type: 'GET_SECTIONS', sections: res.data, headers: res.headers }))
      .then( callback() )
      .catch( err => {
        dispatch({ type: 'SET_HEADERS', headers: err.headers });
        dispatch(setFlash('Failed To Retrieve Sections', 'red'));
    });
  }
}

export const addSection = (title, courseId) => {
  return(dispatch) => {
    axios.post(`/api/courses/${courseId}/sections`, { title })
      .then( res => {
          dispatch({ type: 'ADD_SECTION', section: res.data, headers: res.headers })
      })
      .catch( err => {
          dispatch({ type: 'SET_HEADERS', headers: err.headers });
          dispatch(setFlash('Failed To Add Section', 'red'));
      });
  }
}

export const updateSection = (section) => {
  return(dispatch) => {
    axios.put(`/api/sections/${section.id}`, { section })
      .then( res => dispatch({ type: 'UPDATE_SECTION', section: res.data, headers: res.headers }))
      .catch( err => {
        dispatch({ type: 'SET_HEADERS', headers: err.headers });
        dispatch(setFlash('Failed To Update Section', 'red'));
    });
  }
}

export const deleteSection = (section) => {
  return(dispatch) => {
    axios.delete(`/api/sections/${section.id}`)
      .then( res => dispatch({ type: 'DELETE_SECTION', section, headers: res.headers }))
      .catch( err => {
        dispatch({ type: 'SET_HEADERS', headers: err.headers });
        dispatch(setFlash('Failed To Delete Section', 'red'));
    });
  }
}

export const toggleActiveSection = (id) => {
  return { type: 'TOGGLE_SECTION', id }
}
