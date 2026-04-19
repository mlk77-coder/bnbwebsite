"use client";
import {
  GoogleMap,
  Libraries,
  Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

const libraries: Libraries = ["places"];

type PropsType = {
  value: {
    lat?: number | undefined;
    lng?: number | undefined;
  };
  center: {
    lat: number;
    lng: number;
  };
  setValue: Dispatch<
    SetStateAction<{
      lat?: number | undefined;
      lng?: number | undefined;
    }>
  >;
  setAddressInput: (address: string) => void;

  city: string;
  country: string;
  cities: {
    id: number;
    name: string;
    lat: number;
    lng: number;
    type: string;
  }[];
};

const fetchGeoJson = async (country: string) => {
  if (country === "") return [];
  const url =
    country === "1"
      ? "/geo-json/sy.json"
      : country === "2"
      ? "/geo-json/lb.json"
      : "/geo-json/ae.json";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error fetching geo data");
  }
  const geoData = await response.json();
  return geoData;
};

const SelectLocation: FC<PropsType> = ({
  value,
  setValue,
  setAddressInput,
  center,
  city,
  cities,
  country,
}) => {
  const [coordinates, setCoordinates] = useState([]);
  const [isBrowser, setIsBrowser] = useState(false);
  const [zoom, setZoom] = useState(6);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA5EkTtHcoT_X7jWLGlfkj-sV4K0nIt8ZM",
    libraries,
  });
  const {
    data: geoData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["geoData", country],
    queryFn: () => fetchGeoJson(country),
    staleTime: Infinity,
    enabled: country !== "",
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (city) {
      setZoom(9);
    } else {
      setZoom(6);
    }
  }, [city]);

  useEffect(() => {
    if (geoData && !error && !isLoading) {
      const selectedFeature = geoData.features.find(
        (feature: any) =>
          feature.properties.name ===
          cities.find((c) => c.id.toString() === city)?.type
      );
      if (selectedFeature) {
        const cityCoordinates = selectedFeature.geometry.coordinates[0].map(
          (coord: any[]) => ({ lat: coord[1], lng: coord[0] })
        );
        setCoordinates(cityCoordinates);
      } else {
        setCoordinates([]);
      }
    }
  }, [geoData, city, cities, isLoading, error]);
  useEffect(() => {
    if (value.lat && value.lng && isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat: value.lat, lng: value.lng };

      geocoder.geocode(
        { location: latlng, language: "en" },
        (results, status) => {
          if (status === "OK" && results && results[0]) {
            const add = `${
              results[0].address_components.find((c) =>
                c.types.includes("route")
              )?.long_name || ""
            } ${
              results[0].address_components.find((c) =>
                c.types.includes("sublocality_level_1")
              )?.long_name || ""
            }`;
            setAddressInput(
              add.trim().length === 0 ? "لم يتم تحديد الموقع" : add
            );
            // 'political'
          } else {
            console.error("فشل geocoder بسبب: " + status);
          }
        }
      );
    }
  }, [value.lat, value.lng, isLoaded]);

  if (!isLoaded) return <div>Loading...</div>;
  if (!isBrowser) return null;

  return (
    <GoogleMap
      mapContainerClassName="w-full h-[500px]"
      center={center}
      zoom={zoom}
    >
      {coordinates.length > 0 && (
        <Polygon
          onClick={(e) => {
            const lat = e.latLng?.lat();
            const lng = e.latLng?.lng();
            setValue({ lat, lng });
          }}
          paths={coordinates}
          options={{
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />
      )}
      {value.lat && value.lng ? (
        <Marker position={{ lat: value.lat, lng: value.lng }} />
      ) : null}
    </GoogleMap>
  );
};

export default SelectLocation;
