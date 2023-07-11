import React from "react";
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
import { useSelector } from "react-redux";

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
  const selectedItems= useSelector((state) => state.selectedItems.selectedItems); // Get the selectedItems object from the Redux store, or an empty object if it doesn't exist
  const generatePDF = () => {
    const MyDocument = () => (
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>Selected Items</Text>
            {selectedItems.map((item) => {
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
          {selectedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.nameTelugu.split("(")[0].trim()}</td>
              <td>{item.quantity}</td>
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
