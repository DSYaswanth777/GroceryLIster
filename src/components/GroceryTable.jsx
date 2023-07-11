import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSelectedItems } from "../redux/Actions";
const GroceryTable = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelectionChange = (state) => {
    const selectedRows = state.selectedRows;
    dispatch(updateSelectedItems(selectedRows));
  };
  const handleQuantityChange = (itemId, quantity) => {
    // const updatedItems = selectedItems.map((item) => {
    //   if (item.id === itemId) {
    //     return { ...item, quantity };
    //   }
    //   return item;
    // });
    dispatch(updateSelectedItems(itemId, quantity));
  };
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
        <select
          onChange={(e) => handleQuantityChange(row.id, e.target.value)}
          defaultValue="25gm"
        >
          <option value="25gm">25gm</option>
          <option value="50gm">50gm</option>
          <option value="100gm">100gm</option>
          <option value="250gm">250gm</option>
          <option value="500gm">500gm</option>
          <option value="1kg">1kg</option>
          <option value="2kg">2kg</option>
          <option value="3kg">3kg</option>
          <option value="4kg">4kg</option>
          <option value="5kg">5kg</option>
        </select>
      ),
      sortable: false,
    },
  ];

  const data = [
    {
      id: 1,
      image: "image_url_1",
      nameEnglish: "Black Urad Dal",
      nameTelugu: "పొట్టు మినపప్పు (Pottu Minapappu)",
      quantity: "25gm",
    },
    {
      id: 2,
      image: "image_url_2",
      nameEnglish: "Urad Dal",
      nameTelugu: "మినపగుళ్ళు (Minapagullu)",
      quantity: "25gm",
    },
    {
      id: 3,
      image: "image_url_3",
      nameEnglish: "Urad Dal Split",
      nameTelugu: "సాయి మినపప్పు (Sai Minapappu)",
      quantity: "25gm",
    },
    {
      id: 4,
      image: "image_url_4",
      nameEnglish: "Toor Dal",
      nameTelugu: "కందిపప్పు (Kandhipappu)",
      quantity: "25gm",
    },
    {
      id: 5,
      image: "image_url_5",
      nameEnglish: "Red Gram",
      nameTelugu: "ఎర్ర కందిపప్పు (Erra Kandhipappu)",
      quantity: "25gm",
    },
    {
      id: 6,
      image: "image_url_6",
      nameEnglish: "Green Moong Dal",
      nameTelugu: "పచ్చ పెసలు (Pacha Pesalu)",
      quantity: "25gm",
    },
    {
      id: 7,
      image: "image_url_7",
      nameEnglish: "Black Moong Dal",
      nameTelugu: "నల్ల పెసలు (Nalla Pesalu)",
      quantity: "25gm",
    },
    {
      id: 8,
      image: "image_url_8",
      nameEnglish: "Moong Dal Split",
      nameTelugu: "సాయి పెసర పప్పు (Sai Pesara Pappu)",
      quantity: "25gm",
    },
    {
      id: 9,
      image: "image_url_9",
      nameEnglish: "Bengal Gram",
      nameTelugu: "శనగలు (Senagalu)",
      quantity: "25gm",
    },
    {
      id: 10,
      image: "image_url_10",
      nameEnglish: "Bengal Gram Split",
      nameTelugu: "పచ్చి సెనగపప్పు (Pachi Sengapappu)",
      quantity: "25gm",
    },
    {
      id: 11,
      image: "image_url_11",
      nameEnglish: "Chick Peas",
      nameTelugu: "కాబూలీ సెనగలు (Kabuli Senagalu)",
      quantity: "25gm",
    },
    {
      id: 12,
      image: "image_url_12",
      nameEnglish: "Tamarind",
      nameTelugu: "చింతపండు (Chintapandu)",
      quantity: "25gm",
    },
    {
      id: 13,
      image: "image_url_13",
      nameEnglish: "Red Chilli Powder",
      nameTelugu: "కారం (Karam)",
      quantity: "25gm",
    },
    {
      id: 14,
      image: "image_url_14",
      nameEnglish: "Turmeric",
      nameTelugu: "పసుపు (Pasupu)",
      quantity: "25gm",
    },
  ];

  return (
    <div>
      <DataTable
        title="Grocery List"
        columns={columns}
        data={data}
        selectableRows
        onSelectedRowsChange={handleSelectionChange}
        pagination
      />
      <button onClick={handleViewSelected}>View Selected</button>
    </div>
  );
};

export default GroceryTable;
