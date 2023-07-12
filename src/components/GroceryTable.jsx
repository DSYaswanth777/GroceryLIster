import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { GroceryContext } from "../context/GroceryContext";
import { data } from "../../Data";

const GroceryTable = () => {
  const { selectedItems, handleSelectionChange, handleQuantityChange } =
    useContext(GroceryContext);
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    const updatedData = tableData.map((item) => {
      const selectedItem = selectedItems.find(
        (selected) => selected.id === item.id
      );
      if (selectedItem) {
        return { ...item, quantity: selectedItem.quantity };
      }
      return item;
    });
    setTableData(updatedData);
  }, [selectedItems]);

  const handleViewSelected = () => {
    navigate("/selected", { selectedItems });
  };

  const columns = [
    {
      name: "Name (English)",
      selector: "nameEnglish",
      sortable: true,
    },
    {
      name: "Name (Telugu)",
      selector: "nameTelugu",
      sortable: true,
    },
    {
      name: "Quantity",
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          <button
            className="btn btn-danger"
            onClick={() => handleQuantityChange(row.id, "-")}
          >
            -
          </button>
          <div className="bg-light p-2">{row.quantity} </div>
          <button
            className="btn btn-success"
            onClick={() => handleQuantityChange(row.id, "+")}
          >
            +
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <div
      className="text-center h-100 d-flex align-items-center justify-content-center react-data-table"
    >
      <div style={{ width:"auto" }}>
        <DataTable
          title="Grocery List"
          columns={columns}
          data={tableData}
          selectableRows
          onSelectedRowsChange={handleSelectionChange}
          pagination
        />
        <button onClick={handleViewSelected}>View Selected</button>
      </div>
    </div>
  );
};

export default GroceryTable;
