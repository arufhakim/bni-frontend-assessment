import { useContext, useEffect, useState } from "react";
import style from "./css/Promo.module.css";
import axios from "axios";
import { PromoContext } from "../context/PromoContext";
import BottomBar from "../components/BottomBar";
import Loader from "../components/Loader";
import Search from "../components/Search";

const Banner = () => {
  const { promos, setPromos, isReset, setIsReset } = useContext(PromoContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://content.digi46.id/promos")
      .then((res) => {
        setPromos([...res.data]);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        setIsReset(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isReset]);

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
        <Search />
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
