type PriceType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  currency: string;
  quantity: number;
  type: string;
  metadata: {},
  product: {
    id: string,
    name: string,
    description: string,
    images: string[],
    metadata: {},
    type: string,
    unit_label: string,
  }
}

export default PriceType;
