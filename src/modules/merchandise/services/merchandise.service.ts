import { JsonMerchandiseConfigRepository } from '../repositories/merchandise-config.repository';
const repository = new JsonMerchandiseConfigRepository();
export const merchandiseService = {
  getProducts: () => repository.getProducts(),
  getSizes: () => repository.getSizes(),
  getSizeChart: () => repository.getSizeChart(),
  calculateTotal: (items: Array<{productId:string; quantity:number}>) => items.reduce((sum,item) => {
    const product = repository.getProducts().find((candidate) => candidate.id === item.productId);
    return sum + (product?.price ?? 0) * Math.max(0, item.quantity);
  }, 0),
};
export { getMerchOrders, getMerchReceiptUrl } from '../repositories/merch-order.repository.client';
export type { MerchOrderRecord } from '../repositories/merch-order.repository.client';
