import IPrice from '../../../common/interfaces/IPrice';
interface IProductList {
  prices: IPrice[];
  onBuy: (id: string) => void;
}

export default IProductList;
