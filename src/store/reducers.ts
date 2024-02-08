import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { AppDispatch } from ".";
import { CityData, WeatherData,  } from "./types";

export interface CounterState {
  weatherData: CityData[] | [];
  weatherInitialData:WeatherData|null
}

const initialState: CounterState = {
  weatherData: [],
  weatherInitialData:null
};

export const counterSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.weatherData = action.payload;
    },
    setInitialData:(state, action)=> {
      state.weatherInitialData = action.payload;
      
    }
  },
});
export const { setData,setInitialData } = counterSlice.actions;

export const getData = (query:string) => async (dispatch:AppDispatch) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=85c9a5b8c5e1140a5e2824e00c0a7df3`
    );
    dispatch(setData(response.data)); 
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

export const getInitialData = (lat:string, lon:string) => async (dispatch:AppDispatch) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&&appid=4f854dff31c2e1ca2516bffdbe8c42c1`
    );
    dispatch(setInitialData(response.data)); 

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};



export default counterSlice.reducer;
