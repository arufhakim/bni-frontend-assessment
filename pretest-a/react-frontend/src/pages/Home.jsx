import { useContext, useEffect, useState } from "react";
import style from "./css/Home.module.css";
import axios from "axios";
import BottomBar from "../components/BottomBar";
import { Link } from "react-router-dom";
import {
  RiUserLine,
  RiWaterPercentLine,
  RiFileList2Line,
  RiHistoryFill,
} from "react-icons/ri";
import { PromoContext } from "../context/PromoContext";
import Loader from "../components/Loader";

const Home = () => {
  const { promos, setPromos } = useContext(PromoContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://content.digi46.id/promos")
      .then((res) => {
        setPromos([...res.data]);
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
    <>
      <div className={style.container}>
        <h3 className={style.header}>Kategori</h3>
        <div className={style.categoryContainer}>
          <Link className={style.link} to="/promo">
            <div className={style.category}>
              <div className={style.icons}>
                <RiWaterPercentLine size={20} className={style.icon} />
              </div>
              <p>Promo</p>
            </div>
          </Link>
          <Link className={style.link} to="/order">
            <div className={style.category}>
              <div className={style.icons}>
                <RiFileList2Line size={20} className={style.icon} />
              </div>
              <p>Pemesanan</p>
            </div>
          </Link>
          <Link className={style.link} to="/history">
            <div className={style.category}>
              <div className={style.icons}>
                <RiHistoryFill size={20} className={style.icon} />
              </div>
              <p>Riwayat</p>
            </div>
          </Link>
          <div className={style.category}>
            <div className={style.icons}>
              <RiUserLine size={20} className={style.icon} />
            </div>
            <p>Profile</p>
          </div>
        </div>
        <div className={style.promoHeader}>
          <h3>Promosi</h3>
          <Link to="/promo" className={style.link}>
            <p>Selengkapnya</p>
          </Link>
        </div>
        <div className={style.promoContainer}>
          {promos.slice(0, 3).map((promo) => {
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

export default Home;
