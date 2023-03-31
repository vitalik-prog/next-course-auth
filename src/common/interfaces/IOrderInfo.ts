interface IOrderInfo {
  customer_details: {
    email: string;
    name: string;
    address: {
      city: string;
      country: string;
    };
  };
  line_items: {
    data: {
      amount_subtotal: number;
      amount_total: number;
      currency: string;
      price: {
        product: {
          name: string;
          images: string[];
          description: string;
        };
      };
      quantity: number;
    }[];
  };
  payment_intent: {
    id: string;
    created: number;
    charges: {
      data: {
        amount: number;
        amount_refunded: number;
      }[];
    };
  };
  payment_method_types: string[];
  payment_status: string;
  amount_total: number;
  amount_subtotal: number;
  total_details: {
    amount_discount: number;
    amount_tax: number;
  };
}

export default IOrderInfo;
