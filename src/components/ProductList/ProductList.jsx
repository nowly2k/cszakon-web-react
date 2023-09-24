import React, { useState, useCallback, useEffect } from "react";
import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";

// Массив с продуктами, нужно будет перенести в БД и получать с бекенда
const products = [
  {
    id: "1",
    image: "../../../public/img/коврик.jpg",
    title: "Коврик для мыши",
    price: 1000,
    description: "Размер: 450x350mm",
  },
  {
    id: "2",
    title: "USP-S | Предатель",
    price: 1500,
    description: "После полевых испытаний",
  },
  {
    id: "3",
    title: "AWP | Мортис",
    price: 250,
    description: "После полевых испытаний",
  },
];
// Массив с продуктами, нужно будет перенести в БД и получать с бекенда

const getTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

function ProductList() {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, []);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <div className="list">
      {products.map((item) => (
        <ProductItem product={item} onAdd={onAdd} className={"item"} />
      ))}
    </div>
  );
}

export default ProductList;
