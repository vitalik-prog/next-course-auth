import { BiLoaderAlt } from "react-icons/bi";
import classes from "./loader.module.css";

const Loader = () => {
  return (
    <p className={classes.loaderWrapper}>
      <BiLoaderAlt
        className={classes.animate}
        size={70} 
        color="#38015c" 
      />
    </p>
  );
}

export default Loader;
