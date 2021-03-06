///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { inject, observer} from 'mobx-react';
import MUIDataTable from "mui-datatables";


//Components

// Styles

var app;

@inject('store') @observer
class LivestockIdxTables extends Component {

    constructor(props) {
        super(props);
        app = this.props.store.app;

        let pageSize = 10;

        let setPage = () => {
                let data = app.livestock_getClimateSummary
                let idxValid = 0;
                data.slice().reverse().some(function (value,index) {
                    idxValid=index;
                    return !isNaN(value['cattle']);
                });
                return parseInt(Math.floor(idxValid/pageSize),10);
            }

        this.state = {
            page: setPage(),
            pageSize: pageSize,
        }
    }

    render() {

        let columns = [];
        columns.push({name:'Date/Time', options:{filter:true,sort:true,display:true,download:true}})
        columns.push({name:'Cattle Heat Idx', options:{filter:false,sort:true,display:true,download:true}})
        columns.push({name:'Dairy Cow Heat Idx', options:{filter:false,sort:true,display:true,download:true}})
        columns.push({name:'Large Animal Heat Idx', options:{filter:false,sort:true,display:true,download:true}})
        columns.push({name:'Small Animal Heat Idx', options:{filter:false,sort:true,display:true,download:true}})
        columns.push({name:'Air Temp (°F)', options:{filter:false,sort:true,display:true,download:true}})
        columns.push({name:'Rel Humidity (%)', options:{filter:false,sort:true,display:false,download:true}})
        columns.push({name:'Solar Rad (W/m2)', options:{filter:false,sort:true,display:false,download:true}})
        columns.push({name:'Wind Speed (mph)', options:{filter:false,sort:true,display:false,download:true}})

        let data = JSON.parse(JSON.stringify(app.livestock_getClimateSummary));

        const options = {
          filterType: 'checkbox',
          responsive: 'scroll',
          selectableRows: false,
          fixedHeader: false,
          search: false,
          filter: false,
          print: false,
          page: this.state.page,
          rowsPerPage: this.state.pageSize,
          rowsPerPageOptions: [10,50,data.length],
        };

        let tableData = data.map(row => {
                    row.cattle = (row.cattle) ? row.cattle : '--'
                    row.cow = (row.cow) ? row.cow : '--'
                    row.biganimal = (row.biganimal) ? row.biganimal : '--'
                    row.smallanimal = (row.smallanimal) ? row.smallanimal : '--'
                    row.avgt = (row.avgt) ? row.avgt : '--'
                    row.humid = (row.humid) ? row.humid : '--'
                    row.solar = (row.solar) ? row.solar : '--'
                    row.wind = (row.wind) ? row.wind : '--'
                    return [row.date,row.cattle,row.cow,row.biganimal,row.smallanimal,row.avgt,row.humid,row.solar,row.wind]
                })

        const tableTitle = 'Livestock Heat Stress'

        return (
                <MUIDataTable
                    title={tableTitle}
                    data={tableData.reverse()}
                    columns={columns}
                    options={options}
                />
        );

    }
}

export default LivestockIdxTables;

