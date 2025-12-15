export interface PalletConfig {
  rows: number;
  columns: number;
}

export interface Pallet {
  palletNumber: number;
  productId: string;
  productName: string;
  rows: number;
  columns: number;
  capacity: number;
  quantityFilled: number;
}
