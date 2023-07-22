import { useQuery } from '@tanstack/react-query';
import shipmentApi from 'api/shipmentApi';
// import { queryKeys } from 'hooks/queryKeys';

const useGetShipment = () => {
  return useQuery({
    queryKey: ['shipments'],
    queryFn: async () => await shipmentApi.getAll()
  });
};

export { useGetShipment };
