import { Grid } from '@mui/material';
import trackingApi from 'api/trackingShipmentApi';
import Error404 from 'pages/maintenance/404';
import { useCallback, useState } from 'react';
import { PackageInfomation, /* ProgressTracking, */ SearchTracking } from 'sections/tracking';
import { TrackingHistory } from 'sections/tracking/TrackingHistory';

export default function TrackingPage() {
  const [shipment, setShipemnt] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = useCallback(async (id) => {
    try {
      const res = await trackingApi.get(id);
      if (res) {
        setIsError(false);
        setShipemnt(res);
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    } catch (error) {
      console.log('falied');
      setIsError(true);
    }
  }, []);

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12}>
          <SearchTracking onChange={onChange} isLoading={isLoading} />
        </Grid>
        {shipment.length !== 0 ? (
          <>
            {/*  <Grid item xs={12}>
              <ProgressTracking data={shipment} />
            </Grid> */}

            <Grid item xs={12} md={5} lg={4}>
              <PackageInfomation data={shipment} />
            </Grid>
            <Grid item xs={12} md={7} lg={8}>
              <TrackingHistory data={shipment} />
            </Grid>
          </>
        ) : null}

        {isError ? <Error404 /> : null}
      </Grid>
    </>
  );
}
