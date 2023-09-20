import { useContext, useEffect, useState } from "react";
import style from "./css/Checkout.module.css";
import { RiShieldUserLine, RiStarFill } from "react-icons/ri";
import { OrderContext } from "../context/OrderContext";
import Finished from "./Finished";
import { useNavigate } from "react-router-dom";
import { RiArrowUpCircleFill, RiRecordCircleFill } from "react-icons/ri";

const Checkout = () => {
  const { price, orderDetail, setOrderDetail, point, isFinish, setIsFinish } =
    useContext(OrderContext);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFinish) {
      setTimeout(() => {
        setStatus("Driver akan tiba dalam 4 menit");
      }, 100);

      setTimeout(() => {
        setStatus("Driver telah tiba");
      }, 5000);

      setTimeout(() => {
        setStatus("Driver sedang mengantarmu");
      }, 10000);

      setTimeout(() => {
        setStatus("Kamu sudah sampai tempat tujuan");
      }, 15000);

      setTimeout(() => {
        setIsFinish(true);
      }, 20000);
    }
  }, []);

  return (
    <>
      {!isFinish && <div className={style.status}>{status}</div>}
      {isFinish && <Finished />}
      <div className={style.container}>
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

        {isFinish && (
          <div className={style.pointContainer}>
            <div className={style.point}>
              <RiArrowUpCircleFill size={30} color="#006699" />
              <div className={style.icon}>
                <p className={style.location}>Lokasi Penjemputan</p>
                <p className={style.det}>{point.pickup}</p>
              </div>
            </div>
            <div className={`${style.point} ${style.destination}`}>
              <RiRecordCircleFill size={30} color="#ff6600" />
              <div className={style.icon}>
                <p className={style.location}>Lokasi Tujuan</p>
                <p className={style.det}>{point.destination}</p>
              </div>
            </div>
          </div>
        )}

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
          {isFinish && (
            <button
              type="submit"
              onClick={() => {
                navigate(0);
              }}
              className={`${style.btn} ${style.btnSubmit}`}
            >
              Selesai
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
