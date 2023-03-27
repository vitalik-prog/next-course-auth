import { BiLoaderAlt } from "react-icons/bi";
import classes from "./css/Loader.module.css";

const Loader = () =>  (
  <p className={classes.loaderWrapper}>
    <BiLoaderAlt
      className={classes.animate}
      size={70} 
      color="#38015c" 
    />
  </p>
);

export default Loader;
