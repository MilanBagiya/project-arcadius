import { PurchaseOrder } from '../models/purchase-order.model';

export const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    orderNumber: 'PO-2024-001',
    description: 'Electronics components for Assembly Line A',
    date: new Date('2024-01-15'),
    products: [
      { id: 'P-EL-001', name: 'Control Module', quantity: 50 },
      {
        id: 'P-EL-002',
        name: 'Sensor Unit',
        quantity: 151,
        palletConfig: { rows: 5, columns: 10 },
      },
      { id: 'P-EL-003', name: 'Power Adapter', quantity: 28 },
    ],
  },

  {
    orderNumber: 'PO-2024-002',
    description: 'Warehouse replenishment – packaged goods',
    date: new Date('2024-02-03'),
    products: [
      { id: 'P-PKG-010', name: 'Cardboard Boxes (Medium)', quantity: 200 },
      {
        id: 'P-PKG-011',
        name: 'Stretch Wrap Rolls',
        quantity: 300,
        palletConfig: { rows: 3, columns: 5 },
      },
      { id: 'P-PKG-012', name: 'Packing Tape', quantity: 95 },
    ],
  },

  {
    orderNumber: 'PO-2024-003',
    description: 'Retail store supply – seasonal items',
    date: new Date('2024-03-10'),
    products: [
      { id: 'P-RTL-101', name: 'Winter Jackets', quantity: 400 },
      {
        id: 'P-RTL-102',
        name: 'Thermal Gloves',
        quantity: 500,
        palletConfig: { rows: 4, columns: 6 },
      },
    ],
  },

  {
    orderNumber: 'PO-2024-004',
    description: 'Industrial tools shipment',
    date: new Date('2024-04-22'),
    products: [
      {
        id: 'P-IND-201',
        name: 'Hydraulic Pumps',
        quantity: 73,
      },
      {
        id: 'P-IND-202',
        name: 'Pressure Valves',
        quantity: 180,
        palletConfig: { rows: 6, columns: 6 },
      },
    ],
  },

  {
    orderNumber: 'PO-2024-005',
    description: 'Food distribution center – dry goods',
    date: new Date('2024-05-05'),
    products: [
      { id: 'P-FD-301', name: 'Rice Bags (25kg)', quantity: 240 },
      {
        id: 'P-FD-302',
        name: 'Flour Bags (10kg)',
        quantity: 125,
        palletConfig: { rows: 4, columns: 8 },
      },
      { id: 'P-FD-303', name: 'Lentil Packs', quantity: 64 },
    ],
  },
];
