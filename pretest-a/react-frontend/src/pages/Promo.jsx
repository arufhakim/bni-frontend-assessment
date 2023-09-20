import { useContext, useEffect, useState } from "react";
import style from "./css/Promo.module.css";
import axios from "axios";
import { PromoContext } from "../context/PromoContext";
import BottomBar from "../components/BottomBar";
import Loader from "../components/Loader";

const Banner = () => {
  const { promos, setPromos } = useContext(PromoContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://content.digi46.id/promos")
      .then((res) => {
        setPromos([...res.data]);
        setTimeout(() => {
          setIsLoading(true);
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
    <>
      <div className={style.container}>
        <div className={style.promoContainer}>
          {promos.map((promo) => {
            return (
              <div className={style.promo} key={promo.id}>
                <img src={promo.img.formats.small.url} />
                <div className={style.promoDesc}>
                  <h4>{promo.nama}</h4>
                  <p>{promo.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default Banner;
