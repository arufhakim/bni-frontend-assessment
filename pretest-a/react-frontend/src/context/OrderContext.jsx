import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [fleets, setFleets] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [distance, setDistance] = useState("");
  const [range, setRange] = useState(0);
  const [orderDetail, setOrderDetail] = useState({
    pickup: "",
    destination: "",
    type: "",
    price: 0,
    orderId: 0,
    date: Date.now(),
    name: "",
    license: "",
    brand: "",
    rating: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [point, setPoint] = useState({ pickup: "", destination: "" });

  const [selectDirection, setSelectDirection] = useState(false);
  const [selectFleet, setSelectFleet] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/drivers")
      .then((res) => {
        setDrivers([...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const text = distance.split(" ");
    setRange(parseFloat(text[0]));
  }, [distance]);

  useEffect(() => {
    if (isFinish) {
      axios
        .post("http://localhost:3000/orders", orderDetail)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isFinish]);

  const handleOrder = () => {
    const index = Math.floor(Math.random() * drivers.length);
    const orderId = parseInt(Math.random() * 1000000000, 10);
    setOrderDetail({
      ...orderDetail,
      orderId,
      pickup: point.pickup,
      destination: point.destination,
      name: drivers[index].name,
      license: drivers[index].license,
      brand: drivers[index].brand,
      rating: drivers[index].rating,
    });
    setIsLoading(false);
  };

  const values = {
    fleets,
    point,
    setPoint,
    setFleets,
    selectDirection,
    setSelectDirection,
    range,
    setRange,
    distance,
    setDistance,
    orderDetail,
    setOrderDetail,
    selectFleet,
    setSelectFleet,
    isOrder,
    setIsOrder,
    handleOrder,
    isFinish,
    setIsFinish,
    isLoading,
    setIsLoading,
  };

  return (
    <OrderContext.Provider value={values}>{children}</OrderContext.Provider>
  );
};
