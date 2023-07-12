import React, { useContext } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";

// Import the Telugu font
import TeluguFont from "../assets/dhurjati.otf";
import { GroceryContext } from "../context/GroceryContext";

import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { SlClose } from "react-icons/sl";
import DataTable from "react-data-table-component";
// Register the Telugu font
Font.register({ family: "TeluguFont", src: TeluguFont });

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "TeluguFont",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  itemName: {
    flexGrow: 1,
    marginRight: 10,
    fontFamily: "TeluguFont", // Set the font family
  },
  itemQuantity: {
    flexShrink: 0,
  },
});

const SelectedItems = () => {
  const { selectedItems, handleQuantityChange, handleDeleteItem } =
    useContext(GroceryContext);

  const generatePDF = () => {
    const MyDocument = () => (
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>సరుకుల వివరాలు</Text>
            <View style={styles.item}>
              <Text style={styles.itemName}>Name</Text>
              <Text style={styles.itemQuantity}>Quantity</Text>
            </View>
            {selectedItems?.map((item) => {
              const teluguName = item.nameTelugu.split("(")[0].trim();
              return (
                <View key={item.id} style={styles.item}>
                  <Text style={styles.itemName}>{teluguName}</Text>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                </View>
              );
            })}
          </View>
        </Page>
      </Document>
    );

    return (
      <div className="text-white">
        <PDFDownloadLink document={<MyDocument />} fileName="grocery_list.pdf">
          {({ loading }) => (loading ? "Loading..." : "Get Your List")}
        </PDFDownloadLink>
      </div>
    );
  };
  const handleDelete = (itemId) => {
    handleDeleteItem(itemId);
  };
  const columns = [
    {
      name: "Name",
      selector: "name",
      cell: (row) => row.name,
    },
    {
      name: "Quantity",
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div className="" onClick={() => handleQuantityChange(row.id, "-")}>
            <FaMinusSquare size={15} />
          </div>
          <div className="">{row.quantity} </div>
          <div className="" onClick={() => handleQuantityChange(row.id, "+")}>
            <FaPlusSquare size={15} />
          </div>
          <div
            className="px-1 text-danger"
            onClick={() => handleDelete(row.id)}
          >
            {" "}
            <SlClose />
          </div>
        </div>
      ),
      sortable: false,
    },
  ];
  const data = selectedItems.map((item) => ({
    name: item.nameTelugu.split("(")[0].trim(),
    quantity: item.quantity,
    id: item.id,
  }));
  console.log(data);
  return (
    <div className="text-center">
      <h4 className="text-center pt-5">Selected Items</h4>
      <div className="container pb-3">
        <DataTable
          columns={columns}
          data={data}
          highlightOnHover
          striped
          dense
          defaultSortField="name"
          // pagination
          fixedHeader
          fixedHeaderScrollHeight="500px"
        />
      </div>
      <button className="btn btn-light text-white">{generatePDF()}</button>
    </div>
  );
};

export default SelectedItems;
