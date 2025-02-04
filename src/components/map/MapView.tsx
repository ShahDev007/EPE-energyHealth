import { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import Polyline from "@arcgis/core/geometry/Polyline";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import {
  powerAssets,
  PowerAsset,
  transmissionLines,
} from "../../data/mock/infrastructureData";
// import MapControls from "./MapControls";

const InfrastructureMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  // const [layers, setLayers] = useState<{
  //   substationLayer: __esri.GraphicsLayer | null;
  //   renewableLayer: __esri.GraphicsLayer | null;
  //   linesLayer: __esri.GraphicsLayer | null;
  // }>({
  //   substationLayer: null,
  //   renewableLayer: null,
  //   linesLayer: null,
  // });

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      basemap: "topo-vector",
    });

    const view = new MapView({
      container: mapRef.current,
      map: map,
      zoom: 5,
      center: [-99.7, 31.5],
      popup: {
        dockEnabled: false,
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

    // API Endpoint data

    const transmissionFeatureLayer = new FeatureLayer({
      url: "https://services2.arcgis.com/FiaPA4ga0iQKduv3/arcgis/rest/services/US_Electric_Power_Transmission_Lines/FeatureServer/0",
      renderer: {
        type: "unique-value", // Use unique-value renderer for categorization
        field: "STATUS", // Field to categorize by
        uniqueValueInfos: [
          {
            value: "In Service", // Value for "In Service"
            symbol: {
              type: "simple-line",
              color: "#00FF00", // Green for "In Service"
              width: "1.5px",
              style: "solid",
            },
            label: "In Service",
          },
          {
            value: "Not Available", // Value for "Not Available"
            symbol: {
              type: "simple-line",
              color: "#FF0000", // Red for "Not Available"
              width: "1.5px",
              style: "solid",
            },
            label: "Not Available",
          },
        ],
        visualVariables: [
          {
            type: "size",
            field: "VOLTAGE",
            minDataValue: 69,
            maxDataValue: 765,
            minSize: 1,
            maxSize: 4,
          },
        ],
      } as any,
      popupTemplate: {
        title: `<div style="margin-top: 28px;"><h1><b>{OWNER}</b></h1><div>`,
        content: [
          {
            type: "fields",
            fieldInfos: [
              { fieldName: "VOLTAGE", label: "Voltage (kV)" },
              { fieldName: "STATUS", label: "Status" },
            ],
          },
        ],
      },
    });

    map.add(transmissionFeatureLayer);

    // const isoLayer = new FeatureLayer({
    //   url: "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Independent_System_Operator/FeatureServer/0",
    //   outFields: ["*"],
    //   renderer: {
    //     type: "simple",
    //     symbol: {
    //       type: "simple-fill",
    //       color: [70, 130, 180, 0.3],
    //       outline: {
    //         color: [0, 0, 139],
    //         width: 1
    //       }
    //     }
    //   },
    //   popupTemplate: {
    //     title: "{ISO_Name}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           { fieldName: "ISO_RTO", label: "ISO/RTO" },
    //           { fieldName: "STATES", label: "States" }
    //         ]
    //       }
    //     ]
    //   }
    // });
    // map.add(isoLayer);

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

    const substationLayer = new GraphicsLayer({
      title: "Substations",
      listMode: "show",
    });

    // Querynig to find all types here

    // const query = powerPlantLayer.createQuery();
    // query.outFields = ["PRIM_FUEL"];
    // query.returnDistinctValues = true;

    // powerPlantLayer.queryFeatures(query).then(function (response) {
    //   const uniqueFuelTypes = response.features.map(
    //     (feature) => feature.attributes.PRIM_FUEL
    //   );
    //   const distinctFuelTypes = [...new Set(uniqueFuelTypes)]; 
    //   console.log(distinctFuelTypes); 
    // });

    const fuelTypeSymbols = {
      DFO: {
        symbol: {
          type: "simple-marker",
          color: [139, 69, 19], // Brown for Distillate Fuel Oil
          size: 8,
        },
      },
      WAT: {
        symbol: {
          type: "simple-marker",
          color: [0, 0, 255], // Blue for Hydroelectric
          size: 8,
        },
      },
      NG: {
        symbol: {
          type: "simple-marker",
          color: [255, 165, 0], // Orange for Natural Gas
          size: 8,
        },
      },
      BIT: {
        symbol: {
          type: "simple-marker",
          color: [0, 0, 0], // Black for Bituminous Coal
          size: 8,
        },
      },
      NUC: {
        symbol: {
          type: "simple-marker",
          color: [255, 0, 0], // Red for Nuclear
          size: 8,
        },
      },
      LIG: {
        symbol: {
          type: "simple-marker",
          color: [139, 69, 19], // Brown for Lignite Coal
          size: 8,
        },
      },
      SUB: {
        symbol: {
          type: "simple-marker",
          color: [0, 0, 0], // Black for Sub-bituminous Coal
          size: 8,
        },
      },
      SUN: {
        symbol: {
          type: "simple-marker",
          color: [255, 255, 0], // Yellow for Solar
          size: 8,
        },
      },
      RC: {
        symbol: {
          type: "simple-marker",
          color: [128, 128, 128], // Gray for Refuse-derived Fuel
          size: 8,
        },
      },
      MSW: {
        symbol: {
          type: "simple-marker",
          color: [169, 169, 169], // Dark Gray for Municipal Solid Waste
          size: 8,
        },
      },
      KER: {
        symbol: {
          type: "simple-marker",
          color: [255, 255, 255], // White for Kerosene
          size: 8,
        },
      },
      RFO: {
        symbol: {
          type: "simple-marker",
          color: [105, 105, 105], // Dim Gray for Residual Fuel Oil
          size: 8,
        },
      },
      "NOT AVAILABLE": {
        symbol: {
          type: "simple-marker",
          color: [192, 192, 192], // Gray for Not Available
          size: 8,
        },
      },
      JF: {
        symbol: {
          type: "simple-marker",
          color: [0, 255, 255], // Cyan for Jet Fuel
          size: 8,
        },
      },
      WDS: {
        symbol: {
          type: "simple-marker",
          color: [139, 69, 19], // Brown for Wood
          size: 8,
        },
      },
      SGC: {
        symbol: {
          type: "simple-marker",
          color: [255, 20, 147], // Deep Pink for Synthetic Gas
          size: 8,
        },
      },
      OG: {
        symbol: {
          type: "simple-marker",
          color: [255, 99, 71], // Tomato for Oil and Gas
          size: 8,
        },
      },
      WND: {
        symbol: {
          type: "simple-marker",
          color: [0, 255, 0], // Green for Wind
          size: 8,
        },
      },
      WC: {
        symbol: {
          type: "simple-marker",
          color: [139, 137, 137], // Slate Gray for Waste Coal
          size: 8,
        },
      },
      PC: {
        symbol: {
          type: "simple-marker",
          color: [0, 0, 0], // Black for Pulverized Coal
          size: 8,
        },
      },
      LFG: {
        symbol: {
          type: "simple-marker",
          color: [255, 255, 255], // White for Landfill Gas
          size: 8,
        },
      },
      WO: {
        symbol: {
          type: "simple-marker",
          color: [139, 69, 19], // Brown for Wood Oil
          size: 8,
        },
      },
    };

    type FuelTypeSymbols = {
      [key in 'DFO' | 'WAT' | 'NG' | 'BIT' | 'WO']: {
        symbol: {
          type: string;
          color: number[];
          size: number;
        };
      };
    };
    
    // Now this should work without error
    const uniqueValueInfos = Object.keys(fuelTypeSymbols).map((fuelType) => ({
      value: fuelType,
      symbol: fuelTypeSymbols[fuelType as keyof FuelTypeSymbols].symbol,
    }));

    const powerPlantLayer = new FeatureLayer({
      url: "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Plants_gdb/FeatureServer/0",
      outFields: ["*"],
      renderer: {
        type: "unique-value",
        field: "PRIM_FUEL",
        defaultSymbol: {
          type: "simple-marker",
          color: [128, 128, 128],
          size: 8,
        },
        uniqueValueInfos: uniqueValueInfos,
      } as any,
      popupTemplate: {
        title: `<div style="margin-top: 28px;"><h1><b>{Name}</b></h1><div>`,
        content: [
          {
            type: "text",
            text: `
              <div style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <div style="margin-bottom: 8px;">
                  <span style="font-weight: 600;">Status:</span>
                  <span style="margin-left: 8px;">{Status}</span>
                </div>
                <div style="margin-bottom: 8px;">
                  <span style="font-weight: 600;">Primary Fuel:</span>
                  <span style="margin-left: 8px;">{PRIM_FUEL}</span>
                </div>
                <div style="margin-bottom: 8px;">
                  <span style="font-weight: 600;">Capacity:</span>
                  <span style="margin-left: 8px;">{CAP_FACTOR} MW</span>
                </div>
              </div>
            `,
          },
        ],
      },
    });

    map.add(powerPlantLayer);

    const renewableLayer = new GraphicsLayer({
      title: "Renewable Sources",
      listMode: "show",
    });

    const linesLayer = new GraphicsLayer({
      title: "Transmission Lines",
      listMode: "show",
    });

    // setLayers({
    //   substationLayer,
    //   renewableLayer,
    //   linesLayer,
    // });

    const getSymbolColor = (assetType: string, status: string) => {
      if (status !== "operational") {
        return [255, 165, 0, 0.8];
      }

      switch (assetType) {
        case "powerPlant":
          return [255, 0, 0, 0.8];
        case "solarFarm":
          return [255, 215, 0, 0.8];
        case "windFarm":
          return [0, 191, 255, 0.8]; // Deep sky blue for wind
        case "substation":
          return [148, 0, 211, 0.8]; // Dark violet for substations
        default:
          return [128, 128, 128, 0.8]; // Gray for unknown
      }
    };

    powerAssets.forEach((asset) => {
      const point = new Point({
        longitude: asset.location.coordinates[0],
        latitude: asset.location.coordinates[1],
        spatialReference: { wkid: 4326 },
      });

      const symbol = new SimpleMarkerSymbol({
        style: "circle",
        color: getSymbolColor(asset.type, asset.status),
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
        size: 12,
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
          paths: [
            [
              [
                fromAsset.location.coordinates[0],
                fromAsset.location.coordinates[1],
              ],
              [
                toAsset.location.coordinates[0],
                toAsset.location.coordinates[1],
              ],
            ],
          ],
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

    return () => {
      view?.destroy();
    };
  }, []);

  //   const handleSearch = (term: string) => {
  //     if (!layers.substationLayer || !layers.renewableLayer) return;

  //     const allLayers = [layers.substationLayer, layers.renewableLayer];

  //     if (!term) {
  //       allLayers.forEach(layer => {
  //         layer.graphics.forEach(graphic => {
  //           graphic.visible = true;
  //         });
  //       });
  //       return;
  //     }

  //     allLayers.forEach(layer => {
  //       layer.graphics.forEach(graphic => {
  //         const attributes = graphic.attributes;
  //         if (attributes) {
  //           const match =
  //             attributes.name?.toLowerCase().includes(term.toLowerCase()) ||
  //             attributes.type?.toLowerCase().includes(term.toLowerCase());
  //           graphic.visible = match;
  //         }
  //       });
  //     });
  //   };

  //   const handleFilter = (filters: { types: string[]; statuses: string[] }) => {
  //   if (!layers.substationLayer || !layers.renewableLayer) return;

  //   const allLayers = [layers.substationLayer, layers.renewableLayer];

  //   allLayers.forEach(layer => {
  //     layer.graphics.forEach(graphic => {
  //       const attributes = graphic.attributes;
  //       if (attributes) {
  //         const typeMatch = filters.types.includes(attributes.type);
  //         const statusMatch = filters.statuses.includes(attributes.status);
  //         graphic.visible = typeMatch && statusMatch;
  //       }
  //     });
  //   });
  // };

  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* <MapControls onSearch={handleSearch} onFilterChange={handleFilter} /> */}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default InfrastructureMap;
