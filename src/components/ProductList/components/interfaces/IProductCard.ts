import IPrice from '../../../../common/interfaces/IPrice';

interface IProductCard {
  price: IPrice,
  onBuy: (id: string) => void,
};

export default IProductCard;
