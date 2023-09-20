import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { OrderContext } from "../context/OrderContext";
import style from "./css/Fleet.module.css";
import { RiUser3Fill } from "react-icons/ri";

const Fleet = () => {
  const {
    fleets,
    setFleets,
    range,
    selectDirection,
    setIsOrder,
    orderDetail,
    setOrderDetail,
    selectFleet,
    setSelectFleet,
    handleOrder,
  } = useContext(OrderContext);
  useEffect(() => {
    axios
      .get("http://localhost:3000/fleets")
      .then((res) => {
        setFleets([...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {selectFleet && (
        <div className={`${style.container} ${style.total}`}>
          <p className={style.method}>Tunai </p>
          <p>
            Rp
            {new Intl.NumberFormat("id-ID").format(
              Math.round(orderDetail.price)
            )}
          </p>
          <button
            type="submit"
            onClick={() => {
              setIsOrder(true);
              handleOrder();
            }}
            className={`${style.btn} ${style.btnSubmit}`}
          >
            Pesan Sekarang
          </button>
        </div>
      )}
      {selectDirection && (
        <div className={style.container}>
          <p>Mau naik apa?</p>
          {fleets.map((fleet) => {
            return (
              <div
                className={
                  fleet.id == 1
                    ? `${style.fleet} ${style.radiusTop}`
                    : `${style.fleet}`
                }
                onClick={() => {
                  const totalPrice = Math.round(fleet.cost * range);
                  setOrderDetail({
                    ...orderDetail,
                    type: fleet.type,
                    price: totalPrice,
                  });
                  setSelectFleet(true);
                }}
                key={fleet.id}
              >
                <div className={style.desc}>
                  <h5>{fleet.type}</h5>
                  <div className={style.capacity}>
                    {fleet.max} menit &#x2022;
                    <RiUser3Fill />
                    {fleet.capacity}
                  </div>
                </div>
                <div className={style.cost}>
                  Rp
                  {new Intl.NumberFormat("id-ID").format(
                    Math.round(fleet.cost * range)
                  )}
                </div>
              </div>
            );
          })}
          <p className={style.tax}>
            <span>*</span>Tarif ini belum termasuk ongkos tol/parkir
          </p>
        </div>
      )}
    </>
  );
};

export default Fleet;
