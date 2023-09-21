import { useContext } from "react";
import style from "./css/Search.module.css";
import { RiSearch2Line, RiLoopLeftFill } from "react-icons/ri";
import { PromoContext } from "../context/PromoContext";

const Search = () => {
  const { search, setSearch, handleSearch, setIsReset } =
    useContext(PromoContext);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearch({ ...search, [name]: value });
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="Cari"
        name="search"
        value={search.search}
        onChange={handleChange}
        className={style.input}
      />
      <button onClick={handleSearch} className={style.search}>
        <RiSearch2Line />
      </button>
      <button
        onClick={() => {
          setIsReset(true);
          setSearch({ search: "" });
        }}
        className={style.reset}
      >
        <RiLoopLeftFill />
      </button>
    </div>
  );
};

export default Search;
