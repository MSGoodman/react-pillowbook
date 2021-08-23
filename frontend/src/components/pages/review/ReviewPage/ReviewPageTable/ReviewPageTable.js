// Shamelessly copied from https://www.akashmittal.com/gui-utility-to-generate-react-table-code/. Thanks buddy!
// Read through this, grok react-table, rewrite it, and then buy Akash a beer.

import React from "react";
import {
  useTable
  ,useSortBy
  ,usePagination
  ,useFilters
  ,useGlobalFilter
  ,useAsyncDebounce
} from "react-table";


// Function for global search
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div style={{ padding: 10, border: "1px solid", marginTop: 20 }}>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0"
        }}
      />
    </div>
  );
}
// Global search function ended



// Function for default filters
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}
// Default filters function Ended






// Table function. It creates UI.
function Table({columns, data}) {
  
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );
  
  

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageSize: 30 }
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  // Render the UI for your table
  return (
    <>
      
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      
      <table
        {...getTableProps()}
        border={1}
        style={{
          borderCollapse: "collapse",
          width: "100%",
          margin: "auto"
        }}
      >
        
        <thead>
          {headerGroups.map((group) => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? <i className="fas fa-sort-down"></i>
                            : <i className="fas fa-sort-up"></i>
                          : column.canSort
                          ? ""
                          : ""}
                      </span>
                    </div>
                  
                  
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  
                </th>
              ))}
            </tr>
          ))}
        </thead>
        

        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        
      </table>
      
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      
    </>
  );
}
// Table function component end

// App component start
function ReviewPageTable(props) {

  // Columns array. This array contains your table headings and accessors which maps keys from data array
  const columns = React.useMemo(() => (
  [
    {
        "id": "1",
        "Header": "Name",
        "Footer": "",
        "accessor": "name"
    },
    {
        "id": "2",
        "Header": "Type",
        "Footer": "",
        "accessor": "type"
    }
]
  ), []);

  // Data array. Replace it with your actual data.
  const data = props.nodes;

  return (
    <Table columns={columns} data={data} />
  );
}
// App component end

export default ReviewPageTable;
