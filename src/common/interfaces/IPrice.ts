interface IPrice {
  id: string;
  currency: string;
  type: string;
  metadata: {};
  product: {
    id: string;
    name: string;
    description: string;
    images: string[];
    metadata: {};
    type: string;
    unit_label: string;
  };
  unit_amount: number;
}

export default IPrice;
