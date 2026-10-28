/**
 * Catalog port of the original Eclipse Markisen PWA (Step 8 FULL + Step 16).
 * The 299 source records, including item/variation IDs, remain unchanged.
 * Fabric display names and images use the corrected Step 16 UI definitions.
 * This catalog describes existing combinations, not live stock or prices.
 */
export type ModelId = 'vollkassette' | 'halbkassette' | 'gelenkarm';
export type HousingId = 'white' | 'basalt' | 'anthracite';
export type Operation = 'Standard' | 'Elektrisch' | 'Manuell';
export interface SizeOption { key: string; widthMm: number; projectionMm: number; label: string }
export interface HousingOption { id: HousingId; name: string; hex: string }
export interface FabricOption { code: string; name: string; file: string }
export interface Variant {
  itemId: number;
  variationId: number;
  variationNumber: string;
  operation?: 'Standard' | 'Elektrisch';
  housing: string;
  widthMm: number;
  projectionMm: number;
  fabricCode: string;
  /** Original source label; use ResolvedSelection.fabric.name for the UI. */
  fabricName: string;
}
export interface Selection {
  model: ModelId;
  operation: Operation;
  sizeKey: string;
  housing: HousingId;
  fabric: string;
}
export interface Family {
  id: ModelId;
  name: string;
  sizes: readonly SizeOption[];
  housings: readonly HousingOption[];
  fabrics: readonly FabricOption[];
  operations: readonly Operation[];
  defaultSelection: Readonly<Selection>;
  variants: readonly Variant[];
}
export interface ResolvedSelection {
  selection: Selection;
  family: Family;
  size: SizeOption;
  housing: HousingOption;
  fabric: FabricOption;
  variant: Variant | null;
  availableSizeKeys: Set<string>;
  availableHousingIds: Set<string>;
  availableFabricCodes: Set<string>;
  /** True if an explicitly supplied choice was changed to an existing combination. */
  changed: boolean;
}

export const families: readonly Family[] = [
  {
    "id": "vollkassette",
    "name": "Vollkassettenmarkise",
    "sizes": [{"key":"2000x1500","widthMm":2000,"projectionMm":1500,"label":"2 × 1,5 m"},{"key":"2500x2000","widthMm":2500,"projectionMm":2000,"label":"2,5 × 2 m"},{"key":"3000x2500","widthMm":3000,"projectionMm":2500,"label":"3 × 2,5 m"},{"key":"3500x3000","widthMm":3500,"projectionMm":3000,"label":"3,5 × 3 m"},{"key":"4000x3000","widthMm":4000,"projectionMm":3000,"label":"4 × 3 m"},{"key":"4500x3000","widthMm":4500,"projectionMm":3000,"label":"4,5 × 3 m"},{"key":"5000x3000","widthMm":5000,"projectionMm":3000,"label":"5 × 3 m"},{"key":"5600x3500","widthMm":5600,"projectionMm":3500,"label":"5,6 × 3,5 m"}],
    "housings": [{"id":"white","name":"Weiß","hex":"#F1EFE7"},{"id":"basalt","name":"Basaltgrau","hex":"#62686A"},{"id":"anthracite","name":"Anthrazit","hex":"#3D4244"}],
    "fabrics": [{"code":"A1005","name":"Gelb","file":"gelb.jpg"},{"code":"A1010","name":"Sand","file":"sand.jpg"},{"code":"A1018","name":"Schiefer","file":"schiefer.jpg"},{"code":"A1025","name":"Apfel","file":"a1025-apfel-e0086f72665c.jpg"},{"code":"A1026","name":"Beere","file":"beere.jpg"},{"code":"A3013","name":"Wildrose","file":"wildrose.jpg"},{"code":"AP1024","name":"Grau","file":"grau.jpg"},{"code":"AP2025","name":"Kiesel","file":"kieselfarbe.jpg"},{"code":"F1001","name":"Candy","file":"candy.jpg"},{"code":"F1002","name":"Linde","file":"linde.jpg"},{"code":"FA2007","name":"Grau-Weiß","file":"grau-weiss.jpg"},{"code":"FA2008","name":"Sonnenfarbe","file":"sonnenfarbe.jpg"},{"code":"FA3038","name":"Weinfarbe","file":"weinfarbe.jpg"},{"code":"FA5013","name":"Meeresfarbe","file":"meeresfarbe.jpg"},{"code":"P5009","name":"Rot-Weiß-Beige","file":"rot-weiss-beige.jpg"}],
    "operations": ["Elektrisch"],
    "defaultSelection": {"model":"vollkassette","operation":"Elektrisch","sizeKey":"4000x3000","housing":"anthracite","fabric":"AP2025"},
    "variants": [
      {"itemId":610000,"variationId":10289,"variationNumber":"61-61454","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":610000,"variationId":10286,"variationNumber":"61-61403","housing":"Basaltgrau","widthMm":4000,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":610000,"variationId":10280,"variationNumber":"61-61358","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"A1010","fabricName":"Sand"},
      {"itemId":610000,"variationId":10292,"variationNumber":"61-61456","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":610000,"variationId":10279,"variationNumber":"61-61354","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":610000,"variationId":10281,"variationNumber":"61-61353","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":610000,"variationId":10284,"variationNumber":"61-61404","housing":"Basaltgrau","widthMm":4000,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":610000,"variationId":12023,"variationNumber":"61-614014","housing":"Basaltgrau","widthMm":4000,"projectionMm":3000,"fabricCode":"FA2008","fabricName":"Sonnenfarbe"},
      {"itemId":610000,"variationId":12020,"variationNumber":"61-613514","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"FA2008","fabricName":"Sonnenfarbe"},
      {"itemId":610000,"variationId":12026,"variationNumber":"61-614514","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"FA2008","fabricName":"Sonnenfarbe"},
      {"itemId":610000,"variationId":12027,"variationNumber":"61-614515","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":610000,"variationId":12213,"variationNumber":"61-61458","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"A1010","fabricName":"Sand"},
      {"itemId":610000,"variationId":10282,"variationNumber":"61-61356","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":610000,"variationId":12892,"variationNumber":"61-613517","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"A3013","fabricName":"Wildrose"},
      {"itemId":610000,"variationId":12891,"variationNumber":"61-61355","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"P5009","fabricName":"Rot-Weiß-Beige"},
      {"itemId":610000,"variationId":14213,"variationNumber":"61-613519","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":610000,"variationId":10291,"variationNumber":"61-61453","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":610000,"variationId":14215,"variationNumber":"61-613523","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":610000,"variationId":14219,"variationNumber":"61-614022","housing":"Basaltgrau","widthMm":4000,"projectionMm":3000,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":610000,"variationId":12021,"variationNumber":"61-613515","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":610000,"variationId":14218,"variationNumber":"61-614019","housing":"Basaltgrau","widthMm":4000,"projectionMm":3000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":610000,"variationId":12212,"variationNumber":"61-61408","housing":"Basaltgrau","widthMm":4000,"projectionMm":3000,"fabricCode":"A1010","fabricName":"Sand"},
      {"itemId":610000,"variationId":14894,"variationNumber":"61-61506","housing":"Basaltgrau","widthMm":5000,"projectionMm":3000,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":610000,"variationId":14228,"variationNumber":"61-61564","housing":"Basaltgrau","widthMm":5600,"projectionMm":3500,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":610000,"variationId":14214,"variationNumber":"61-613522","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":610000,"variationId":14224,"variationNumber":"61-614523","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":610000,"variationId":14225,"variationNumber":"61-615013","housing":"Basaltgrau","widthMm":5000,"projectionMm":3000,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":610000,"variationId":12024,"variationNumber":"61-614015","housing":"Basaltgrau","widthMm":4000,"projectionMm":3000,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":610000,"variationId":14220,"variationNumber":"61-614023","housing":"Basaltgrau","widthMm":4000,"projectionMm":3000,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":610000,"variationId":14221,"variationNumber":"61-614511","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"A1005","fabricName":"Gelb"},
      {"itemId":610000,"variationId":14212,"variationNumber":"61-613511","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"A1005","fabricName":"Gelb"},
      {"itemId":610000,"variationId":13365,"variationNumber":"61-614513","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":610000,"variationId":12894,"variationNumber":"61-614517","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"A3013","fabricName":"Wildrose"},
      {"itemId":610000,"variationId":14211,"variationNumber":"61-613513","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":610000,"variationId":14216,"variationNumber":"61-614013","housing":"Basaltgrau","widthMm":4000,"projectionMm":3000,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":610000,"variationId":14226,"variationNumber":"61-615019","housing":"Basaltgrau","widthMm":5000,"projectionMm":3000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":610000,"variationId":12893,"variationNumber":"61-614017","housing":"Basaltgrau","widthMm":4000,"projectionMm":3000,"fabricCode":"A3013","fabricName":"Wildrose"},
      {"itemId":610000,"variationId":14217,"variationNumber":"61-614011","housing":"Basaltgrau","widthMm":4000,"projectionMm":3000,"fabricCode":"A1005","fabricName":"Gelb"},
      {"itemId":610000,"variationId":14227,"variationNumber":"61-615022","housing":"Basaltgrau","widthMm":5000,"projectionMm":3000,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":610000,"variationId":14223,"variationNumber":"61-614522","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":610000,"variationId":14229,"variationNumber":"61-615619","housing":"Basaltgrau","widthMm":5600,"projectionMm":3500,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":610000,"variationId":14230,"variationNumber":"61-615622","housing":"Basaltgrau","widthMm":5600,"projectionMm":3500,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":610000,"variationId":14898,"variationNumber":"61-615623","housing":"Basaltgrau","widthMm":5600,"projectionMm":3500,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":610000,"variationId":14222,"variationNumber":"61-614519","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":610000,"variationId":14895,"variationNumber":"61-615023","housing":"Basaltgrau","widthMm":5000,"projectionMm":3000,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":610000,"variationId":14611,"variationNumber":"61-61455","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"P5009","fabricName":"Rot-Weiß-Beige"},
      {"itemId":610000,"variationId":14896,"variationNumber":"61-61566","housing":"Basaltgrau","widthMm":5600,"projectionMm":3500,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":610000,"variationId":14610,"variationNumber":"61-61405","housing":"Basaltgrau","widthMm":4000,"projectionMm":3000,"fabricCode":"P5009","fabricName":"Rot-Weiß-Beige"},
      {"itemId":610000,"variationId":14897,"variationNumber":"61-615613","housing":"Basaltgrau","widthMm":5600,"projectionMm":3500,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":620001,"variationId":14942,"variationNumber":"6245-6","housing":"Anthrazit","widthMm":4500,"projectionMm":3000,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":620001,"variationId":13556,"variationNumber":"6240-19","housing":"Anthrazit","widthMm":4000,"projectionMm":3000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":620001,"variationId":13555,"variationNumber":"6240-18","housing":"Anthrazit","widthMm":4000,"projectionMm":3000,"fabricCode":"A1018","fabricName":"Schiefer"},
      {"itemId":620001,"variationId":13554,"variationNumber":"6240-15","housing":"Anthrazit","widthMm":4000,"projectionMm":3000,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":620001,"variationId":13562,"variationNumber":"6250-19","housing":"Anthrazit","widthMm":5000,"projectionMm":3000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":620001,"variationId":13557,"variationNumber":"6245-15","housing":"Anthrazit","widthMm":4500,"projectionMm":3000,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":620001,"variationId":13564,"variationNumber":"6256-19","housing":"Anthrazit","widthMm":5600,"projectionMm":3500,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":620001,"variationId":13559,"variationNumber":"6245-19","housing":"Anthrazit","widthMm":4500,"projectionMm":3000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":620001,"variationId":13552,"variationNumber":"6235-18","housing":"Anthrazit","widthMm":3500,"projectionMm":3000,"fabricCode":"A1018","fabricName":"Schiefer"},
      {"itemId":620001,"variationId":13563,"variationNumber":"6256-18","housing":"Anthrazit","widthMm":5600,"projectionMm":3500,"fabricCode":"A1018","fabricName":"Schiefer"},
      {"itemId":620001,"variationId":13558,"variationNumber":"6245-18","housing":"Anthrazit","widthMm":4500,"projectionMm":3000,"fabricCode":"A1018","fabricName":"Schiefer"},
      {"itemId":620001,"variationId":13553,"variationNumber":"6235-19","housing":"Anthrazit","widthMm":3500,"projectionMm":3000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":620001,"variationId":13561,"variationNumber":"6250-18","housing":"Anthrazit","widthMm":5000,"projectionMm":3000,"fabricCode":"A1018","fabricName":"Schiefer"},
      {"itemId":620001,"variationId":13560,"variationNumber":"6250-15","housing":"Anthrazit","widthMm":5000,"projectionMm":3000,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":620001,"variationId":13550,"variationNumber":"6230-18","housing":"Anthrazit","widthMm":3000,"projectionMm":2500,"fabricCode":"A1018","fabricName":"Schiefer"},
      {"itemId":620001,"variationId":14251,"variationNumber":"6240-13","housing":"Anthrazit","widthMm":4000,"projectionMm":3000,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":620001,"variationId":14260,"variationNumber":"6256-13","housing":"Anthrazit","widthMm":5600,"projectionMm":3500,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":620001,"variationId":14261,"variationNumber":"6256-22","housing":"Anthrazit","widthMm":5600,"projectionMm":3500,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":620001,"variationId":14253,"variationNumber":"6240-23","housing":"Anthrazit","widthMm":4000,"projectionMm":3000,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":620001,"variationId":14901,"variationNumber":"6256-6","housing":"Anthrazit","widthMm":5600,"projectionMm":3500,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":620001,"variationId":14255,"variationNumber":"6245-22","housing":"Anthrazit","widthMm":4500,"projectionMm":3000,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":620001,"variationId":14252,"variationNumber":"6240-22","housing":"Anthrazit","widthMm":4000,"projectionMm":3000,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":620001,"variationId":14249,"variationNumber":"6235-22","housing":"Anthrazit","widthMm":3500,"projectionMm":3000,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":620001,"variationId":14248,"variationNumber":"6235-13","housing":"Anthrazit","widthMm":3500,"projectionMm":3000,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":620001,"variationId":14902,"variationNumber":"6240-6","housing":"Anthrazit","widthMm":4000,"projectionMm":3000,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":620001,"variationId":14256,"variationNumber":"6245-23","housing":"Anthrazit","widthMm":4500,"projectionMm":3000,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":620001,"variationId":14262,"variationNumber":"6256-23","housing":"Anthrazit","widthMm":5600,"projectionMm":3500,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":620001,"variationId":14254,"variationNumber":"6245-13","housing":"Anthrazit","widthMm":4500,"projectionMm":3000,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":620001,"variationId":14258,"variationNumber":"6250-22","housing":"Anthrazit","widthMm":5000,"projectionMm":3000,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":620001,"variationId":14257,"variationNumber":"6250-13","housing":"Anthrazit","widthMm":5000,"projectionMm":3000,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":620001,"variationId":14259,"variationNumber":"6250-23","housing":"Anthrazit","widthMm":5000,"projectionMm":3000,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":620001,"variationId":14900,"variationNumber":"6250-6","housing":"Anthrazit","widthMm":5000,"projectionMm":3000,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":620001,"variationId":14250,"variationNumber":"6235-23","housing":"Anthrazit","widthMm":3500,"projectionMm":3000,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":610000,"variationId":10287,"variationNumber":"61-61406","housing":"Basaltgrau","widthMm":4000,"projectionMm":3000,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":610000,"variationId":13291,"variationNumber":"61-61504","housing":"Basaltgrau","widthMm":5000,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":600000,"variationId":7895,"variationNumber":"60-60253","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":600000,"variationId":7912,"variationNumber":"60-603013","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":600000,"variationId":7903,"variationNumber":"60-602511","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"A1005","fabricName":"Gelb"},
      {"itemId":600000,"variationId":7882,"variationNumber":"60-60205","housing":"Weiß","widthMm":2000,"projectionMm":1500,"fabricCode":"P5009","fabricName":"Rot-Weiß-Beige"},
      {"itemId":600000,"variationId":7917,"variationNumber":"60-603011","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"A1005","fabricName":"Gelb"},
      {"itemId":600000,"variationId":7911,"variationNumber":"60-60306","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":600000,"variationId":7893,"variationNumber":"60-60258","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"A1010","fabricName":"Sand"},
      {"itemId":600000,"variationId":7910,"variationNumber":"60-60305","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"P5009","fabricName":"Rot-Weiß-Beige"},
      {"itemId":600000,"variationId":7907,"variationNumber":"60-60308","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"A1010","fabricName":"Sand"},
      {"itemId":600000,"variationId":12032,"variationNumber":"60-602014","housing":"Weiß","widthMm":2000,"projectionMm":1500,"fabricCode":"FA2008","fabricName":"Sonnenfarbe"},
      {"itemId":620001,"variationId":14243,"variationNumber":"6225-22","housing":"Anthrazit","widthMm":2500,"projectionMm":2000,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":610000,"variationId":10269,"variationNumber":"61-61254","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":610000,"variationId":12015,"variationNumber":"61-612515","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":610000,"variationId":12889,"variationNumber":"61-61258","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"A1010","fabricName":"Sand"},
      {"itemId":610000,"variationId":13364,"variationNumber":"61-613013","housing":"Basaltgrau","widthMm":3000,"projectionMm":2500,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":610000,"variationId":12890,"variationNumber":"61-61256","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":610000,"variationId":14204,"variationNumber":"61-612517","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"A3013","fabricName":"Wildrose"},
      {"itemId":610000,"variationId":14203,"variationNumber":"61-612022","housing":"Basaltgrau","widthMm":2000,"projectionMm":1500,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":610000,"variationId":14208,"variationNumber":"61-613019","housing":"Basaltgrau","widthMm":3000,"projectionMm":2500,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":610000,"variationId":13334,"variationNumber":"61-613017","housing":"Basaltgrau","widthMm":3000,"projectionMm":2500,"fabricCode":"A3013","fabricName":"Wildrose"},
      {"itemId":620001,"variationId":13547,"variationNumber":"6225-15","housing":"Anthrazit","widthMm":2500,"projectionMm":2000,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":620001,"variationId":13548,"variationNumber":"6225-18","housing":"Anthrazit","widthMm":2500,"projectionMm":2000,"fabricCode":"A1018","fabricName":"Schiefer"},
      {"itemId":620001,"variationId":13546,"variationNumber":"6220-18","housing":"Anthrazit","widthMm":2000,"projectionMm":1500,"fabricCode":"A1018","fabricName":"Schiefer"},
      {"itemId":620001,"variationId":13549,"variationNumber":"6225-19","housing":"Anthrazit","widthMm":2500,"projectionMm":2000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":620001,"variationId":14247,"variationNumber":"6230-23","housing":"Anthrazit","widthMm":3000,"projectionMm":2500,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":620001,"variationId":14242,"variationNumber":"6225-13","housing":"Anthrazit","widthMm":2500,"projectionMm":2000,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":620001,"variationId":14239,"variationNumber":"6220-13","housing":"Anthrazit","widthMm":2000,"projectionMm":1500,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":620001,"variationId":14244,"variationNumber":"6225-23","housing":"Anthrazit","widthMm":2500,"projectionMm":2000,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":620001,"variationId":14241,"variationNumber":"6220-22","housing":"Anthrazit","widthMm":2000,"projectionMm":1500,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":620001,"variationId":14245,"variationNumber":"6230-13","housing":"Anthrazit","widthMm":3000,"projectionMm":2500,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":620001,"variationId":14246,"variationNumber":"6230-22","housing":"Anthrazit","widthMm":3000,"projectionMm":2500,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":620001,"variationId":14899,"variationNumber":"6230-6","housing":"Anthrazit","widthMm":3000,"projectionMm":2500,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":610000,"variationId":10264,"variationNumber":"61-61204","housing":"Basaltgrau","widthMm":2000,"projectionMm":1500,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":610000,"variationId":10271,"variationNumber":"61-61253","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":610000,"variationId":12018,"variationNumber":"61-613015","housing":"Basaltgrau","widthMm":3000,"projectionMm":2500,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":610000,"variationId":10266,"variationNumber":"61-61203","housing":"Basaltgrau","widthMm":2000,"projectionMm":1500,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":610000,"variationId":10277,"variationNumber":"61-61306","housing":"Basaltgrau","widthMm":3000,"projectionMm":2500,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":610000,"variationId":12011,"variationNumber":"61-612014","housing":"Basaltgrau","widthMm":2000,"projectionMm":1500,"fabricCode":"FA2008","fabricName":"Sonnenfarbe"},
      {"itemId":610000,"variationId":12017,"variationNumber":"61-613014","housing":"Basaltgrau","widthMm":3000,"projectionMm":2500,"fabricCode":"FA2008","fabricName":"Sonnenfarbe"},
      {"itemId":610000,"variationId":12014,"variationNumber":"61-612514","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"FA2008","fabricName":"Sonnenfarbe"},
      {"itemId":610000,"variationId":12012,"variationNumber":"61-612015","housing":"Basaltgrau","widthMm":2000,"projectionMm":1500,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":600000,"variationId":7898,"variationNumber":"60-62513","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":600000,"variationId":12034,"variationNumber":"60-602016","housing":"Weiß","widthMm":2000,"projectionMm":1500,"fabricCode":"FA3038","fabricName":"Weinfarbe"},
      {"itemId":600000,"variationId":12039,"variationNumber":"60-603015","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":600000,"variationId":12036,"variationNumber":"60-602515","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":600000,"variationId":12033,"variationNumber":"60-602015","housing":"Weiß","widthMm":2000,"projectionMm":1500,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":600000,"variationId":12883,"variationNumber":"60-60204","housing":"Weiß","widthMm":2000,"projectionMm":1500,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":600000,"variationId":13335,"variationNumber":"60-602517","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"A3013","fabricName":"Wildrose"},
      {"itemId":600000,"variationId":14343,"variationNumber":"60-602017","housing":"Weiß","widthMm":2000,"projectionMm":1500,"fabricCode":"A3013","fabricName":"Wildrose"},
      {"itemId":600000,"variationId":13336,"variationNumber":"60-63017","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"A3013","fabricName":"Wildrose"},
      {"itemId":610000,"variationId":14205,"variationNumber":"61-612519","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":610000,"variationId":14207,"variationNumber":"61-613011","housing":"Basaltgrau","widthMm":3000,"projectionMm":2500,"fabricCode":"A1005","fabricName":"Gelb"},
      {"itemId":610000,"variationId":14206,"variationNumber":"61-612522","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":610000,"variationId":14209,"variationNumber":"61-613022","housing":"Basaltgrau","widthMm":3000,"projectionMm":2500,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":610000,"variationId":14608,"variationNumber":"61-61255","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"P5009","fabricName":"Rot-Weiß-Beige"},
      {"itemId":610000,"variationId":14609,"variationNumber":"61-61305","housing":"Basaltgrau","widthMm":3000,"projectionMm":2500,"fabricCode":"P5009","fabricName":"Rot-Weiß-Beige"},
      {"itemId":610000,"variationId":14607,"variationNumber":"61-61205","housing":"Basaltgrau","widthMm":2000,"projectionMm":1500,"fabricCode":"P5009","fabricName":"Rot-Weiß-Beige"},
      {"itemId":620001,"variationId":14240,"variationNumber":"6220-19","housing":"Anthrazit","widthMm":2000,"projectionMm":1500,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":610000,"variationId":14210,"variationNumber":"61-613023","housing":"Basaltgrau","widthMm":3000,"projectionMm":2500,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":600000,"variationId":7906,"variationNumber":"60-60304","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":610000,"variationId":14202,"variationNumber":"61-612019","housing":"Basaltgrau","widthMm":2000,"projectionMm":1500,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":610000,"variationId":10274,"variationNumber":"61-61304","housing":"Basaltgrau","widthMm":3000,"projectionMm":2500,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":610000,"variationId":10276,"variationNumber":"61-61303","housing":"Basaltgrau","widthMm":3000,"projectionMm":2500,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":600000,"variationId":7909,"variationNumber":"60-60303","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":600000,"variationId":7892,"variationNumber":"60-60254","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":610000,"variationId":14200,"variationNumber":"61-612013","housing":"Basaltgrau","widthMm":2000,"projectionMm":1500,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":600000,"variationId":12038,"variationNumber":"60-603014","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"FA2008","fabricName":"Sonnenfarbe"},
      {"itemId":600000,"variationId":14233,"variationNumber":"60-603019","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":600000,"variationId":7897,"variationNumber":"60-60256","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":600000,"variationId":12035,"variationNumber":"60-602514","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"FA2008","fabricName":"Sonnenfarbe"},
      {"itemId":610000,"variationId":10275,"variationNumber":"61-61308","housing":"Basaltgrau","widthMm":3000,"projectionMm":2500,"fabricCode":"A1010","fabricName":"Sand"},
      {"itemId":600000,"variationId":14231,"variationNumber":"60-602019","housing":"Weiß","widthMm":2000,"projectionMm":1500,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":620001,"variationId":13551,"variationNumber":"6230-19","housing":"Anthrazit","widthMm":3000,"projectionMm":2500,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":600000,"variationId":14232,"variationNumber":"60-602519","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":610000,"variationId":14201,"variationNumber":"61-612017","housing":"Basaltgrau","widthMm":2000,"projectionMm":1500,"fabricCode":"A3013","fabricName":"Wildrose"},
      {"itemId":600000,"variationId":14884,"variationNumber":"60-603022","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":600000,"variationId":14885,"variationNumber":"60-603023","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":600000,"variationId":12041,"variationNumber":"60-603514","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"FA2008","fabricName":"Sonnenfarbe"},
      {"itemId":600000,"variationId":12047,"variationNumber":"60-604514","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"FA2008","fabricName":"Sonnenfarbe"},
      {"itemId":600000,"variationId":7945,"variationNumber":"60-604011","housing":"Weiß","widthMm":4000,"projectionMm":3000,"fabricCode":"A1005","fabricName":"Gelb"},
      {"itemId":600000,"variationId":7959,"variationNumber":"60-604511","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"A1005","fabricName":"Gelb"},
      {"itemId":600000,"variationId":7938,"variationNumber":"60-60405","housing":"Weiß","widthMm":4000,"projectionMm":3000,"fabricCode":"P5009","fabricName":"Rot-Weiß-Beige"},
      {"itemId":600000,"variationId":14236,"variationNumber":"60-604519","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":600000,"variationId":7953,"variationNumber":"60-60456","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":600000,"variationId":12044,"variationNumber":"60-604014","housing":"Weiß","widthMm":4000,"projectionMm":3000,"fabricCode":"FA2008","fabricName":"Sonnenfarbe"},
      {"itemId":600000,"variationId":7952,"variationNumber":"60-60455","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"P5009","fabricName":"Rot-Weiß-Beige"},
      {"itemId":600000,"variationId":7926,"variationNumber":"60-603513","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":600000,"variationId":14480,"variationNumber":"60-605019","housing":"Weiß","widthMm":5000,"projectionMm":3000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":600000,"variationId":14886,"variationNumber":"60-603523","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":600000,"variationId":14888,"variationNumber":"60-605623","housing":"Weiß","widthMm":5600,"projectionMm":3500,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":600000,"variationId":14893,"variationNumber":"60-604023","housing":"Weiß","widthMm":4000,"projectionMm":3000,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":600000,"variationId":7940,"variationNumber":"60-604013","housing":"Weiß","widthMm":4000,"projectionMm":3000,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":600000,"variationId":14890,"variationNumber":"60-605622","housing":"Weiß","widthMm":5600,"projectionMm":3500,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":600000,"variationId":14891,"variationNumber":"60-603522","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":600000,"variationId":14892,"variationNumber":"60-604022","housing":"Weiß","widthMm":4000,"projectionMm":3000,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":600000,"variationId":7939,"variationNumber":"60-60406","housing":"Weiß","widthMm":4000,"projectionMm":3000,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":600000,"variationId":7951,"variationNumber":"60-60453","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":600000,"variationId":13342,"variationNumber":"60-604517","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"A3013","fabricName":"Wildrose"},
      {"itemId":600000,"variationId":13343,"variationNumber":"60-60504","housing":"Weiß","widthMm":5000,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":600000,"variationId":7921,"variationNumber":"60-60358","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"A1010","fabricName":"Sand"},
      {"itemId":600000,"variationId":7937,"variationNumber":"60-60403","housing":"Weiß","widthMm":4000,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":600000,"variationId":7949,"variationNumber":"60-60458","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"A1010","fabricName":"Sand"},
      {"itemId":600000,"variationId":12042,"variationNumber":"60-603515","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":600000,"variationId":7920,"variationNumber":"60-60354","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":600000,"variationId":7934,"variationNumber":"60-60404","housing":"Weiß","widthMm":4000,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":600000,"variationId":13589,"variationNumber":"60-60564","housing":"Weiß","widthMm":5600,"projectionMm":3500,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":600000,"variationId":13337,"variationNumber":"60-603517","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"A3013","fabricName":"Wildrose"},
      {"itemId":600000,"variationId":7923,"variationNumber":"60-60353","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":600000,"variationId":12048,"variationNumber":"60-604515","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":600000,"variationId":7896,"variationNumber":"60-60255","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"P5009","fabricName":"Rot-Weiß-Beige"},
      {"itemId":600000,"variationId":7935,"variationNumber":"60-60408","housing":"Weiß","widthMm":4000,"projectionMm":3000,"fabricCode":"A1010","fabricName":"Sand"},
      {"itemId":600000,"variationId":7925,"variationNumber":"60-60356","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"A1025","fabricName":"Apfel"},
      {"itemId":600000,"variationId":7948,"variationNumber":"60-60454","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":600000,"variationId":12045,"variationNumber":"60-604015","housing":"Weiß","widthMm":4000,"projectionMm":3000,"fabricCode":"FA5013","fabricName":"Meeresfarbe"},
      {"itemId":600000,"variationId":7924,"variationNumber":"60-60355","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"P5009","fabricName":"Rot-Weiß-Beige"},
      {"itemId":600000,"variationId":7931,"variationNumber":"60-603511","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"A1005","fabricName":"Gelb"},
      {"itemId":600000,"variationId":13338,"variationNumber":"60-604017","housing":"Weiß","widthMm":4000,"projectionMm":3000,"fabricCode":"A3013","fabricName":"Wildrose"},
      {"itemId":600000,"variationId":14238,"variationNumber":"60-60503","housing":"Weiß","widthMm":5000,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":600000,"variationId":14494,"variationNumber":"60-605619","housing":"Weiß","widthMm":5600,"projectionMm":3500,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":600000,"variationId":14493,"variationNumber":"60-60563","housing":"Weiß","widthMm":5600,"projectionMm":3500,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":600000,"variationId":14235,"variationNumber":"60-604019","housing":"Weiß","widthMm":4000,"projectionMm":3000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":600000,"variationId":14234,"variationNumber":"60-603519","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"AP2025","fabricName":"Kieselfarbe"},
      {"itemId":600000,"variationId":14887,"variationNumber":"60-605023","housing":"Weiß","widthMm":5000,"projectionMm":3000,"fabricCode":"F1001","fabricName":"Candy"},
      {"itemId":600000,"variationId":7954,"variationNumber":"60-604513","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"A1026","fabricName":"Beere"},
      {"itemId":600000,"variationId":14889,"variationNumber":"60-605022","housing":"Weiß","widthMm":5000,"projectionMm":3000,"fabricCode":"F1002","fabricName":"Linde"},
      {"itemId":600000,"variationId":7881,"variationNumber":"60-60203","housing":"Weiß","widthMm":2000,"projectionMm":1500,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":610000,"variationId":13363,"variationNumber":"61-612513","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"A1026","fabricName":"Beere"}
    ]
  },
  {
    "id": "halbkassette",
    "name": "Halbkassettenmarkise",
    "sizes": [{"key":"2500x2000","widthMm":2500,"projectionMm":2000,"label":"2,5 × 2 m"},{"key":"2950x2500","widthMm":2950,"projectionMm":2500,"label":"2,95 × 2,5 m"},{"key":"3500x3000","widthMm":3500,"projectionMm":3000,"label":"3,5 × 3 m"},{"key":"3950x3000","widthMm":3950,"projectionMm":3000,"label":"3,95 × 3 m"},{"key":"4500x3000","widthMm":4500,"projectionMm":3000,"label":"4,5 × 3 m"},{"key":"5000x3000","widthMm":5000,"projectionMm":3000,"label":"5 × 3 m"}],
    "housings": [{"id":"white","name":"Weiß","hex":"#F1EFE7"},{"id":"basalt","name":"Basaltgrau","hex":"#62686A"}],
    "fabrics": [{"code":"A1014","name":"Beige","file":"beige.jpg"},{"code":"AP1024","name":"Grau","file":"grau.jpg"},{"code":"FA2007","name":"Grau-Weiß","file":"grau-weiss.jpg"},{"code":"P5002","name":"Sommerbrise","file":"sommerbrise.jpg"}],
    "operations": ["Standard","Elektrisch"],
    "defaultSelection": {"model":"halbkassette","operation":"Standard","sizeKey":"2950x2500","housing":"white","fabric":"A1014"},
    "variants": [
      {"itemId":680000,"variationId":14357,"variationNumber":"68-684021","operation":"Elektrisch","housing":"Weiß","widthMm":3950,"projectionMm":3000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":680000,"variationId":14348,"variationNumber":"68-68353","operation":"Elektrisch","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":650000,"variationId":14813,"variationNumber":"65-65404","operation":"Elektrisch","housing":"Basaltgrau","widthMm":3950,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":680000,"variationId":14346,"variationNumber":"68-68350","operation":"Elektrisch","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":670000,"variationId":14362,"variationNumber":"67-673521","operation":"Standard","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":650000,"variationId":14815,"variationNumber":"65-654021","operation":"Elektrisch","housing":"Basaltgrau","widthMm":3950,"projectionMm":3000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":680000,"variationId":14759,"variationNumber":"68-68253","operation":"Elektrisch","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":680000,"variationId":14758,"variationNumber":"68-68254","operation":"Elektrisch","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":680000,"variationId":14351,"variationNumber":"68-68304","operation":"Elektrisch","housing":"Weiß","widthMm":2950,"projectionMm":2500,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":670000,"variationId":14740,"variationNumber":"67-67254","operation":"Standard","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":650000,"variationId":14798,"variationNumber":"65-65253","operation":"Elektrisch","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":650000,"variationId":14799,"variationNumber":"65-652521","operation":"Elektrisch","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":650000,"variationId":14807,"variationNumber":"65-654521","operation":"Elektrisch","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":640000,"variationId":14825,"variationNumber":"64-64404","operation":"Standard","housing":"Basaltgrau","widthMm":3950,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":670000,"variationId":14739,"variationNumber":"67-67250","operation":"Standard","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":650000,"variationId":14818,"variationNumber":"65-65503","operation":"Elektrisch","housing":"Basaltgrau","widthMm":5000,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":640000,"variationId":14770,"variationNumber":"64-64250","operation":"Standard","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":680000,"variationId":14766,"variationNumber":"68-68504","operation":"Elektrisch","housing":"Weiß","widthMm":5000,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":650000,"variationId":14796,"variationNumber":"65-65250","operation":"Elektrisch","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":650000,"variationId":14809,"variationNumber":"65-65304","operation":"Elektrisch","housing":"Basaltgrau","widthMm":2950,"projectionMm":2500,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":680000,"variationId":14762,"variationNumber":"68-68454","operation":"Elektrisch","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":650000,"variationId":14811,"variationNumber":"65-653021","operation":"Elektrisch","housing":"Basaltgrau","widthMm":2950,"projectionMm":2500,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":650000,"variationId":14810,"variationNumber":"65-65303","operation":"Elektrisch","housing":"Basaltgrau","widthMm":2950,"projectionMm":2500,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":640000,"variationId":14781,"variationNumber":"64-643521","operation":"Standard","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":640000,"variationId":14778,"variationNumber":"64-64350","operation":"Standard","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":680000,"variationId":14760,"variationNumber":"68-682521","operation":"Elektrisch","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":650000,"variationId":14814,"variationNumber":"65-65403","operation":"Elektrisch","housing":"Basaltgrau","widthMm":3950,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":640000,"variationId":14772,"variationNumber":"64-64253","operation":"Standard","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":680000,"variationId":14767,"variationNumber":"68-68503","operation":"Elektrisch","housing":"Weiß","widthMm":5000,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":640000,"variationId":14827,"variationNumber":"64-644021","operation":"Standard","housing":"Basaltgrau","widthMm":3950,"projectionMm":3000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":650000,"variationId":14806,"variationNumber":"65-65453","operation":"Elektrisch","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":640000,"variationId":14773,"variationNumber":"64-642521","operation":"Standard","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":650000,"variationId":14803,"variationNumber":"65-653521","operation":"Elektrisch","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":650000,"variationId":14804,"variationNumber":"65-65450","operation":"Elektrisch","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":650000,"variationId":14816,"variationNumber":"65-65500","operation":"Elektrisch","housing":"Basaltgrau","widthMm":5000,"projectionMm":3000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":640000,"variationId":14780,"variationNumber":"64-64353","operation":"Standard","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":670000,"variationId":14364,"variationNumber":"67-67304","operation":"Standard","housing":"Weiß","widthMm":2950,"projectionMm":2500,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":680000,"variationId":14761,"variationNumber":"68-68450","operation":"Elektrisch","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":680000,"variationId":14350,"variationNumber":"68-68300","operation":"Elektrisch","housing":"Weiß","widthMm":2950,"projectionMm":2500,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":680000,"variationId":14757,"variationNumber":"68-68250","operation":"Elektrisch","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":670000,"variationId":14359,"variationNumber":"67-67350","operation":"Standard","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":650000,"variationId":14817,"variationNumber":"65-65504","operation":"Elektrisch","housing":"Basaltgrau","widthMm":5000,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":670000,"variationId":14369,"variationNumber":"67-67403","operation":"Standard","housing":"Weiß","widthMm":3950,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":680000,"variationId":14768,"variationNumber":"68-685021","operation":"Elektrisch","housing":"Weiß","widthMm":5000,"projectionMm":3000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":650000,"variationId":14802,"variationNumber":"65-65353","operation":"Elektrisch","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":670000,"variationId":14370,"variationNumber":"67-674021","operation":"Standard","housing":"Weiß","widthMm":3950,"projectionMm":3000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":680000,"variationId":14765,"variationNumber":"68-68500","operation":"Elektrisch","housing":"Weiß","widthMm":5000,"projectionMm":3000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":640000,"variationId":14826,"variationNumber":"64-64403","operation":"Standard","housing":"Basaltgrau","widthMm":3950,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":650000,"variationId":14805,"variationNumber":"65-65454","operation":"Elektrisch","housing":"Basaltgrau","widthMm":4500,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":640000,"variationId":14823,"variationNumber":"64-643021","operation":"Standard","housing":"Basaltgrau","widthMm":2950,"projectionMm":2500,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":680000,"variationId":14352,"variationNumber":"68-68303","operation":"Elektrisch","housing":"Weiß","widthMm":2950,"projectionMm":2500,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":670000,"variationId":14368,"variationNumber":"67-67404","operation":"Standard","housing":"Weiß","widthMm":3950,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":640000,"variationId":14820,"variationNumber":"64-64300","operation":"Standard","housing":"Basaltgrau","widthMm":2950,"projectionMm":2500,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":650000,"variationId":14808,"variationNumber":"65-65300","operation":"Elektrisch","housing":"Basaltgrau","widthMm":2950,"projectionMm":2500,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":670000,"variationId":14365,"variationNumber":"67-67303","operation":"Standard","housing":"Weiß","widthMm":2950,"projectionMm":2500,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":680000,"variationId":14764,"variationNumber":"68-684521","operation":"Elektrisch","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":650000,"variationId":14797,"variationNumber":"65-65254","operation":"Elektrisch","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":640000,"variationId":14771,"variationNumber":"64-64254","operation":"Standard","housing":"Basaltgrau","widthMm":2500,"projectionMm":2000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":670000,"variationId":14360,"variationNumber":"67-67354","operation":"Standard","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":650000,"variationId":14801,"variationNumber":"65-65354","operation":"Elektrisch","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":670000,"variationId":14367,"variationNumber":"67-67400","operation":"Standard","housing":"Weiß","widthMm":3950,"projectionMm":3000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":680000,"variationId":14347,"variationNumber":"68-68354","operation":"Elektrisch","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":670000,"variationId":14366,"variationNumber":"67-673021","operation":"Standard","housing":"Weiß","widthMm":2950,"projectionMm":2500,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":680000,"variationId":14763,"variationNumber":"68-68453","operation":"Elektrisch","housing":"Weiß","widthMm":4500,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":650000,"variationId":14800,"variationNumber":"65-65350","operation":"Elektrisch","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":640000,"variationId":14779,"variationNumber":"64-64354","operation":"Standard","housing":"Basaltgrau","widthMm":3500,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":650000,"variationId":14812,"variationNumber":"65-65400","operation":"Elektrisch","housing":"Basaltgrau","widthMm":3950,"projectionMm":3000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":670000,"variationId":14742,"variationNumber":"67-672521","operation":"Standard","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":640000,"variationId":14821,"variationNumber":"64-64304","operation":"Standard","housing":"Basaltgrau","widthMm":2950,"projectionMm":2500,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":680000,"variationId":14349,"variationNumber":"68-683521","operation":"Elektrisch","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":650000,"variationId":14819,"variationNumber":"65-655021","operation":"Elektrisch","housing":"Basaltgrau","widthMm":5000,"projectionMm":3000,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":680000,"variationId":14355,"variationNumber":"68-68404","operation":"Elektrisch","housing":"Weiß","widthMm":3950,"projectionMm":3000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":680000,"variationId":14353,"variationNumber":"68-683021","operation":"Elektrisch","housing":"Weiß","widthMm":2950,"projectionMm":2500,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":670000,"variationId":14741,"variationNumber":"67-67253","operation":"Standard","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":640000,"variationId":14822,"variationNumber":"64-64303","operation":"Standard","housing":"Basaltgrau","widthMm":2950,"projectionMm":2500,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":680000,"variationId":14356,"variationNumber":"68-68403","operation":"Elektrisch","housing":"Weiß","widthMm":3950,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":670000,"variationId":14363,"variationNumber":"67-67300","operation":"Standard","housing":"Weiß","widthMm":2950,"projectionMm":2500,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":680000,"variationId":14354,"variationNumber":"68-68400","operation":"Elektrisch","housing":"Weiß","widthMm":3950,"projectionMm":3000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":640000,"variationId":14824,"variationNumber":"64-64400","operation":"Standard","housing":"Basaltgrau","widthMm":3950,"projectionMm":3000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":670000,"variationId":14361,"variationNumber":"67-67353","operation":"Standard","housing":"Weiß","widthMm":3500,"projectionMm":3000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"}
    ]
  },
  {
    "id": "gelenkarm",
    "name": "Gelenkarmmarkise",
    "sizes": [{"key":"2500x2000","widthMm":2500,"projectionMm":2000,"label":"2,5 × 2 m"},{"key":"3000x2500","widthMm":3000,"projectionMm":2500,"label":"3 × 2,5 m"}],
    "housings": [{"id":"white","name":"Weiß","hex":"#F1EFE7"}],
    "fabrics": [{"code":"A1014","name":"Beige","file":"beige.jpg"},{"code":"AP1024","name":"Grau","file":"grau.jpg"},{"code":"FA2007","name":"Grau-Weiß","file":"grau-weiss.jpg"},{"code":"P5002","name":"Sommerbrise","file":"sommerbrise.jpg"}],
    "operations": ["Manuell"],
    "defaultSelection": {"model":"gelenkarm","operation":"Manuell","sizeKey":"3000x2500","housing":"white","fabric":"A1014"},
    "variants": [
      {"itemId":6325,"variationId":12454,"variationNumber":"63254","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":6325,"variationId":12455,"variationNumber":"63253","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":6325,"variationId":12453,"variationNumber":"63250","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":6330,"variationId":12458,"variationNumber":"63303","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"FA2007","fabricName":"Grau-Weiß"},
      {"itemId":6330,"variationId":12457,"variationNumber":"63304","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"AP1024","fabricName":"Grau"},
      {"itemId":6330,"variationId":14199,"variationNumber":"633021","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"P5002","fabricName":"Sommerbrise"},
      {"itemId":6330,"variationId":12456,"variationNumber":"63300","housing":"Weiß","widthMm":3000,"projectionMm":2500,"fabricCode":"A1014","fabricName":"Beige"},
      {"itemId":6325,"variationId":14198,"variationNumber":"632521","housing":"Weiß","widthMm":2500,"projectionMm":2000,"fabricCode":"P5002","fabricName":"Sommerbrise"}
    ]
  }
];

export const defaults: Readonly<Record<ModelId, Readonly<Selection>>> = {
  vollkassette: families[0].defaultSelection,
  halbkassette: families[1].defaultSelection,
  gelenkarm: families[2].defaultSelection,
};

export const allVariants: ReadonlyArray<Variant & { model: ModelId }> = families.flatMap(
  (family) => family.variants.map((variant) => ({ ...variant, model: family.id })),
);

/** Resolve dependent options in one synchronous pass, without Vue watcher races. */
export function resolveSelection(input: Partial<Selection> = {}): ResolvedSelection {
  const family = families.find((candidate) => candidate.id === input.model) || families[0];
  const requested: Selection = { ...family.defaultSelection, ...input, model: family.id };
  const selection: Selection = { ...requested };
  if (!family.operations.includes(selection.operation)) {
    selection.operation = family.defaultSelection.operation;
  }
  const forOperation = family.variants.filter(
    (variant) => !variant.operation || variant.operation === selection.operation,
  );
  const availableSizeKeys = new Set(forOperation.map(
    (variant) => `${variant.widthMm}x${variant.projectionMm}`,
  ));
  const availableSizes = family.sizes.filter((size) => availableSizeKeys.has(size.key));
  if (!availableSizeKeys.has(selection.sizeKey)) {
    const requestedSize = family.sizes.find((size) => size.key === selection.sizeKey);
    // Preserve the PWA's nearest-size rule when the operation changes.
    const ranked = requestedSize ? [...availableSizes].sort((a, b) => {
      const da = Math.abs(a.widthMm - requestedSize.widthMm) + Math.abs(a.projectionMm - requestedSize.projectionMm);
      const db = Math.abs(b.widthMm - requestedSize.widthMm) + Math.abs(b.projectionMm - requestedSize.projectionMm);
      return da - db;
    }) : availableSizes;
    selection.sizeKey = ranked[0]?.key || family.defaultSelection.sizeKey;
  }
  const size = family.sizes.find((entry) => entry.key === selection.sizeKey) || family.sizes[0];
  const forSize = forOperation.filter(
    (variant) => variant.widthMm === size.widthMm && variant.projectionMm === size.projectionMm,
  );
  const availableHousingIds = new Set(family.housings.filter(
    (housing) => forSize.some((variant) => variant.housing === housing.name),
  ).map((housing) => housing.id));
  if (!availableHousingIds.has(selection.housing)) {
    selection.housing = family.housings.find((housing) => availableHousingIds.has(housing.id))?.id
      || family.defaultSelection.housing;
  }
  const housing = family.housings.find((entry) => entry.id === selection.housing) || family.housings[0];
  const forHousing = forSize.filter((variant) => variant.housing === housing.name);
  const availableFabricCodes = new Set(forHousing.map((variant) => variant.fabricCode));
  if (!availableFabricCodes.has(selection.fabric)) {
    // Keep source-record order, exactly as the PWA's variantsForHousing[0] fallback.
    selection.fabric = forHousing[0]?.fabricCode || '';
  }
  const fabric = family.fabrics.find((entry) => entry.code === selection.fabric) || family.fabrics[0];
  const variant = forHousing.find((entry) => entry.fabricCode === selection.fabric) || null;
  const changed = (Object.keys(input) as Array<keyof Selection>).some(
    (key) => input[key] !== undefined && input[key] !== selection[key],
  );
  return { selection, family, size, housing, fabric, variant, availableSizeKeys,
    availableHousingIds, availableFabricCodes, changed };
}
