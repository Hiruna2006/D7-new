import products from '../data/products.json';
import sizes from '../data/sizes.json';
import sizeChart from '../data/size-chart.json';
import type { MerchandiseProduct, MerchandiseSizeChartRow } from '../types/merchandise';
export class JsonMerchandiseConfigRepository {
  getProducts() { return products as MerchandiseProduct[]; }
  getSizes() { return sizes as string[]; }
  getSizeChart() { return sizeChart as MerchandiseSizeChartRow[]; }
}
