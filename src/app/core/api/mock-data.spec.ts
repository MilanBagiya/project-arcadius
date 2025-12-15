import { MOCK_PURCHASE_ORDERS } from './mock-data';

describe('MOCK_PURCHASE_ORDERS', () => {
  it('should be defined', () => {
    expect(MOCK_PURCHASE_ORDERS).toBeDefined();
  });

  it('should contain at least one purchase order', () => {
    expect(MOCK_PURCHASE_ORDERS.length).toBeGreaterThan(0);
  });

  it('each purchase order should have required fields', () => {
    MOCK_PURCHASE_ORDERS.forEach((po) => {
      expect(po.orderNumber).toBeTruthy();
      expect(po.description).toBeTruthy();
      expect(po.date).toBeInstanceOf(Date);
      expect(Array.isArray(po.products)).toBeTrue();
    });
  });

  it('each product should have id, name and quantity', () => {
    MOCK_PURCHASE_ORDERS.forEach((po) => {
      po.products.forEach((product) => {
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.quantity).toBeGreaterThan(0);
      });
    });
  });

  it('should allow palletConfig override per product', () => {
    const hasOverride = MOCK_PURCHASE_ORDERS.some((po) =>
      po.products.some((p) => p.palletConfig)
    );

    expect(hasOverride).toBeTrue();
  });

  it('palletConfig rows and columns should be greater than zero when defined', () => {
    MOCK_PURCHASE_ORDERS.forEach((po) => {
      po.products.forEach((product) => {
        if (product.palletConfig) {
          expect(product.palletConfig.rows).toBeGreaterThan(0);
          expect(product.palletConfig.columns).toBeGreaterThan(0);
        }
      });
    });
  });
});
