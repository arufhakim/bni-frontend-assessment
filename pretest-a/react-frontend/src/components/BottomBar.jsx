import { Link, useLocation } from "react-router-dom";
import style from "./css/BottomBar.module.css";
import {
  RiHome5Line,
  RiWaterPercentLine,
  RiFileList2Line,
  RiHistoryFill,
} from "react-icons/ri";

const BottomBar = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <div className={style.container}>
      <Link
        to="/home"
        className={
          splitLocation[1] === "home"
            ? `${style.link} ${style.active}`
            : `${style.link}`
        }
      >
        <div>
          <RiHome5Line size={20} />
          Home
        </div>
      </Link>
      <Link
        to="/promo"
        className={
          splitLocation[1] === "promo"
            ? `${style.link} ${style.active}`
            : `${style.link}`
        }
      >
        <div>
          <RiWaterPercentLine size={20} />
          Promo
        </div>
      </Link>
      <Link
        to="/order"
        className={
          splitLocation[1] === "order"
            ? `${style.link} ${style.active}`
            : `${style.link}`
        }
      >
        <div>
          <RiFileList2Line size={20} />
          Pemesanan
        </div>
      </Link>
      <Link
        to="/history"
        className={
          splitLocation[1] === "history"
            ? `${style.link} ${style.active}`
            : `${style.link}`
        }
      >
        <div>
          <RiHistoryFill size={20} />
          Riwayat
        </div>
      </Link>
    </div>
  );
};

export default BottomBar;
