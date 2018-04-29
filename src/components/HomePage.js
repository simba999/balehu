import React from 'react';
import { withRouter } from 'react-router-dom';
import _ from "lodash";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { db } from '../firebase.js';
import * as con from '../constant.js';

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
          Header: "Name",
          accessor: "Name"
        },
        {
          Header: "Symbol",
          accessor: "Symbol"
        }, 
        {
          Header: "ImageUrl",
          accessor: "ImageUrl"
        },
        {
          Header: "ProofType",
          accessor: "ProofType"
        },
        {
          Header: "Algorithm",
          accessor: "Algorithm"
        }
      ]
    }

    this.fetchData = this.fetchData.bind(this);
    this.requestData = this.requestData.bind(this);
    this.gotoDetail = this.gotoDetail.bind(this);
  }
  /*
    ## Upload data from json file to firestore
  */
  uploadJSON() {
    $.getJSON(con.JSON_DUMP_URL, function( data ) {
      $.each( data, function( key, val ) {
        db.collection('cryptos').add(val)
      });
    });
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
  fetchData(state) {
    this.setState({ loading: true });

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
          var data = snapshot.data();
          data['ImageUrl'] = 'http://Cryptocompare.com' + data['ImageUrl']
          
          return data;
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
        resolve(res)
      });  
    });
  };

  gotoDetail(data) {
    this.props.history.push({
      pathname: con.DETAIL_PAGE_URL + data.Id,
      state: { data: data }
    });
  }

  render() {
    const self = this;
    const { data, columns, loading, pages, pageSize } = this.state;

    return (
      <div className="container">
        <div className="row center-item m-b-25">
          <h2 className="m-r-25"> Coin Market </h2>
          <button onClick={this.uploadJSON.bind(this)}>Upload Json</button>
        </div>
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
          getTdProps={(state, rowInfo) => {
            return {
              onClick: (e) => {
                self.gotoDetail(rowInfo.original);
              }
            }
          }}
        />
      </div>
    );
  }
}


export default withRouter(HomePage);

