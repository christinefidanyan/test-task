import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./containers/Header";
import Cards from "./containers/Cards";
import { TData } from "./containers/Cards/types";

const App = () => {
  const [originalData, setOriginalData] = useState<TData[]>([]);
  const [filteredData, setFilteredData] = useState<TData[]>([]);

  useEffect(() => {
    axios
      .get("https://cloud.codesupply.co/endpoint/react/data.json")
      .then((res) => {
        setOriginalData(res.data);
        setFilteredData(res.data);
      });
  }, []);

  return (
    <div>
      <Header originalData={originalData} setFilteredData={setFilteredData} />
      <Cards data={filteredData} />
    </div>
  );
};

export default App;
