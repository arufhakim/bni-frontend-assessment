import { useContext, useEffect, useState } from "react";
import BottomBar from "../components/BottomBar";
import style from "./css/History.module.css";
import { HistoryContext } from "../context/HistoryContext";
import {
  RiShieldUserLine,
  RiStarFill,
  RiArrowUpCircleFill,
  RiRecordCircleFill,
} from "react-icons/ri";

import axios from "axios";
import Loader from "../components/Loader";
const History = () => {
  const { histories, setHistories } = useContext(HistoryContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/orders")
      .then((res) => {
        setHistories([...res.data]);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <Loader />
        <BottomBar />
      </>
    );
  }

  return (
    <div className={style.container}>
      {histories.map((orderDetail) => {
        return (
          <div className={style.driverContainer} key={orderDetail.id}>
            <div className={style.driverDetail}>
              <div className={style.driver}>
                <h5>{orderDetail.license}</h5>
                <div className={style.desc}>{orderDetail.brand}</div>
                <div className={`${style.desc} ${style.name}`}>
                  {orderDetail.name}
                </div>
                <div className={`${style.desc} ${style.rating}`}>
                  <RiStarFill /> {orderDetail.rating}
                </div>
              </div>
              <RiShieldUserLine size={40} />
            </div>
            <div className={style.pointContainer}>
              <div className={style.point}>
                <RiArrowUpCircleFill size={30} color="#006699" />
                <div className={style.icon}>
                  <p className={style.location}>Lokasi Penjemputan</p>
                  <p className={style.det}>{orderDetail.pickup}</p>
                </div>
              </div>
              <div className={`${style.point} ${style.destination}`}>
                <RiRecordCircleFill size={30} color="#ff6600" />
                <div className={style.icon}>
                  <p className={style.location}>Lokasi Tujuan</p>
                  <p className={style.det}>{orderDetail.destination}</p>
                </div>
              </div>
            </div>
            <div className={style.orderDetail}>
              <h5>Detail Pembayaran</h5>
              <div className={style.order}>
                <p>Order ID</p>
                <p>{orderDetail.orderId}</p>
              </div>
              <div className={style.order}>
                <p>Waktu Pemesanan</p>
                <p>{orderDetail.date}</p>
              </div>
              <div className={style.order}>
                <p>Tipe</p>
                <p>{orderDetail.type}</p>
              </div>
              <div className={style.order}>
                <p>Total Pembayaran</p>
                <p>
                  Rp
                  {new Intl.NumberFormat("id-ID").format(
                    Math.round(orderDetail.price)
                  )}
                </p>
              </div>
              <div className={style.order}>
                <p>Pembayaran</p>
                <p>Tunai</p>
              </div>
            </div>
          </div>
        );
      })}
      <BottomBar />
    </div>
  );
};

export default History;
