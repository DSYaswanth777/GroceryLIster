import React from "react";
import { Route, Routes } from "react-router-dom";
import GroceryTable from "./components/GroceryTable";
import SelectedItemsPage from "./components/SelectedItems";
import { GroceryProvider } from "./context/GroceryContext";
// import Table from "./components/Table";

const App = () => {
  return (
    <GroceryProvider>
      <Routes>
        <Route path="/" element={<GroceryTable />} />
        <Route path="/selected" element={<SelectedItemsPage />} />
        {/* <Route path="/new" element={<Table />} /> */}

      </Routes>
    </GroceryProvider>
  );
};

export default App;
