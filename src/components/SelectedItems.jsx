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
import TeluguFont from "../assets/dhurjati.ttf";
import { GroceryContext } from "../context/GroceryContext";

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
            <Text style={styles.heading}>Selected Items</Text>
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
      <PDFDownloadLink document={<MyDocument />} fileName="grocery_list.pdf">
        {({ loading }) => (loading ? "Loading..." : "Generate PDF")}
      </PDFDownloadLink>
    );
  };
  const handleDelete = (itemId) => {
    handleDeleteItem(itemId);
  };
  return (
    <div>
      <h2>Selected Items</h2>
      <table>
        <thead>
          <tr>
            <th>Name (Telugu)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems?.map((item) => (
            <tr key={item.id}>
              <td>{item.nameTelugu.split("(")[0].trim()}</td>
              <td>{item.quantity}</td>
              <td>
                {" "}
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleQuantityChange(item.id, "-")}
                  >
                    -
                  </button>
                  <div className="bg-light p-2">{item.quantity} </div>
                  <button
                    className="btn btn-success"
                    onClick={() => handleQuantityChange(item.id, "+")}
                  >
                    +
                  </button>
                  <div
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    &#x2715;
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Generate PDF</h2>
      {generatePDF()}
    </div>
  );
};

export default SelectedItems;
