import { useContext } from "react";
import BottomBar from "../components/BottomBar";
import Fleet from "../components/Fleet";
import Map from "../components/Map";
import style from "./css/Order.module.css";
import { OrderContext } from "../context/OrderContext";
import Checkout from "../components/Checkout";

const Order = () => {
  const { isOrder, isFinish } = useContext(OrderContext);
  return (
    <div className={style.container}>
      {!isFinish && <Map />}
      {!isOrder && <Fleet />}
      {isOrder && <Checkout />}
      <BottomBar />
    </div>
  );
};

export default Order;
