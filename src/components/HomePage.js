import React from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { db } from '../firebase.js';

class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      page: 0,                                // current page number
      pages: null,                            // total number of pages
      pageSize: 20,                           // number of records in one page
      loading: true,                          // true if data is not loaded
      columns: [
        {
          Header: "CoinName",
          accessor: "CoinName"
        },
        {
          Header: "FullName",
          accessor: "FullName"
        },
        {
          Header: "FullyPremined",
          accessor: "FullyPremined",
        },
        {
          Header: "Id",
          accessor: "Id"
        },
        {
          Header: "ImageUrl",
          accessor: "ImageUrl"
        },
        {
          Header: "Name",
          accessor: "Name"
        },
        {
          Header: "PreMinedValue",
          accessor: "PreMinedValue"
        },
        {
          Header: "ProofType",
          accessor: "ProofType"
        },
        {
          Header: "SortOrder",
          accessor: "SortOrder"
        },
        {
          Header: "Sponsored",
          accessor: "Sponsored"
        },
        {
          Header: "Symbol",
          accessor: "Symbol"
        }, 
        {
          Header: "TotalCoinSupply",
          accessor: "TotalCoinSupply"
        },
        {
          Header: "TotalCoinsFreeFloat",
          accessor: "TotalCoinsFreeFloat"
        },
        {
          Header: "Url",
          accessor: "Url"
        }
      ]
    }

    this.fetchData = this.fetchData.bind(this);
    this.requestData = this.requestData.bind(this);
  }

  /*
    ## Call api to get data from  firesotre ##
    @params:
      - pageSize: number of records in a page
      - page: page number
      - sorted: sort information
      - filtered: filter information
    @output:
      - data:
      - page: page number
  */
  fetchData(state, instance) {
    this.setState({ loading: true });
    console.log("*************************")
    console.log(state)
    this.requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      this.setState({
        pages: res.pages,
        page: res.page,
        data: res.rows,
        loading: false
      })
    })
  }

  /*
    ## Fectch API that gets data from firestore ##
    @params:
      - pageSize: number of records in a page
      - page: page number
      - sorted: sort information
      - filtered: filter information
    @output:
      - data:
      - page: page number
  */
  requestData(pageSize, page, sorted, filtered) {
    return new Promise((resolve, reject) => {
      // retrieve data from firestore
      
      let items = db.collection("cryptos")
      .get()
      .then(function(queryset) { 
        
        return queryset.docs.map((snapshot) => {
          return snapshot.data()
        })
      });

      items.then(output => {
        let filteredData = output;

        // You can use the filters in your request, but you are responsible for applying them.
        if (filteredData.length) {
          filteredData = filteredData.reduce((filteredSoFar, nextFilter) => {
            return filteredSoFar.filter(row => {
              return (row[nextFilter.id] + "").includes(nextFilter.value);
            });
          }, filteredData);
        }
        // let sortedData = filteredData;
        // You can also use the sorting in your request, but again, you are responsible for applying it.
        const sortedData = _.orderBy(
          filteredData,
          sorted.map(sort => {
            return row => {
              if (row[sort.id] === null || row[sort.id] === undefined) {
                return -Infinity;
              }
              return typeof row[sort.id] === "string"
                ? row[sort.id].toLowerCase()
                : row[sort.id];
            };
          }),
          sorted.map(d => (d.desc ? "desc" : "asc"))
        );

        // You must return an object containing the rows of the current page, and optionally the total pages number.
        const res = {
          rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
          pages: Math.ceil(filteredData.length / pageSize),
          page: page
        };

        // Here we'll simulate a server response with 500ms of delay.
        setTimeout(() => resolve(res), 500);
      });  
    });
  };

  render() {
    const { data, columns, loading, pages, pageSize } = this.state;

    return (
      <div className="section">
        <ReactTable
          manual
          data={data}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.fetchData}
          columns={columns}
          defaultSorted={[
            {
              id: "SortOrder",
              desc: true
            }
          ]}
          defaultPageSize={pageSize}
          className="-striped -highlight"
        />
      </div>
    );
  }
};

export default HomePage;
