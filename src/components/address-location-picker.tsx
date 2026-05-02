"use client";

import { AddAddressSchema } from "@/schemas/addresses.schema";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { LocateFixed } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useCallback, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "./ui/button";

type PropsType = {
  form: UseFormReturn<AddAddressSchema>;
};

type AddressComponent = {
  long_name: string;
  types: string[];
};

const defaultCenter = {
  lat: 33.5138,
  lng: 36.2765,
};

const getAddressComponent = (
  components: AddressComponent[],
  types: string[]
) =>
  components.find((component) =>
    types.some((type) => component.types.includes(type))
  )?.long_name || "";

const AddressLocationPicker: FC<PropsType> = ({ form }) => {
  const t = useTranslations();
  const latitude = form.watch("latitude");
  const longitude = form.watch("longitude");
  const selectedLocation = useMemo(() => {
    const lat = Number(latitude);
    const lng = Number(longitude);

    return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
  }, [latitude, longitude]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      "AIzaSyDKR1ZaGk-Is5GKCln82RM6375QlQwnUa4",
  });

  const applyGeocodedAddress = useCallback(
    (location: { lat: number; lng: number }) => {
      if (!isLoaded || !window.google?.maps) return;

      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ location, language: "en" }, (results, status) => {
        if (status !== "OK" || !results?.[0]) return;

        const result = results[0];
        const components = result.address_components as AddressComponent[];
        const streetNumber = getAddressComponent(components, [
          "street_number",
        ]);
        const route = getAddressComponent(components, ["route"]);
        const area = getAddressComponent(components, [
          "sublocality_level_1",
          "sublocality",
          "neighborhood",
          "administrative_area_level_3",
        ]);
        const city = getAddressComponent(components, [
          "locality",
          "administrative_area_level_2",
          "administrative_area_level_1",
        ]);

        if (city) {
          form.setValue("city", city, { shouldDirty: true });
        }

        if (area) {
          form.setValue("area", area, { shouldDirty: true });
        }

        if (route) {
          form.setValue("street_address", route, { shouldDirty: true });
        }

        if (streetNumber) {
          form.setValue("building_number", streetNumber, {
            shouldDirty: true,
          });
        }

        if (result.formatted_address && !form.getValues("details")) {
          form.setValue("details", result.formatted_address, {
            shouldDirty: true,
          });
        }
      });
    },
    [form, isLoaded]
  );

  const setLocation = useCallback(
    (location: { lat: number; lng: number }) => {
      form.setValue("latitude", location.lat.toString(), {
        shouldDirty: true,
      });
      form.setValue("longitude", location.lng.toString(), {
        shouldDirty: true,
      });
      applyGeocodedAddress(location);
    },
    [applyGeocodedAddress, form]
  );

  const setCurrentLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium capitalize">
          {t("address-fields.location")}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={setCurrentLocation}
        >
          <LocateFixed className="size-4" />
          {t("address-fields.use-current-location")}
        </Button>
      </div>
      <div className="overflow-hidden rounded-2xl border">
        {isLoaded ? (
          <GoogleMap
            mapContainerClassName="h-72 w-full"
            center={selectedLocation || defaultCenter}
            zoom={selectedLocation ? 14 : 11}
            onClick={(event) => {
              const lat = event.latLng?.lat();
              const lng = event.latLng?.lng();

              if (lat === undefined || lng === undefined) return;

              setLocation({ lat, lng });
            }}
          >
            {selectedLocation ? <Marker position={selectedLocation} /> : null}
          </GoogleMap>
        ) : (
          <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
            {t("address-fields.loading-map")}
          </div>
        )}
      </div>
      {selectedLocation ? (
        <p className="text-xs text-muted-foreground">
          {t("address-fields.selected-coordinates", {
            latitude: selectedLocation.lat.toFixed(6),
            longitude: selectedLocation.lng.toFixed(6),
          })}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          {t("address-fields.pick-location")}
        </p>
      )}
    </div>
  );
};

export default AddressLocationPicker;
