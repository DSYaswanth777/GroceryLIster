import React, { createContext, useEffect, useState } from "react";
export const GroceryContext = createContext();
export const GroceryProvider = ({ children }) => {
  const storedSelectedItems = localStorage.getItem("selectedItems");
  const [selectedItems, setSelectedItems] = useState(
    storedSelectedItems ? JSON.parse(storedSelectedItems) : []
  );
  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handleSelectionChange = (rows) => {
    setSelectedItems(rows.selectedRows);
  };

  const handleQuantityChange = (itemId, action) => {
    setSelectedItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === itemId) {
          let newQuantity = parseInt(item.quantity);
          if (action === "+") {
            newQuantity += 50;
          } else if (action === "-") {
            newQuantity = Math.max(newQuantity - 50, 0);
          }
          return { ...item, quantity: `${newQuantity}gm` };
        }
        return item;
      });
      return updatedItems;
    });
  };

  const handleDeleteItem = (itemId) => {
    setSelectedItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      return updatedItems;
    });
  };

  const contextValue = {
    selectedItems,
    handleSelectionChange,
    handleQuantityChange,
    handleDeleteItem,
  };

  return (
    <GroceryContext.Provider value={contextValue}>
      {children}
    </GroceryContext.Provider>
  );
};
