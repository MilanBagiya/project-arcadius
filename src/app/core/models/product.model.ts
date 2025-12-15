import { PalletConfig } from './pallet.model';

export interface Product {
  id: string;
  name: string;
  quantity: number;
  palletConfig?: PalletConfig;
}
