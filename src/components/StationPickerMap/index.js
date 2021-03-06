///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { inject, observer} from 'mobx-react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { Map, GeoJSON, TileLayer, ZoomControl } from 'react-leaflet';

import StationPickerSelect from '../../components/StationPickerSelect';

// Styles
import '../../styles/StationPickerMap.css';

import StationPickerLegend from '../../components/StationPickerLegend';
import StationExplorerButtonFlyTo from '../../components/StationExplorerButtonFlyTo';

const mapContainer = 'map-container';
const zoomLevel = 4;
const minZoomLevel = 4;
const maxZoomLevel = 16;
var app;

@inject('store') @observer
class StationPickerMap extends Component {

    constructor(props) {
        super(props);
        app = this.props.store.app;
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.onClickCONUS = this.onClickCONUS.bind(this)
        this.onClickAlaska = this.onClickAlaska.bind(this)
        this.onClickHawaii = this.onClickHawaii.bind(this)
        this.onClickPR = this.onClickPR.bind(this)
        // CONUS
        this.maxBounds = [
            [24.9493, -125.0011],
            [49.5904, -66.9326]
        ];
        this.mapCenter = [38.0, -95.7];
        this.zoomLevel = 4;
        this.minZoomLevel = 3;
        this.maxZoomLevel = 16;
    }

    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      this.map = this.mapInstance.leafletElement
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    onClickCONUS() {
        this.map.flyTo([38.0, -95.7], 4)
    }

    onClickAlaska() {
        this.map.flyTo([64.20, -149.50], 4)
    }

    onClickHawaii() {
        this.map.flyTo([19.90, -155.60], 6)
    }

    onClickPR() {
        this.map.flyTo([18.25, -66.0], 6)
    }

    render() {

        return (
            <div className="StationPickerMap">
                    <StationPickerSelect names={app.getLocations} />
                    <Map
                        ref={e => { this.mapInstance = e }}
                        center={this.mapCenter}
                        bounds={this.maxBounds}
                        zoomControl={false}
                        zoom={this.zoomLevel}
                        minZoom={this.minZoomLevel}
                        maxZoom={this.maxZoomLevel}
                        attributionControl={false}
                        className={mapContainer}
                        style={{
                            height:this.state.height-160,
                            width:this.state.width-80,
                        }}
                    >
                        <TileLayer
                            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <GeoJSON
                            data={app.getStationGeojson}
                            style={app.stationFeatureStyle}
                            pointToLayer={(feature,latlng) => {return L.circleMarker(latlng)}}
                            onEachFeature={app.stationOnEachFeature}
                        />
                        <StationExplorerButtonFlyTo pos="bottomleft" loc="Hawaii" onclick={this.onClickHawaii} />
                        <StationExplorerButtonFlyTo pos="bottomright" loc="Puerto Rico & Virgin Isles" onclick={this.onClickPR} />
                        <StationExplorerButtonFlyTo pos="topleft" loc="Alaska" onclick={this.onClickAlaska} />
                        <ZoomControl position="topleft" />
                        <StationExplorerButtonFlyTo pos="topleft" loc="Home" onclick={this.onClickCONUS} />
                        <StationPickerLegend/>
                    </Map>
            </div>
        );
    }
}

export default StationPickerMap;
