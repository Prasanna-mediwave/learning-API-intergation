import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import { ApiCallBack } from "./useContext/Context";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <ApiCallBack>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
          </Routes>
        </ApiCallBack>
      </BrowserRouter>
    </>
  );
};

export default App;
