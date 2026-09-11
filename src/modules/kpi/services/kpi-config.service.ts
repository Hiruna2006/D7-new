import districtEvents from '../data/district-events.json';
import councilEvents from '../data/council-events.json';
import multipleDistrictEvents from '../data/multiple-district-events.json';
export const kpiConfigService = {
  getDistrictEvents: () => districtEvents as string[],
  getCouncilEvents: () => councilEvents as string[],
  getMultipleDistrictEvents: () => multipleDistrictEvents as string[],
};
