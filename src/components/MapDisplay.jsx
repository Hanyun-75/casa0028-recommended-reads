import { Map, Source, Layer, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { plaqueData } from "../data/open-plaques-london-2023-11-10-filtered";

const plaqueLayerStyle = {
  id: "plaques-layer",
  type: "circle",
  paint: {
    "circle-radius": 6,
    "circle-color": "#905aa1",
    "circle-stroke-width": 2,
    "circle-stroke-color": "#e8cfde",
  },
};

const femaleBluePlaques = {
  ...plaqueData,
  features: plaqueData.features.filter((f) => {
    const p = f.properties || {};
    const colour = (p.colour || "").toLowerCase();
    const sex = (p.lead_subject_sex || "").toLowerCase();
    const [lon, lat] = f.geometry?.coordinates || [];
    const hasCoords = Number.isFinite(lon) && Number.isFinite(lat);
    return colour === "blue" && sex === "female" && hasCoords;
  }),
};

export default function MapDisplay(props) {
  const handleMapClick = (event) => {
    const features = event?.features ?? [];
    if (!features.length) return;

    const clickedFeature = features[0];

    // 关键：把 GeoJSON feature 的结构保留下来
    props.setSelectedPlaque({
      geometry: clickedFeature.geometry,
      properties: clickedFeature.properties,
    });
  };

  const p = props.selectedPlaque?.properties;
  const coords = props.selectedPlaque?.geometry?.coordinates;

  return (
    <Map
      initialViewState={{
        longitude: props.longitude ?? -0.1276,
        latitude: props.latitude ?? 51.5074,
        zoom: props.zoom ?? 12,
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      interactiveLayerIds={["plaques-layer"]}
      onClick={handleMapClick}
    >
      <Source id="plaques-data" type="geojson" data={femaleBluePlaques}>
        <Layer {...plaqueLayerStyle} />
      </Source>

      {p && coords && (
        <Popup
          anchor="bottom"
          longitude={coords[0]}
          latitude={coords[1]}
          onClose={() => props.setSelectedPlaque(null)}
          closeOnClick={false}
        >
          <div>
            <h2 className="text-xl font-semibold mb-2">{p.lead_subject_name}</h2>

            <p className="text-sm text-gray-500">
              {(p.inscription || "").slice(0, 150)}
            </p>

            <p className="text-xs text-blue-500 my-2">
              <a
                href={`https://openplaques.org/plaques/${p.id1}`}
                target="_blank"
                rel="noreferrer"
              >
                OpenPlaques
              </a>
            </p>

            {p.lead_subject_wikipedia && (
              <p className="text-xs text-blue-500 my-2">
                <a href={p.lead_subject_wikipedia} target="_blank" rel="noreferrer">
                  Wikipedia
                </a>
              </p>
            )}

            <button
              className="rounded-l-sm border border-gray-200 px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
              onClick={() => props.setIsModalOpen(true)}
            >
              Recommended Reading
            </button>
          </div>
        </Popup>
      )}
    </Map>
  );
}
