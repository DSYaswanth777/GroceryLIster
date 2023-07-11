import React from "react";
import { Route, Routes } from "react-router-dom";
import GroceryTable from "./components/GroceryTable";
import SelectedItemsPage from "./components/SelectedItems";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<GroceryTable/>} />
      <Route path="/selected" element={<SelectedItemsPage/>} />
    </Routes>
  );
};

export default App;
