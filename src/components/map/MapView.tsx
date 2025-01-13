import { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import LayerList from "@arcgis/core/widgets/LayerList";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import Polyline from "@arcgis/core/geometry/Polyline";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

import {
  powerAssets,
  PowerAsset,
  transmissionLines,
} from "../../data/mock/infrastructureData";
import MapControls from "./MapControls";

const InfrastructureMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [layers, setLayers] = useState<{
    substationLayer: __esri.GraphicsLayer | null;
    powerPlantLayer: __esri.GraphicsLayer | null;
    renewableLayer: __esri.GraphicsLayer | null;
    linesLayer: __esri.GraphicsLayer | null;
  }>({
    substationLayer: null,
    powerPlantLayer: null,
    renewableLayer: null,
    linesLayer: null,
  });

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      basemap: "topo-vector",
    });

    const view = new MapView({
      container: mapRef.current,
      map: map,
      zoom: 5,
      center: [-99.7, 31.5], // Centered on Texas
      popup: {
        dockEnabled: false,
        // autoOpenEnabled: true,
        alignment: "top-center",
        defaultPopupTemplateEnabled: true,
        highlightEnabled: true,
      },
      constraints: {
        minZoom: 3,
        maxZoom: 15,
        snapToZoom: true,
      },
      navigation: {
        mouseWheelZoomEnabled: true,
        browserTouchPanEnabled: true,
      },
      highlightOptions: {
        // color: [255, 255, 0, 0.3],
        haloOpacity: 0.9,
        fillOpacity: 0.2,
      },
      padding: {
        top: 50,
        bottom: 0,
        left: 0,
        right: 0,
      },
    });

    const getPopupTemplate = (asset: PowerAsset) => {
      return new PopupTemplate({
        title: `<div style="font-size: 18px; font-weight: 600; padding: 8px 0;">${asset.name}</div>`,
        content: [
          {
            type: "text",
            text: `
              <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
                  <span style="font-weight: 600;">Type:</span>
                  <span style="padding: 4px 12px; background-color: #f3f4f6; border-radius: 4px;">${
                    asset.type
                  }</span>
                </div>
    
                <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
                  <span style="font-weight: 600;">Status:</span>
                  <span style="padding: 4px 12px; background-color: ${
                    asset.status === "operational"
                      ? "#dcfce7"
                      : asset.status === "maintenance"
                      ? "#fef9c3"
                      : "#fee2e2"
                  }; border-radius: 4px; color: ${
              asset.status === "operational"
                ? "#166534"
                : asset.status === "maintenance"
                ? "#854d0e"
                : "#991b1b"
            };">${asset.status}</span>
                </div>
    
                <div style="margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span style="font-weight: 600;">Health:</span>
                    <span>${asset.metrics.health}%</span>
                  </div>
                  <div style="width: 100%; background-color: #e5e7eb; height: 8px; border-radius: 9999px;">
                    <div style="width: ${
                      asset.metrics.health
                    }%; background-color: #2563eb; height: 100%; border-radius: 9999px;"></div>
                  </div>
                </div>
    
                <div style="margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span style="font-weight: 600;">Efficiency:</span>
                    <span>${asset.metrics.efficiency}%</span>
                  </div>
                  <div style="width: 100%; background-color: #e5e7eb; height: 8px; border-radius: 9999px;">
                    <div style="width: ${
                      asset.metrics.efficiency
                    }%; background-color: #16a34a; height: 100%; border-radius: 9999px;"></div>
                  </div>
                </div>
    
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 600;">Uptime:</span>
                  <span style="padding: 4px 12px; background-color: #f3f4f6; border-radius: 4px; ">${
                    asset.metrics.uptime
                  }%</span>
                </div>
              </div>
            `,
          },
        ],
      });
    };

    // Create layers and add graphics
    const substationLayer = new GraphicsLayer({
      title: "Substations",
      listMode: "show",
    });

    const powerPlantLayer = new GraphicsLayer({
      title: "Power Plants",
      listMode: "show",
    });

    const renewableLayer = new GraphicsLayer({
      title: "Renewable Sources",
      listMode: "show",
    });

    const linesLayer = new GraphicsLayer({
      title: "Transmission Lines",
      listMode: "show",
    });

    setLayers({
      substationLayer,
      powerPlantLayer,
      renewableLayer,
      linesLayer,
    });

    map.addMany([linesLayer, substationLayer, powerPlantLayer, renewableLayer]);

    powerAssets.forEach((asset) => {
      const point = new Point({
        longitude: asset.location.coordinates[0],
        latitude: asset.location.coordinates[1],
        spatialReference: { wkid: 4326 }  // WGS84 spatial reference
      });

      const symbol = new SimpleMarkerSymbol({
        style: "circle",
        color: asset.type === "powerPlant" ? [255, 0, 0, 0.8] : [0, 255, 0, 0.8],
        outline: {
          color: [255, 255, 255],
          width: 1
        },
        size: 12
      });

      const graphic = new Graphic({
        geometry: point,
        symbol: symbol,
        attributes: asset,
        popupTemplate: getPopupTemplate(asset), // Attach PopupTemplate
      });

      switch (asset.type) {
        case "substation":
          substationLayer.add(graphic);
          break;
        case "powerPlant":
          powerPlantLayer.add(graphic);
          break;
        case "windFarm":
        case "solarFarm":
          renewableLayer.add(graphic);
          break;
      }
    });

    transmissionLines.forEach((connection) => {
      const fromAsset = powerAssets.find((a) => a.id === connection.from);
      const toAsset = powerAssets.find((a) => a.id === connection.to);

      if (fromAsset && toAsset) {
        const line = new Polyline({
          paths: [[
            [fromAsset.location.coordinates[0], fromAsset.location.coordinates[1]],
            [toAsset.location.coordinates[0], toAsset.location.coordinates[1]]
          ]]
        });

        const lineSymbol = {
          type: "simple-line",
          color:
            connection.voltage === "500kV"
              ? [255, 0, 0, 0.8]
              : connection.voltage === "230kV"
              ? [255, 165, 0, 0.8]
              : [255, 255, 0, 0.8],
          width:
            connection.voltage === "500kV"
              ? 3
              : connection.voltage === "230kV"
              ? 2
              : 1,
          style: "solid",
        };

        const lineGraphic = new Graphic({
          geometry: line,
          symbol: lineSymbol,
          attributes: {
            voltage: connection.voltage,
            fromAsset: fromAsset.name,
            toAsset: toAsset.name,
          },
          popupTemplate: {
            title: `<div style="font-size: 18px; font-weight: 600; padding: 8px 0;">Transmission Line</div>`,
            content: [
              {
                type: "text",
                text: `
                <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
                    <span style="font-weight: 600;">Voltage:</span>
                    <span style="padding: 4px 12px; background-color: ${
                      connection.voltage === "500kV"
                        ? "#fee2e2"
                        : connection.voltage === "230kV"
                        ? "#fef9c3"
                        : "#dcfce7"
                    }; border-radius: 4px; color: ${
                  connection.voltage === "500kV"
                    ? "#991b1b"
                    : connection.voltage === "230kV"
                    ? "#854d0e"
                    : "#166534"
                };">${connection.voltage}</span>
                  </div>
          
                  <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
                    <span style="font-weight: 600;">From:</span>
                    <span style="padding: 4px 12px; background-color: #f3f4f6; border-radius: 4px;">${
                      fromAsset.name
                    }</span>
                  </div>
          
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600;">To:</span>
                    <span style="padding: 4px 12px; background-color: #f3f4f6; border-radius: 4px;">${
                      toAsset.name
                    }</span>
                  </div>
                </div>
              `,
              },
            ],
          },
        });
        linesLayer.add(lineGraphic);
      }
    });

    // const layerList = new LayerList({
    //   view: view,
    // });

    // view.ui.add(layerList, "top-right");

    return () => {
      view?.destroy();
    };
  }, []);

  const handleSearch = (term: string) => {
    if (!layers.substationLayer || !layers.powerPlantLayer || !layers.renewableLayer) return;
  
    const allLayers = [layers.substationLayer, layers.powerPlantLayer, layers.renewableLayer];
  
    if (!term) {
      // Show all assets
      allLayers.forEach(layer => {
        layer.graphics.forEach(graphic => {
          graphic.visible = true;
        });
      });
      return;
    }
  
    // Search through all graphics
    allLayers.forEach(layer => {
      layer.graphics.forEach(graphic => {
        const attributes = graphic.attributes;
        if (attributes) {
          const match =
            attributes.name?.toLowerCase().includes(term.toLowerCase()) ||
            attributes.type?.toLowerCase().includes(term.toLowerCase());
          graphic.visible = match;
        }
      });
    });
  };

  const handleFilter = (filters: { types: string[]; statuses: string[] }) => {
  if (!layers.substationLayer || !layers.powerPlantLayer || !layers.renewableLayer) return;

  const allLayers = [layers.substationLayer, layers.powerPlantLayer, layers.renewableLayer];
    
  allLayers.forEach(layer => {
    layer.graphics.forEach(graphic => {
      const attributes = graphic.attributes;
      if (attributes) {
        const typeMatch = filters.types.includes(attributes.type);
        const statusMatch = filters.statuses.includes(attributes.status);
        graphic.visible = typeMatch && statusMatch;
      }
    });
  });
};

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <MapControls onSearch={handleSearch} onFilterChange={handleFilter} />
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default InfrastructureMap;
