import React, {createContext, useContext, useReducer} from 'react';

const initialState = {
  patientData: {
    patientIp: '',
    admissionNo: '',
    mlaCmrfNo: '',
  },
};

const SET_PATIENT_DATA = 'SET_PATIENT_DATA';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PATIENT_DATA:
      return {...state, patientData: action.payload};
    default:
      return state;
  }
};

const MyContext = createContext();

const useGlobalContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};

const GlobalContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPatientData = (patientData) => dispatch({type: SET_PATIENT_DATA, payload: patientData});

  const actions = {setPatientData};
  const value = {state, actions};

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export {GlobalContextProvider, useGlobalContext};
