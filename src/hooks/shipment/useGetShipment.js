import { useQuery } from '@tanstack/react-query';
import shipmentApi from 'api/shipmentApi';
// import { queryKeys } from 'hooks/queryKeys';

const useGetShipment = (params) => {
  return useQuery({
    queryKey: ['shipment', params?.page, params?.per_page, params?.['filter-by'], params?.userUuid],
    queryFn: async () => await shipmentApi.getAll(params),

    keepPreviousData: true,
    staleTime: Infinity
  });
};

export { useGetShipment };
