/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Fragment, useMemo, useRef } from 'react';
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { HeaderSort, TablePagination } from 'components/third-party/ReactTable';
import { renderFilterTypes } from 'utils/react-table';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';

export function TabaleManifest({ columns, data, hiddenColumn, isLoading }) {
  const theme = useTheme();
  //   const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'status', value: '' }],
      hiddenColumns: ['avatar', 'email', ...hiddenColumn],
      pageIndex: 0,
      pageSize: 5
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState
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

  return (
    <>
      <Box ref={componentRef}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups?.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup?.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup?.headers?.map((column, x) => (
                  <TableCell key={x} {...column.getHeaderProps([{ className: column.className }])}>
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
                      sx={{ height: '20vh', width: '100%' }}
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
              page.map((row, i) => {
                prepareRow(row);
                return (
                  <Fragment key={i}>
                    <TableRow
                      {...row.getRowProps()}
                      onClick={() => {
                        row.toggleRowSelected();
                      }}
                      sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                    >
                      {row?.cells?.map((cell, i) => (
                        <TableCell key={i} {...cell.getCellProps([{ className: cell.column.className }])} align="left">
                          {cell?.render('Cell')}
                        </TableCell>
                      ))}
                    </TableRow>
                  </Fragment>
                );
              })}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={12}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

TabaleManifest.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  hiddenColumn: PropTypes.array,
  isLoading: PropTypes.bool
};

TabaleManifest.defaultProps = {
  columns: [],
  data: [],
  hiddenColumn: []
};
