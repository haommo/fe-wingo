import { Box, Chip, Stack, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import LoadingButton from 'components/@extended/LoadingButton';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';
import { AutoCompleteField, DateTimeField, InputField } from 'components/formField';
import { CSVExport, HeaderSort, TablePagination } from 'components/third-party/ReactTable';
import { useAuthentication } from 'hooks/useAuthentication';
import { useGetAllUSer } from 'hooks/user/useGetAllUser';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { getColorStatus } from 'utils';
import { renderFilterTypes } from 'utils/react-table';

export function TabaleShipment({ columns, data, isLoading, params, handleFilterChange, meta }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  // const defaultColumn = useMemo(() => ({ Filter: DateColumnFilter }), []);

  const { isRoleAdmin } = useAuthentication();
  const { data: listUser } = useGetAllUSer();

  const optionListUser = useMemo(() => {
    return listUser?.map((user) => ({ value: user?.uuid, label: user?.name }));
  }, [listUser]);

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'status', value: '' }],
      hiddenColumns: ['avatar', 'email'],
      pageIndex: params.page - 1,
      pageSize: params.per_page
    }),
    [params]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    pageCount,
    setPageSize,
    setFilter,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState,
      manualPagination: true,
      pageCount: Math.ceil(meta?.total / meta?.per_page)
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const componentRef = useRef(null);

  // ================ Tab ================

  const groups = ['All', 'Pending', 'Transit', 'Delivered', 'Cancel'];
  const countGroup = data.map((item) => item.status);
  const counts = countGroup.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1
    }),
    {}
  );

  const [activeTab, setActiveTab] = useState(groups[0]);

  useEffect(() => {
    setFilter('status', activeTab === 'All' ? '' : activeTab);
  }, [activeTab, setFilter]);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      date1: null,
      date2: null,
      search: ''
    }
  });

  const countStatus = (status) => {
    switch (status) {
      case 'All':
        return data?.length || 0;
      case 'Pending':
        return counts.pending || 0;
      case 'Transit':
        return counts['in_transit'] || 0;
      case 'Delivered':
        return counts.delivered || 0;
      case 'Cancel':
        return counts.cancel || 0;
      default:
        return 0;
    }
  };

  const onSubmit = (data) => {
    handleFilterChange(data);
  };

  return (
    <>
      <Box sx={{ p: 3, pb: 0, width: '100%' }}>
        <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {groups.map((status, index) => (
            <Tab
              key={index}
              label={status}
              value={status}
              icon={<Chip label={countStatus(status)} color={getColorStatus(status?.toUpperCase())} variant="light" size="small" />}
              iconPosition="end"
            />
          ))}
        </Tabs>
      </Box>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction={matchDownSM ? 'column' : 'row'}
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 3 }}
        >
          <Stack direction={matchDownSM ? 'column' : 'row'} spacing={1} sx={{ width: '30vw' }}>
            {isRoleAdmin && <AutoCompleteField control={control} name="customer" placeholder="Select by customer" options={optionListUser} />}
            <InputField control={control} name="search" placeholder="Search by hawb number" />
            <LoadingButton type="submit" variant="contained" sx={{ background: theme.palette.primary, width: '15vw' }}>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <Typography>Search</Typography>
              </Stack>
            </LoadingButton>
          </Stack>
          <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={matchDownSM ? 1 : 0}>
            <Stack direction={matchDownSM ? 'column' : 'row'} spacing={2} mr={2}>
              <DateTimeField control={control} name="date1" />
              <DateTimeField control={control} name="date2" />
            </Stack>
            <CSVExport />
          </Stack>
        </Stack>
      </form>

      <Box ref={componentRef}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups?.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup?.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup?.headers?.map((column, x) => (
                  <TableCell key={x} {...column.getHeaderProps([{ className: column?.className }])}>
                    <HeaderSort column={column} sort />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {isLoading && (
              <>
                <TableRow>
                  <TableCell colSpan={9}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      sx={{ height: '25vh', width: '100%' }}
                      p={2}
                    >
                      <Stack>
                        <CircularWithPath />
                      </Stack>
                    </Stack>
                  </TableCell>
                </TableRow>
              </>
            )}
            {!isLoading &&
              page?.map((row, i) => {
                prepareRow(row);
                return (
                  <Fragment key={i}>
                    <TableRow
                      {...row?.getRowProps()}
                      onClick={() => {
                        row?.toggleRowSelected();
                      }}
                      sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                    >
                      {row?.cells?.map((cell, i) => (
                        <TableCell key={i} {...cell.getCellProps([{ className: cell.column.className }])} align="center">
                          {cell?.render('Cell')}
                        </TableCell>
                      ))}
                    </TableRow>
                  </Fragment>
                );
              })}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination
                  gotoPage={gotoPage}
                  rows={rows}
                  setPageSize={setPageSize}
                  pageSize={pageSize}
                  pageIndex={pageIndex}
                  pageCount={pageCount}
                  handleFilterChange={handleFilterChange}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

TabaleShipment.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  meta: PropTypes.object,
  params: PropTypes.object,
  handleFilterChange: PropTypes.func
};

TabaleShipment.defaultProps = {
  columns: [],
  data: [],
  meta: []
};
