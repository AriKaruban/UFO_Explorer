import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit {
map
view
  constructor() { }
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Map, MapView,FeatureLayer,WMSLayer,BasemapToggle,Legend,Expand, UniqueValueRenderer,SimpleRenderer ] = await loadModules(["esri/Map", "esri/views/MapView","esri/layers/FeatureLayer","esri/layers/WMSLayer",
      "esri/widgets/BasemapToggle", "esri/widgets/Expand","esri/renderers/UniqueValueRenderer","esri/renderers/SimpleRenderer"]);
      
  
      this.map = new Map({
        basemap: "osm"
      });
  
      // Initialize the MapView
      this.view = new MapView({
        container: this.mapViewEl.nativeElement,
        center: [-95.7129,37.0902],
        zoom: 5,
        map: this.map,
        highlightOptions: {
          color: [255, 255, 0, 1],
          haloOpacity: 0.9,
          fillOpacity: 0.2
        }
      });
      // if(window.innerWidth<1000){
      //   this.view.center=[this.slidedata[0].lon+.6, this.slidedata[0].lat-.335];
      //   this.view.zoom = this.slidedata[0].zoom-1;
      // }
      var basemapToggle = new BasemapToggle({
        view: this.view, // The view that provides access to the map's "streets" basemap
        nextBasemap: "streets" // Allows for toggling to the "hybrid" basemap
      });
      const lyr = new FeatureLayer({
        portalItem: {  // autocasts as new PortalItem()
          id: "83be8ca54c5e4766a32089a166c5f51c"
        },  // the first layer in the service is returned
        popupEnabled:true,
        popupTemplate:{
          // autocasts as new PopupTemplate()
          title: "{LongLabel}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "OccuredDat",
                  label: "Date"
                },
                {
                  fieldName: "OccurredTi",
                  label: "Time"
                },
                {
                  fieldName: "duration",
                  label: "Duration"
                },
                {
                  fieldName: "shape_1",
                  label: "UFO shape"
                },
                {
                  fieldName: "Descriptio",
                  label: "Description"
                }
              ]
            }
          ]
        }
      });
      this.map.add(lyr)
      return this.view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  
  }
  
  ngOnInit(): void {
    this.initializeMap();
  }
  ngOnDestroy() {
    
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
}
