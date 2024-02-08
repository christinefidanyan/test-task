import { useEffect } from "react";

import Header from "./containers/Header";
import { getData } from "./store/reducers";
import MainPage from "./containers/MainPage";
import WarningModal from "./components/Modal";
import { weatherData } from "./store/selectors";
import { useAppDispatch, useAppSelector } from "./store";

import "./App.css";

const App = () => {
  const data = useAppSelector(weatherData);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(getData("Yerevan"));
  };

  useEffect(() => {
    dispatch(getData("Yerevan"));
  }, []);

  return (
    <div className="App">
      <Header />
      <MainPage />
      {!data.length && <WarningModal onClose={onClose} />}
    </div>
  );
};

export default App;
