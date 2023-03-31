interface IPurchase {
  id: string;
  amount: number;
  receipt_url: string;
  created: number;
  currency: string;
  status: string;
  receipt_number: string;
}

export default IPurchase;
