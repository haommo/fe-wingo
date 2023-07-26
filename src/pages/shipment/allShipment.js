/* eslint-disable react/prop-types */
import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from '@ant-design/icons';
import { useTheme } from '@emotion/react';
import { Chip, Stack, Tooltip } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import AlertColumnDelete from 'components/Alert/AlertColumnDelete';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { TabaleShipment } from 'components/table';
import { IndeterminateCheckbox } from 'components/third-party/ReactTable';
import dayjs from 'dayjs';
import { useGetShipment } from 'hooks';
import { useServices } from 'hooks/services/useGetServices';
import { useRemoveShipment } from 'hooks/shipment/useDeleteShipment';
import { truncate } from 'lodash';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getColorStatus, getCountryDisplayName, getLabelShipment } from 'utils';

// ==============================|| INVOICE - LIST ||============================== //

// Status
const StatusCell = ({ row }) => {
  const { values } = row;
  return (
    <Chip
      color={getColorStatus(values.status)}
      label={getLabelShipment(values.status)}
      size="small"
      sx={{ minWidth: '80px' }}
      variant="light"
    />
  );
};

StatusCell.propTypes = {
  row: PropTypes.object
};

const CustomerCellDate = ({ row }) => {
  const { values } = row;
  return dayjs(values.created_at).format('DD-MM-YYYY');
};
CustomerCellDate.propTypes = {
  row: PropTypes.object
};

/* const CustomerCellWeight = () => {
  return 'not found';
}; */

CustomerCellDate.propTypes = {
  row: PropTypes.object
};

// Section Cell and Header
const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);

SelectionCell.propTypes = {
  row: PropTypes.object
};

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func
};

export default function AllShipment() {
  const theme = useTheme();

  const [params, setParams] = useState({
    page: 1,
    per_page: 5
  });

  const { data: listShipmentSort, isLoading } = useGetShipment(params);
  const { mutate: removeShipment } = useRemoveShipment();
  const { getServiceName } = useServices();
  const [alertPopup, SetAlertPopup] = useState(false);
  const [hawbChose, setHawbchose] = useState();

  const handleAlertClose = () => {
    SetAlertPopup(!alertPopup);
    // setMode({...mode, });
  };

  const onDelete = () => {
    removeShipment(hawbChose);
  };

  // cell country
  const CustomerCellCountry = ({ row }) => {
    return getCountryDisplayName(row?.values?.['receiver_address.country']);
  };

  // cell service
  const cellService = useCallback(
    ({ row }) => {
      return getServiceName(row?.values?.['service_id']);
    },
    [getServiceName]
  );

  const cellReceiver = useCallback(({ row }) => {
    return truncate(row?.values?.['receiver_address.name'], {
      length: 20,
      separator: /,? +/
    });
  }, []);

  const cellSender = useCallback(({ row }) => {
    return truncate(row?.values?.['sender_address.company'], {
      length: 20,
      separator: /,? +/
    });
  }, []);

  //Action Cell
  const ActionCell = useCallback(
    ({ row }) => {
      return (
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
          <Tooltip title="View">
            <Link to={`/shipment/viewShipmentDetail/${row?.values?.hawb}`} target="_blank">
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Edit">
            <Link to={`/shipment/editShipment/${row?.values?.hawb}`} target="_blank">
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  // eslint-disable-next-line react/prop-types
                }}
              >
                <EditTwoTone twoToneColor={theme.palette.primary.main} />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                SetAlertPopup(true);
                setHawbchose(row?.values?.hawb);
              }}
            >
              <DeleteTwoTone twoToneColor={theme.palette.error.main} />
            </IconButton>
          </Tooltip>
        </Stack>
      );
    },
    [theme]
  );

  const columns = useMemo(
    () => [
      {
        title: 'Row Selection',
        Header: SelectionHeader,
        accessor: 'selection',
        Cell: SelectionCell,
        disableSortBy: true,
        disableFilters: true
      },
      {
        Header: 'shipment id',
        accessor: 'hawb',
        className: 'cell-center',
        disableFilters: true
      },

      {
        Header: 'Sender',
        accessor: 'sender_address.company',
        Cell: cellSender
      },

      {
        Header: 'Receiver',
        accessor: 'receiver_address.name',
        Cell: cellReceiver
      },
      {
        Header: 'destination',
        className: 'cell-center',
        accessor: 'receiver_address.country',
        disableSortBy: true,
        Cell: CustomerCellCountry
      },
      {
        Header: 'service',
        accessor: 'service_id',
        Cell: cellService
      },
      {
        Header: 'Tracking',
        accessor: 'localtracking'
        /*      Cell: cellTracking
         */
      },

      {
        Header: 'status',
        accessor: 'status',
        disableFilters: true,
        Cell: StatusCell
      },
      {
        Header: 'date',
        accessor: 'created_at',
        Cell: CustomerCellDate
      },

      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ActionCell
      }
    ],
    [cellService, ActionCell, cellReceiver, cellSender]
  );

  const hanldeFilterChange = (data) => {
    let newParams = { ...params };
    if (data.search) {
      newParams['filter-by'] = data.search;
      newParams.page = 1;
    }
    if (data.search === '') {
      delete newParams['filter-by'];
      newParams.page = 1;
    }

    if (data.customer) {
      newParams['userUuid'] = data.customer.value;
      newParams.page = 1;
    }

    if (data.customer === null) {
      delete newParams['userUuid'];
      newParams.page = 1;
    }

    if (data.page) {
      newParams.page = data.page;
    }

    if (data.limit) {
      newParams['per_page'] = data.limit;
    }

    setParams(newParams);
  };

  //   const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <MainCard content={false} boxShadow={true}>
        {
          <ScrollX>
            <TabaleShipment
              columns={columns}
              data={listShipmentSort?.data}
              isLoading={isLoading}
              params={params}
              handleFilterChange={hanldeFilterChange}
              meta={listShipmentSort?.meta}
            />
          </ScrollX>
        }
      </MainCard>
      <AlertColumnDelete title={`Are you sure deleted it`} open={alertPopup} handleClose={handleAlertClose} onConfirmDelete={onDelete} />
    </>
  );
}
