export const syrianGovernorates = [
  {
    type: "Damascus",
    name: "countries.syria.cities.1",
    lat: 33.5138,
    lng: 36.2765,
  },
  {
    type: "Rif Dimashq",
    name: "countries.syria.cities.2",
    lat: 33.5138,
    lng: 36.2765,
  },
  {
    type: "Aleppo",
    name: "countries.syria.cities.3",
    lat: 36.2154,
    lng: 37.1596,
  },
  {
    type: "Homs (Hims)",
    name: "countries.syria.cities.4",
    lat: 34.7308,
    lng: 36.709,
  },
  {
    type: "Hamah",
    name: "countries.syria.cities.5",
    lat: 35.1318,
    lng: 36.7578,
  },
  {
    type: "Lattakia",
    name: "countries.syria.cities.6",
    lat: 35.5392,
    lng: 35.7806,
  },
  {
    type: "Tartus",
    name: "countries.syria.cities.7",
    lat: 34.8846,
    lng: 35.8866,
  },
  {
    type: "Dayr Az Zawr",
    name: "countries.syria.cities.8",
    lat: 35.3333,
    lng: 40.15,
  },
  {
    type: "Hasaka (Al Haksa)",
    name: "countries.syria.cities.9",
    lat: 36.483,
    lng: 40.743,
  },
  {
    type: "Dar`a",
    name: "countries.syria.cities.10",
    lat: 32.6189,
    lng: 36.102,
  },
  {
    type: "As Suwayda'",
    name: "countries.syria.cities.11",
    lat: 32.709,
    lng: 36.569,
  },
  {
    type: "Quneitra",
    name: "countries.syria.cities.12",
    lat: 33.125,
    lng: 35.8236,
  },
  {
    type: "Idlib",
    name: "countries.syria.cities.13",
    lat: 35.9306,
    lng: 36.6336,
  },
  {
    type: "Ar Raqqah",
    name: "countries.syria.cities.14",
    lat: 35.9594,
    lng: 39.0096,
  },
].map((city, index) => ({ ...city, id: index + 1 }));

export const lebaneseGovernorates = [
  {
    type: "Beirut",
    name: "countries.lebanon.cities.1",
    lat: 33.8938,
    lng: 35.5018,
  },
  {
    type: "Mount Lebanon",
    name: "countries.lebanon.cities.2",
    lat: 33.8333,
    lng: 35.5444,
  },
  {
    type: "North",
    name: "countries.lebanon.cities.3",
    lat: 34.4367,
    lng: 35.8497,
  },
  {
    type: "Akkar",
    name: "countries.lebanon.cities.4",
    lat: 34.543,
    lng: 36.079,
  },
  {
    type: "Bekaa",
    name: "countries.lebanon.cities.5",
    lat: 33.8548,
    lng: 35.9042,
  },
  {
    type: "Baalbek-El Hermel",
    name: "countries.lebanon.cities.6",
    lat: 34.004,
    lng: 36.211,
  },
  {
    type: "El Nabatieh",
    name: "countries.lebanon.cities.7",
    lat: 33.3789,
    lng: 35.4833,
  },
  {
    type: "South",
    name: "countries.lebanon.cities.8",
    lat: 33.555,
    lng: 35.375,
  },
].map((city, index) => ({ ...city, id: index + 1 }));

export const uaeEmirates = [
  {
    type: "Abu Dhabi",
    name: "countries.eau.cities.1",
    lat: 24.4539,
    lng: 54.3773,
  },
  { type: "Dubay", name: "countries.eau.cities.2", lat: 25.2048, lng: 55.2708 },
  {
    type: "Sharjah",
    name: "countries.eau.cities.3",
    lat: 25.3463,
    lng: 55.4209,
  },
  { type: "Ajman", name: "countries.eau.cities.4", lat: 25.4052, lng: 55.5136 },
  {
    type: "Umm Al Qaywayn",
    name: "countries.eau.cities.5",
    lat: 25.548,
    lng: 55.5552,
  },
  {
    type: "Ras Al Khaymah",
    name: "countries.eau.cities.6",
    lat: 25.8,
    lng: 55.9764,
  },
  {
    type: "Fujayrah",
    name: "countries.eau.cities.7",
    lat: 25.1287,
    lng: 56.3265,
  },
].map((city, index) => ({ ...city, id: index + 1 }));

export const countries = [
  { id: 1, name: "countries.syria.name", lat: 34.8021, lng: 38.9968 },
  { id: 2, name: "countries.lebanon.name", lat: 33.8547, lng: 35.8623 },
  { id: 3, name: "countries.eau.name", lat: 23.4241, lng: 53.8478 },
];
