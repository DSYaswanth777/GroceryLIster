import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { GroceryContext } from "../context/GroceryContext";
import { data } from "../../Data";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

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
      name: "Name",
      selector: (row) => row.nameTelugu.split("(")[0].trim(),
      sortable: true,
    },
    {
      name: "Quantity",
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center gap-2 ">
          <div className="" onClick={() => handleQuantityChange(row.id, "-")}>
            <FaMinusSquare size={15} />
          </div>
          <div className="">{row.quantity} </div>
          <div className="" onClick={() => handleQuantityChange(row.id, "+")}>
            <FaPlusSquare size={15} />
          </div>
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <div className="text-center d-flex align-items-center justify-content-center react-data-table container">
      <div style={{ width: "125%" }} className="">
        <DataTable
          title="Grocery List"
          columns={columns}
          data={tableData}
          selectableRows
          onSelectedRowsChange={handleSelectionChange}
          pagination
          highlightOnHover
          striped
          dense
          fixedHeader
          fixedHeaderScrollHeight="400px"
        />
        <div className="mt-3">

        <button onClick={handleViewSelected} className="bg-info text-white btn ">
          View Selected
        </button>
        </div>
      </div>
    </div>
  );
};

export default GroceryTable;
