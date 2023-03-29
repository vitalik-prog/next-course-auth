import IPurchase from "../../common/interfaces/IPurchase";
import IPrice from "../../common/interfaces/IPrice";

interface IPurchasesPageProps {
  purchases: IPurchase[];
  prices: IPrice[];
  session: {
    expires: string;
    user: {
      id: string;
      email: string;
      image: string;
      name: string;
    };
  };
}

export default IPurchasesPageProps;
