export interface ICart {
  id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

export interface ICarts {
  [key: string]: ICart;
}
