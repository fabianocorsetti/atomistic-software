/**
 * Overview table with all codes.
 */
import React from "react";
import MUIDataTable from "mui-datatables";
//import RangeSlider from './RangeSlider'

import { YEARS, getData } from "./Config";
import { getColumns } from "./Columns";

// let lastYear = YEARS[YEARS.length-1];
// Remove this after further checks
let lastYear = 2020;

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: lastYear,
      data: getData(lastYear),
      columns: null,
      options: {
        print: false,
        filterType: "checkbox",
        filterArrayFullMatch: false,
        sortOrder: { name: "citations", direction: "desc" },
        rowsPerPage: 100,
        selectableRows: false,
        setTableProps: () => {
          return {
            // material ui v4 only
            size: "small",
          };
        },
      },
    };
  }

  handleYearChange(event) {
    this.setState({
      year: event.target.value,
      data: getData(event.target.value),
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MUIDataTable
            title={
              <h2>
                Citation Data &nbsp;
                <select
                  defaultValue={this.state.year}
                  onChange={(event) => this.handleYearChange(event)}
                >
                  {YEARS.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>

                { this.state.year === "2021" ? <font color="red">&nbsp;&nbsp;2021 citation data for Gaussian <a href="https://github.com/ltalirz/atomistic-software/issues/103">may be unreliable</a></font> : null }
              </h2>
            }
            columns={getColumns(this.state.data, this.state.year)}
            data={this.state.data}
            options={this.state.options}
          />
        </header>
      </div>
    );
    //title={<RangeSlider year={this.state.year} />
  }
}

export default Table;
