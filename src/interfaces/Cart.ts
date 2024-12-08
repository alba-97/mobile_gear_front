export interface ICart {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ICarts {
  [key: string]: ICart;
}
