/* EclipseAwningConfigurator 1.1.0 | Four & More GmbH | built from build-src */
(function () {
"use strict";
const Catalog = (() => {
/**
 * Catalog port of the original Eclipse Markisen PWA (Step 8 FULL + Step 16).
 * The 299 source records, including item/variation IDs, remain unchanged.
 * Fabric display names and images use the corrected Step 16 UI definitions.
 * This catalog describes existing combinations, not live stock or prices.
 */
                                                                    
                                                          
                                                              
                                                                                                 
                                                                           
                                                                          
                          
                 
                      
                          
                                        
                  
                  
                       
                     
                                                                             
                     
 
                            
                 
                       
                  
                     
                 
 
                         
              
               
                               
                                     
                                   
                                   
                                        
                               
 
                                    
                       
                 
                   
                         
                       
                          
                                 
                                   
                                    
                                                                                      
                   
 

const families                    = [
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

const defaults                                                 = {
  vollkassette: families[0].defaultSelection,
  halbkassette: families[1].defaultSelection,
  gelenkarm: families[2].defaultSelection,
};

const allVariants                                              = families.flatMap(
  (family) => family.variants.map((variant) => ({ ...variant, model: family.id })),
);

/** Resolve dependent options in one synchronous pass, without Vue watcher races. */
function resolveSelection(input                     = {})                    {
  const family = families.find((candidate) => candidate.id === input.model) || families[0];
  const requested            = { ...family.defaultSelection, ...input, model: family.id };
  const selection            = { ...requested };
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
  const changed = (Object.keys(input)                          ).some(
    (key) => input[key] !== undefined && input[key] !== selection[key],
  );
  return { selection, family, size, housing, fabric, variant, availableSizeKeys,
    availableHousingIds, availableFabricCodes, changed };
}

return {families, defaults, allVariants, resolveSelection};
})();
const Viewer = (() => {
/**
 * Eclipse awning viewer, ported from the supplied PWA Step 8/16 module.
 * Geometry, mesh exclusions, fabric mapping and shading are preserved.
 * This file has no framework, build-time package or CDN dependency.
 */
                                                                        
                                 
                     
                       
                        
                  
                       
  
                                  
                                                     
                        
                      
  

let nextViewerId = 0;

function createAwningViewer(
  host             ,
  initial                   ,
  pluginResourceBase        ,
)                     {
  const props                    = { ...initial };
  const stage = document.createElement('div');
  stage.className = 'eam-viewer-stage';
  stage.style.cssText = 'position:absolute;inset:0;overflow:hidden;background:#fff;';
  const canvas = document.createElement('canvas');
  canvas.className = 'eam-viewer-canvas';
  canvas.tabIndex = 0;
  canvas.style.cssText = 'display:block;width:100%;height:100%;cursor:grab;touch-action:pan-y;';
  const status = document.createElement('div');
  status.className = 'eam-viewer-message';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.setAttribute('aria-atomic', 'true');
  status.style.cssText = 'position:absolute;inset:0;display:none;flex-direction:column;gap:8px;align-items:center;justify-content:center;padding:24px;background:rgba(255,255,255,.88);color:#52676c;z-index:4;text-align:center;pointer-events:none;';
  const statusText = document.createElement('span');
  statusText.className = 'eam-viewer-message-text';
  const statusLink = document.createElement('a');
  statusLink.className = 'eam-viewer-error-link';
  statusLink.target = '_blank';
  statusLink.rel = 'noopener noreferrer';
  statusLink.style.cssText = 'display:none;max-width:100%;overflow-wrap:anywhere;font-size:12px;line-height:1.4;color:inherit;text-decoration:underline;pointer-events:auto;';
  status.append(statusText, statusLink);
  const controls = document.createElement('div');
  controls.className = 'eam-viewer-controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', '3D-Ansicht steuern');
  controls.style.cssText = 'position:absolute;left:50%;bottom:62px;transform:translateX(-50%);z-index:6;display:flex;align-items:center;gap:5px;max-width:calc(100% - 24px);';
  const hint = document.createElement('div');
  hint.id = 'eam-viewer-help-' + (++nextViewerId);
  hint.className = 'eam-viewer-hint';
  hint.style.cssText = 'position:absolute;left:50%;bottom:104px;transform:translateX(-50%);z-index:3;max-width:calc(100% - 28px);width:max-content;text-align:center;font-size:11px;color:#607078;background:rgba(255,255,255,.8);padding:4px 8px;border-radius:8px;pointer-events:none;';
  canvas.setAttribute('aria-describedby', hint.id);
  stage.append(canvas, status, hint, controls);
  host.replaceChildren(stage);

  const listeners                    = [];
  let loading = false;
  let modelError = '';
  let textureError = '';
  let modelFailure                                                = null;
  let textureFailure                                                = null;
  let modelRequest = 0;
  let modelAbort                         = null;
  let textureAbort                         = null;
  let interactionEnabled = false;
  let activePointer                = null;

  function listen(target             , type        , fn               , options                          ) {
    target.addEventListener(type, fn, options);
    listeners.push(() => target.removeEventListener(type, fn, options));
  }
  function addButton(label        , text        , action            ) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'eam-viewer-control';
    button.textContent = text;
    button.title = label;
    button.setAttribute('aria-label', label);
    button.style.cssText = 'border:1px solid #cbd8de;border-radius:8px;background:rgba(255,255,255,.94);color:#005b81;padding:7px 11px;min-height:36px;min-width:36px;cursor:pointer;font:inherit;font-size:13px;line-height:1.2;';
    listen(button, 'click', action);
    controls.appendChild(button);
    return button;
  }
  addButton('3D-Ansicht verkleinern', '−', () => setZoom(zoom * 1.15));
  addButton('3D-Ansicht vergrößern', '+', () => setZoom(zoom / 1.15));
  addButton('3D-Ansicht zurücksetzen', '↺', resetView);
  const activateButton = addButton('3D-Bedienung aktivieren', '3D steuern', () => setInteraction(!interactionEnabled));
  activateButton.setAttribute('aria-pressed', 'false');
  const retryButton = addButton('3D-Vorschau erneut laden', 'Neu laden', () => {
    if (textureError && !modelError) {
      textureError = '';
      syncMessage();
      void loadFabricTexture();
    } else {
      void loadModel();
    }
  });
  retryButton.style.display = 'none';

  function setInteraction(enabled         ) {
    interactionEnabled = enabled;
    canvas.style.touchAction = enabled ? 'none' : 'pan-y';
    activateButton.setAttribute('aria-pressed', String(enabled));
    activateButton.setAttribute('aria-label', enabled ? '3D-Bedienung beenden und Seite scrollen' : '3D-Bedienung aktivieren');
    activateButton.textContent = enabled ? '3D beenden' : '3D steuern';
    hint.textContent = enabled
      ? 'Ziehen: drehen · Mausrad: zoomen · Esc: beenden'
      : 'Ziehen: drehen · Strg + Mausrad: zoomen · Mobil: „3D steuern“';
    if (!enabled) onPointerUp();
  }
  function syncMessage() {
    const message = modelError || textureError || (loading ? '3D-Modell wird geladen …' : '');
    const failure = modelError ? modelFailure : textureError ? textureFailure : null;
    statusText.textContent = message;
    statusLink.style.display = 'none';
    statusLink.textContent = '';
    statusLink.removeAttribute('href');
    if (failure) {
      try {
        const url = new URL(failure.url, document.baseURI);
        if (url.protocol === 'https:' || url.protocol === 'http:') {
          statusLink.href = url.href;
          statusLink.textContent = url.href;
          statusLink.title = modelError ? 'Modelldatei in neuem Tab öffnen' : 'Tuchtextur in neuem Tab öffnen';
          statusLink.style.display = 'inline';
        }
      } catch { /* The error text remains visible if an asset URL is malformed. */ }
    }
    status.style.display = message ? 'flex' : 'none';
    status.style.color = modelError || textureError ? '#9b2c2c' : '#52676c';
    status.classList.toggle('eam-viewer-message--error', !!(modelError || textureError));
    hint.style.display = message ? 'none' : 'block';
    retryButton.style.display = gl && (modelError || textureError) ? 'inline-block' : 'none';
    canvas.setAttribute('aria-busy', String(loading));
  }
  function setCanvasLabel() {
    const label = props.model === 'halbkassette' ? 'Halbkassettenmarkise'
      : props.model === 'gelenkarm' ? 'Gelenkarmmarkise' : 'Vollkassettenmarkise';
    canvas.setAttribute('aria-label', '3D-Vorschau der ' + label);
  }
let gl                                = null;
let program                      = null;
let resizeObserver                        = null;
let raf = 0;
let disposed = false;
let activeTexture                      = null;
let textureRequest = 0;

const buffers                = [];
const vaos                           = [];

                                                                                 

                
               
                           
                                           
                              
                
               
                         
                            
                            
                           
                               
                              
               
  

let meshes            = [];
let yaw = 0.43;
let pitch = 0.52;
let zoom = 1;
let dragging = false;
let lastX = 0;
let lastY = 0;
let fabricBounds = { minX: 0, maxX: 1, minZ: 0, maxZ: 1 };
let clothReferenceBounds = { minX: 0, maxX: 1, minZ: 0, maxZ: 1 };
let modelBounds = { min: [-2, -.2, -1.6], max: [2, .2, 1.6], center: [0, 0, 0], span: [4, .4, 3.2] };

const FABRIC_REFERENCE_WIDTH_MM = 3665.40134;
const FABRIC_REFERENCE_DEPTH_MM = 3020.64145;

const FULL_HIDDEN = new Set([
  'Chamfe_020', 'Chamfe_006', 'Base_E_005', '_6100____4', 'Chamfe_019',
  'Chamfer1', 'Base_Extru', 'Double_Cha', 'Base_E_012', 'M6_2', '9',
  'Chamfe_010', '1', 'Chamfe_016', '2', 'Chamfe_008', 'Base_E_007',
  'Chamfe_014', '_4', '_1', 'Chamfe_015', 'Double_022', 'Double_082',
  'Chamfe_075', '_1_089', '_4_078', 'Chamfe_074', 'Chamfe_083', 'Base_E_084',
  '2_090', 'Chamfe_076', 'Double_069', 'Base_E_072', 'M6_2_071', '9_073',
  'Chamfe_070', '1_077', 'Chamfe_087', 'Base_E_088', 'Chamfe_079',
  '_6100__081', 'Chamfe_085', 'Base_E_086', 'Chamfe_080',
]);

const FULL_GEOM = Object.freeze({
  referenceNominalWidthMm: 4000,
  referenceProjectionMm: 3000,
  foldedJointSafetyMm: 50,
  foldedReachFactor: .40,
  axisCenterX: .000794,
  rearHalfSpanM: 1.28548985,
  middleHalfSpanM: .88723790,
  frontHalfSpanM: 1.25812565,
  rearJointZ: -1.39002695,
  middleJointZ: .07825749,
  frontJointZ: 1.52233325,
});

const FULL_SOURCE                                                                            = {
  '-1': { rear: [-1.2846954, -1.3900274], middle: [-.88644415, .07825740], front: [-1.2573322, 1.5223328] },
  '1': { rear: [1.2862843, -1.3900265], middle: [.88803166, .07825758], front: [1.2589191, 1.5223337] },
};
const FULL_ARM                                                                                                     = {
  '_1_039': { side: -1, part: 'wall', a: [-1.2944, -1.3667], b: [-.8564, .0519] },
  '_1_034': { side: -1, part: 'front', a: [-.8638, .1082], b: [-1.2616, 1.4958] },
  '_1_041': { side: 1, part: 'wall', a: [1.2944, -1.3667], b: [.8564, .0519] },
  '_1_046': { side: 1, part: 'front', a: [.8638, .1082], b: [1.2616, 1.4958] },
};
const FULL_REAR                                   = { '5': { side: -1 }, '5_057': { side: 1 } };
const FULL_MID                                   = {
  '6_037': { side: -1 }, '1_038': { side: -1 }, '1_036': { side: -1 }, '_8': { side: -1 },
  '6_043': { side: 1 }, '1_042': { side: 1 }, '1_044': { side: 1 }, '_8_045': { side: 1 },
};
const FULL_FRONT                                   = {
  '6': { side: -1 }, '_6': { side: -1 }, '1_030': { side: -1 }, '1_031': { side: -1 }, 'Double_028': { side: -1 }, 'Double_029': { side: -1 }, 'Base_E_026': { side: -1 }, 'Base_E_025': { side: -1 }, 'HeadFillet': { side: -1 }, 'HeadFi_027': { side: -1 },
  '6_047': { side: 1 }, '_6_048': { side: 1 }, '1_049': { side: 1 }, '1_050': { side: 1 }, 'Double_052': { side: 1 }, 'Double_051': { side: 1 }, 'Base_E_054': { side: 1 }, 'Base_E_055': { side: 1 }, 'HeadFi_056': { side: 1 }, 'HeadFi_053': { side: 1 },
};
const FULL_SIDE                                            = { '2_110': { shiftWithSide: -1 } };

                                                                                                                                                                          

function bboxFromPositions(values              )         {
  const min = [Infinity, Infinity, Infinity]; const max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < values.length; i += 3) for (let k = 0; k < 3; k += 1) { min[k] = Math.min(min[k], values[i + k]); max[k] = Math.max(max[k], values[i + k]); }
  return { min, max, center: min.map((v, k) => (v + max[k]) / 2), size: min.map((v, k) => max[k] - v) };
}
function mapSegmentPoint(x       ,z       ,srcA                ,srcB                ,dstA                ,dstB                ) {
  const vx=srcB[0]-srcA[0], vz=srcB[1]-srcA[1], sl=Math.hypot(vx,vz)||1, ux=vx/sl, uz=vz/sl, px=-uz, pz=ux;
  const rx=x-srcA[0], rz=z-srcA[1], along=rx*ux+rz*uz, perp=rx*px+rz*pz;
  const tx=dstB[0]-dstA[0], tz=dstB[1]-dstA[1], tl=Math.hypot(tx,tz)||1, tux=tx/tl, tuz=tz/tl, tpx=-tuz, tpz=tux;
  return [dstA[0]+tux*(along/sl*tl)+tpx*perp, dstA[1]+tuz*(along/sl*tl)+tpz*perp, Math.atan2(tuz,tux)-Math.atan2(uz,ux)]                          ;
}
function rotateNormalXZ(nx       ,nz       ,a       ) { const c=Math.cos(a), s=Math.sin(a); return [nx*c-nz*s, nx*s+nz*c]                   ; }
function angleBisectorXZ(p                ,a                ,b                ) {
  const v1=norm([a[0]-p[0],0,a[1]-p[1]]), v2=norm([b[0]-p[0],0,b[1]-p[1]]); let sx=v1[0]+v2[0], sz=v1[2]+v2[2];
  if (Math.hypot(sx,sz)<1e-7) { sx=v2[0]-v1[0]; sz=v2[2]-v1[2]; } return Math.atan2(sz,sx);
}
function fullSourceJoint(side     ,kind                        ) { return FULL_SOURCE[String(side)            ][kind]; }
function fullMetrics()              {
  const g=FULL_GEOM, w=props.widthMm/1000, p=props.projectionMm/1000, dw=(props.widthMm-g.referenceNominalWidthMm)/1000, dp=(props.projectionMm-g.referenceProjectionMm)/1000;
  const naturalShoulder=g.rearHalfSpanM+dw/2, foldedReach=g.foldedReachFactor*p, minShoulder=foldedReach+g.foldedJointSafetyMm/2000;
  const shoulder=Math.min(w/2-.15,Math.max(naturalShoulder,minShoulder)), clearance=Math.max(0,(2*shoulder-2*foldedReach)*1000);
  const middleInset=(g.rearHalfSpanM-g.middleHalfSpanM)*(p/(g.referenceProjectionMm/1000)), middle=Math.max(.12,shoulder-middleInset);
  const frontInset=(g.rearHalfSpanM-g.frontHalfSpanM)*(p/(g.referenceProjectionMm/1000)), front=Math.max(.12,shoulder-frontInset);
  const frontZ=g.frontJointZ+dp, midT=(g.middleJointZ-g.rearJointZ)/(g.frontJointZ-g.rearJointZ), midZ=g.rearJointZ+(frontZ-g.rearJointZ)*midT;
  return {w,p,dw,dp,shoulder,middle,front,rearZ:g.rearJointZ,frontZ,midZ,clearance};
}
function fullTargetJoint(side     ,kind                        ,m            )                 { const cx=FULL_GEOM.axisCenterX; if(kind==='rear')return[cx+side*m.shoulder,m.rearZ]; if(kind==='middle')return[cx+side*m.middle,m.midZ]; return[cx+side*m.front,m.frontZ]; }
function fullMiddleTransform(side     ,x       ,z       ,m            ) {
  const sp=fullSourceJoint(side,'middle'), sw=fullSourceJoint(side,'rear'), sf=fullSourceJoint(side,'front'), dp=fullTargetJoint(side,'middle',m), dw=fullTargetJoint(side,'rear',m), df=fullTargetJoint(side,'front',m);
  const sa=angleBisectorXZ(sp,sw,sf), da=angleBisectorXZ(dp,dw,df), a=da-sa, c=Math.cos(a), s=Math.sin(a), rx=x-sp[0], rz=z-sp[1]; return [dp[0]+rx*c-rz*s,dp[1]+rx*s+rz*c,a]                          ;
}
function fullEndpointTransform(side     ,where               ,x       ,z       ,m            ) {
  const sp=fullSourceJoint(side,where), so=fullSourceJoint(side,'middle'), dp=fullTargetJoint(side,where,m), dO=fullTargetJoint(side,'middle',m);
  const sa=Math.atan2(so[1]-sp[1],so[0]-sp[0]), da=Math.atan2(dO[1]-dp[1],dO[0]-dp[0]), a=da-sa, c=Math.cos(a), s=Math.sin(a), rx=x-sp[0], rz=z-sp[1]; return [dp[0]+rx*c-rz*s,dp[1]+rx*s+rz*c,a]                          ;
}
function fullArmSegmentTargets(seg                                                                    ,m            ) {
  const kindA                =seg.part==='wall'?'rear':'middle';
  const kindB                 =seg.part==='wall'?'middle':'front';
  const srcJointA=fullSourceJoint(seg.side,kindA),srcJointB=fullSourceJoint(seg.side,kindB);
  const dstJointA=fullTargetJoint(seg.side,kindA,m),dstJointB=fullTargetJoint(seg.side,kindB,m);
  const srcAngle=Math.atan2(srcJointB[1]-srcJointA[1],srcJointB[0]-srcJointA[0]);
  const dstAngle=Math.atan2(dstJointB[1]-dstJointA[1],dstJointB[0]-dstJointA[0]);
  const delta=dstAngle-srcAngle,c=Math.cos(delta),s=Math.sin(delta);
  const transformEnd=(point                ,srcJoint                ,dstJoint                )=>{
    const ox=point[0]-srcJoint[0],oz=point[1]-srcJoint[1];
    return [dstJoint[0]+ox*c-oz*s,dstJoint[1]+ox*s+oz*c]                   ;
  };
  return {
    dstA:transformEnd(seg.a,srcJointA,dstJointA),
    dstB:transformEnd(seg.b,srcJointB,dstJointB),
  };
}
function fullTransform(mesh        ,x       ,y       ,z       ,m            )                               {
  const b=mesh.bbox,c=b.center,name=mesh.name,side     =c[0]<0?-1:1; let nx=x,ny=y,nz=z;
  if(mesh.role==='fabric'){const sx=(b.size[0]+m.dw)/b.size[0], sz=(b.size[2]+m.dp)/b.size[2];return[(x-c[0])*sx+c[0],ny,clothReferenceBounds.minZ+(z-clothReferenceBounds.minZ)*sz,0];}
  const seg=FULL_ARM[name]; if(seg){const target=fullArmSegmentTargets(seg,m),q=mapSegmentPoint(x,z,seg.a,seg.b,target.dstA,target.dstB);return[q[0],ny,q[1],q[2]];}
  const ra=FULL_REAR[name]; if(ra){const q=fullEndpointTransform(ra.side,'rear',x,z,m);return[q[0],ny,q[1],q[2]];}
  const sidePart=FULL_SIDE[name]; if(sidePart)return[x+sidePart.shiftWithSide*m.dw/2,ny,nz,0];
  const ma=FULL_MID[name]; if(ma){const q=fullMiddleTransform(ma.side,x,z,m);return[q[0],ny,q[1],q[2]];}
  const fa=FULL_FRONT[name]; if(fa){const q=fullEndpointTransform(fa.side,'front',x,z,m);return[q[0],ny,q[1],q[2]];}
  if(b.size[0]>3){const sx=(b.size[0]+m.dw)/b.size[0];nx=(x-c[0])*sx+c[0];if(c[2]>1)nz=z+m.dp;return[nx,ny,nz,0];}
  if(Math.abs(c[0])>1.70){nx=x+side*m.dw/2;if(c[2]>1)nz=z+m.dp;return[nx,ny,nz,0];}
  if(Math.abs(c[0])>1.05&&Math.abs(c[0])<1.50&&c[2]<-1.15&&c[2]>-1.55){const sp=fullSourceJoint(side,'rear'),tp=fullTargetJoint(side,'rear',m);return[x+tp[0]-sp[0],ny,z+tp[1]-sp[1],0];}
  if(Math.abs(c[0])>1.05&&Math.abs(c[0])<1.50&&c[2]>1.20){const sp=fullSourceJoint(side,'front'),tp=fullTargetJoint(side,'front',m);return[x+tp[0]-sp[0],ny,z+tp[1]-sp[1],0];}
  if(c[2]>1.20)nz=z+m.dp; return[nx,ny,nz,0];
}


const HALF_GEOM = Object.freeze({
  referenceWidthMm:2950,
  referenceProjectionMm:2500,
  outerHalf:1.4745,
  rearHalf:1.2729514,
  middleHalf:1.027316,
  frontHalf:1.1927736,
  rearZ:.0581188,
  middleZ:1.254644,
  frontZ:2.417846,
  clothMinZ:.098634,
  clothMaxZ:2.442773,
  clothWidth:2.82,
});
const HALF_SOURCE                                                                    = {
  '-1': { rear:[-1.2729514,.0581188], middle:[-1.027316,1.254644], front:[-1.1927736,2.417846] },
  '1': { rear:[1.2729514,.0581188], middle:[1.027316,1.254644], front:[1.1927736,2.417846] },
};
const HALF_ARM                                                 = {
  'part_19':{side:-1,part:'wall'}, 'part_22':{side:-1,part:'front'},
  'part_28':{side:1,part:'wall'}, 'part_31':{side:1,part:'front'},
};
const HALF_REAR                      = Object.fromEntries([
  ['part_17',-1],['part_16',-1],['part_18',-1],['part_38',-1],['part 2_2',-1],['part_35',-1],['part_15',-1],['part_36',-1],['part 2_3',-1],['part 2_4',-1],['part_37',-1],['part 2_8',-1],['part 2_1',-1],['part 2_7',-1],['part_47',-1],['part_45',-1],['part_34',-1],
  ['part_26',1],['part_25',1],['part_27',1],['part 2_5',1],['part 4_1',1],['part 3_1',1],['part 2',1],['part 3_2',1],['part 4_2',1],['part 4_3',1],['part 3_3',1],['part 3_5',1],['part 3',1],['part 3_4',1],['part 4_5',1],['part 4_4',1],['part 4',1],
]                   );
const HALF_MID                      = Object.fromEntries([
  ['part_52',-1],['part_21',-1],['part_20',-1],['part 2_13',1],['part_30',1],['part_29',1],
]                   );
const HALF_FRONT                      = Object.fromEntries([
  ['part_24',-1],['part_42',-1],['part_23',-1],['part_33',1],['part 2_6',1],['part_32',1],
]                   );
const HALF_FRONT_ENDCAPS                      = { 'part_41':-1, 'part_40':1 };
const HALF_MOTOR_SHIFT = new Set(['part_3']);
const HALF_HIDDEN = new Set(['part_44','part 5','part_46','part 5_1']);
const HALF_VALANCE_FABRIC = new Set(['groupNumber_25']);
const HALF_VALANCE_WHITE = new Set(['groupNumber_12']);

                                                                                                                                                                
function halfSourceJoint(side     ,kind                        ) { return HALF_SOURCE[String(side)            ][kind]; }
function halfMetrics()              {
  const w=props.widthMm/1000,p=props.projectionMm/1000,dw=w-HALF_GEOM.referenceWidthMm/1000,pf=p/(HALF_GEOM.referenceProjectionMm/1000);
  const rear=Math.max(.30,w/2-(HALF_GEOM.outerHalf-HALF_GEOM.rearHalf));
  const middle=Math.max(.12,rear-(HALF_GEOM.rearHalf-HALF_GEOM.middleHalf)*pf);
  const front=Math.max(.20,w/2-(HALF_GEOM.outerHalf-HALF_GEOM.frontHalf));
  const rearZ=HALF_GEOM.rearZ,middleZ=rearZ+(HALF_GEOM.middleZ-rearZ)*pf,frontZ=rearZ+(HALF_GEOM.frontZ-rearZ)*pf;
  return {w,p,dw,pf,rear,middle,front,rearZ,middleZ,frontZ,frontDelta:frontZ-HALF_GEOM.frontZ};
}
function halfTargetJoint(side     ,kind                        ,m            )                 {
  if(kind==='rear')return[side*m.rear,m.rearZ]; if(kind==='middle')return[side*m.middle,m.middleZ]; return[side*m.front,m.frontZ];
}
function halfMiddleTransform(side     ,x       ,z       ,m            ) {
  const sp=halfSourceJoint(side,'middle'),sw=halfSourceJoint(side,'rear'),sf=halfSourceJoint(side,'front'),dp=halfTargetJoint(side,'middle',m),dw=halfTargetJoint(side,'rear',m),df=halfTargetJoint(side,'front',m);
  const sa=angleBisectorXZ(sp,sw,sf),da=angleBisectorXZ(dp,dw,df),a=da-sa,c=Math.cos(a),s=Math.sin(a),rx=x-sp[0],rz=z-sp[1];
  return [dp[0]+rx*c-rz*s,dp[1]+rx*s+rz*c,a]                          ;
}
function halfEndpointTransform(side     ,where               ,x       ,z       ,m            ) {
  const kind=where==='rear'?'rear':'front',sp=halfSourceJoint(side,kind),so=halfSourceJoint(side,'middle'),dp=halfTargetJoint(side,kind,m),dO=halfTargetJoint(side,'middle',m);
  const sa=Math.atan2(so[1]-sp[1],so[0]-sp[0]),da=Math.atan2(dO[1]-dp[1],dO[0]-dp[0]),a=da-sa,c=Math.cos(a),s=Math.sin(a),rx=x-sp[0],rz=z-sp[1];
  return [dp[0]+rx*c-rz*s,dp[1]+rx*s+rz*c,a]                          ;
}
function halfTransform(mesh        ,x       ,y       ,z       ,m            )                               {
  const b=mesh.bbox,c=b.center,name=mesh.name,side     =c[0]<0?-1:1; let nx=x,ny=y,nz=z;
  if(mesh.role==='fabric') { const targetWidth=Math.max(.25,HALF_GEOM.clothWidth+m.dw),sx=targetWidth/HALF_GEOM.clothWidth; return[x*sx,ny,HALF_GEOM.clothMinZ+(z-HALF_GEOM.clothMinZ)*m.pf,0]; }
  const seg=HALF_ARM[name]; if(seg) { const sr=halfSourceJoint(seg.side,'rear'),sm=halfSourceJoint(seg.side,'middle'),sf=halfSourceJoint(seg.side,'front'),dr=halfTargetJoint(seg.side,'rear',m),dm=halfTargetJoint(seg.side,'middle',m),df=halfTargetJoint(seg.side,'front',m); const q=mapSegmentPoint(x,z,seg.part==='wall'?sr:sm,seg.part==='wall'?sm:sf,seg.part==='wall'?dr:dm,seg.part==='wall'?dm:df); return[q[0],ny,q[1],q[2]]; }
  const rearSide=HALF_REAR[name]; if(rearSide) { const q=halfEndpointTransform(rearSide,'rear',x,z,m); return[q[0],ny,q[1],q[2]]; }
  const midSide=HALF_MID[name]; if(midSide) { const q=halfMiddleTransform(midSide,x,z,m); return[q[0],ny,q[1],q[2]]; }
  const frontSide=HALF_FRONT[name]; if(frontSide) { const q=halfEndpointTransform(frontSide,'front',x,z,m); return[q[0],ny,q[1],q[2]]; }
  const capSide=HALF_FRONT_ENDCAPS[name]; if(capSide) return[x+capSide*m.dw/2,ny,z+m.frontDelta,0];
  if(HALF_MOTOR_SHIFT.has(name)) return[x+m.dw/2,ny,nz,0];
  if(b.size[0]>2.0) { const sx=(b.size[0]+m.dw)/b.size[0]; nx=(x-c[0])*sx+c[0]; if(c[2]>2.20)nz=z+m.frontDelta; return[nx,ny,nz,0]; }
  if(c[2]>2.30) return[x*(m.w/(HALF_GEOM.referenceWidthMm/1000)),ny,z+m.frontDelta,0];
  if(c[2]<.25&&Math.abs(c[0])>1.35) return[x+side*m.dw/2,ny,nz,0];
  if(c[2]>2.15&&Math.abs(c[0])>1.25) return[x+side*m.dw/2,ny,z+m.frontDelta,0];
  return[nx,ny,nz,0];
}


const ARM_GEOM = Object.freeze({
  referenceWidthMm:3000,
  referenceProjectionMm:2500,
  outerHalf:1.5,
  rearHalf:1.176803,
  middleHalf:.20341,
  frontHalf:.888635,
  rearZ:.050012,
  middleZ:1.040725,
  frontZ:2.465987,
  clothWidth:2.901863,
  clothMinZ:0,
  clothMaxZ:2.5,
});
const ARM_SOURCE                                                                    = {
  '-1': { rear:[-1.1754511,.0500107], middle:[-.20206,1.04072], front:[-.8872802,2.4659914] },
  '1': { rear:[1.1781549,.0500129], middle:[.20476,1.04073], front:[.8899895,2.4659822] },
};
const ARM_SEGMENTS                                                 = {
  'Obj_000047':{side:-1,part:'wall'}, 'Obj_000044':{side:-1,part:'front'},
  'Obj_000056':{side:1,part:'wall'}, 'Obj_000053':{side:1,part:'front'},
};
const ARM_REAR                      = Object.fromEntries([
  ['Obj_000027',-1],['Obj_000028',-1],['Obj_000029',-1],['Obj_000030',-1],['Obj_000031',-1],['Obj_000032',-1],['Obj_000033',-1],['Obj_000034',-1],['Obj_000035',-1],['Obj_000036',-1],['Obj_000037',-1],['Obj_000038',-1],['Obj_000039',-1],['Obj_000040',-1],['Obj_000041',-1],['Obj_000048',-1],['Obj_000049',-1],['Obj_000050',-1],['Obj_000066',-1],
  ['Obj_000057',1],['Obj_000058',1],['Obj_000059',1],['Obj_000060',1],['Obj_000061',1],['Obj_000062',1],['Obj_000063',1],['Obj_000064',1],['Obj_000065',1],['Obj_000067',1],['Obj_000068',1],['Obj_000069',1],['Obj_000070',1],['Obj_000071',1],['Obj_000072',1],['Obj_000073',1],['Obj_000074',1],['Obj_000075',1],['Obj_000076',1],
]                   );
const ARM_MID                      = Object.fromEntries([
  ['Obj_000004',-1],['Obj_000045',-1],['Obj_000046',-1],['Obj_000005',1],['Obj_000054',1],['Obj_000055',1],
]                   );
const ARM_FRONT                      = Object.fromEntries([
  ['Obj_000022',-1],['Obj_000042',-1],['Obj_000043',-1],['Obj_000023',1],['Obj_000051',1],['Obj_000052',1],
]                   );
const ARM_FRONT_CAPS                      = { 'Obj_000025':-1, 'Obj_000024':1 };
const ARM_HIDDEN = new Set([
  'Obj_000006','Obj_000007','Obj_000008','Obj_000009','Obj_000010','Obj_000011','Obj_000012','Obj_000013','Obj_000014','Obj_000015','Obj_000016','Obj_000017','Obj_000018','Obj_000019','Obj_000020',
]);
const ARM_VALANCE_FABRIC = new Set(['shell_2']);
const ARM_VALANCE_WHITE = new Set(['shell_3']);

                                                                                                                                                               
function armSourceJoint(side     ,kind                        ) { return ARM_SOURCE[String(side)            ][kind]; }
function armMetrics()             {
  const w=props.widthMm/1000,p=props.projectionMm/1000,dw=w-ARM_GEOM.referenceWidthMm/1000,pf=p/(ARM_GEOM.referenceProjectionMm/1000);
  const rear=Math.max(.30,w/2-(ARM_GEOM.outerHalf-ARM_GEOM.rearHalf));
  const front=Math.max(.20,w/2-(ARM_GEOM.outerHalf-ARM_GEOM.frontHalf));
  const middle=Math.max(.10,rear-(ARM_GEOM.rearHalf-ARM_GEOM.middleHalf)*pf);
  const rearZ=ARM_GEOM.rearZ,middleZ=rearZ+(ARM_GEOM.middleZ-rearZ)*pf,frontZ=rearZ+(ARM_GEOM.frontZ-rearZ)*pf;
  return {w,p,dw,pf,rear,middle,front,rearZ,middleZ,frontZ,frontDelta:frontZ-ARM_GEOM.frontZ};
}
function armTargetJoint(side     ,kind                        ,m           )                 {
  if(kind==='rear')return[side*m.rear,m.rearZ]; if(kind==='middle')return[side*m.middle,m.middleZ]; return[side*m.front,m.frontZ];
}
function armMiddleTransform(side     ,x       ,z       ,m           ) {
  const sp=armSourceJoint(side,'middle'),sw=armSourceJoint(side,'rear'),sf=armSourceJoint(side,'front'),dp=armTargetJoint(side,'middle',m),dw=armTargetJoint(side,'rear',m),df=armTargetJoint(side,'front',m);
  const sa=angleBisectorXZ(sp,sw,sf),da=angleBisectorXZ(dp,dw,df),a=da-sa,c=Math.cos(a),s=Math.sin(a),rx=x-sp[0],rz=z-sp[1];
  return [dp[0]+rx*c-rz*s,dp[1]+rx*s+rz*c,a]                          ;
}
function armEndpointTransform(side     ,where               ,x       ,z       ,m           ) {
  const kind=where==='rear'?'rear':'front',sp=armSourceJoint(side,kind),so=armSourceJoint(side,'middle'),dp=armTargetJoint(side,kind,m),dO=armTargetJoint(side,'middle',m);
  const sa=Math.atan2(so[1]-sp[1],so[0]-sp[0]),da=Math.atan2(dO[1]-dp[1],dO[0]-dp[0]),a=da-sa,c=Math.cos(a),s=Math.sin(a),rx=x-sp[0],rz=z-sp[1];
  return [dp[0]+rx*c-rz*s,dp[1]+rx*s+rz*c,a]                          ;
}
function armTransform(mesh        ,x       ,y       ,z       ,m           )                               {
  const b=mesh.bbox,c=b.center,name=mesh.name,side     =c[0]<0?-1:1; let nx=x,ny=y,nz=z;
  if(mesh.role==='fabric'){const target=Math.max(.25,ARM_GEOM.clothWidth+m.dw),sx=target/ARM_GEOM.clothWidth;return[(x-c[0])*sx+c[0],ny,ARM_GEOM.clothMinZ+(z-ARM_GEOM.clothMinZ)*m.pf,0];}
  const seg=ARM_SEGMENTS[name]; if(seg){const sr=armSourceJoint(seg.side,'rear'),sm=armSourceJoint(seg.side,'middle'),sf=armSourceJoint(seg.side,'front'),dr=armTargetJoint(seg.side,'rear',m),dm=armTargetJoint(seg.side,'middle',m),df=armTargetJoint(seg.side,'front',m),q=mapSegmentPoint(x,z,seg.part==='wall'?sr:sm,seg.part==='wall'?sm:sf,seg.part==='wall'?dr:dm,seg.part==='wall'?dm:df);return[q[0],ny,q[1],q[2]];}
  const rearSide=ARM_REAR[name]; if(rearSide){const q=armEndpointTransform(rearSide,'rear',x,z,m);return[q[0],ny,q[1],q[2]];}
  const midSide=ARM_MID[name]; if(midSide){const q=armMiddleTransform(midSide,x,z,m);return[q[0],ny,q[1],q[2]];}
  const frontSide=ARM_FRONT[name]; if(frontSide){const q=armEndpointTransform(frontSide,'front',x,z,m);return[q[0],ny,q[1],q[2]];}
  const capSide=ARM_FRONT_CAPS[name]; if(capSide)return[x+capSide*m.dw/2,ny,z+m.frontDelta,0];
  if(b.size[0]>2.0){const sx=(b.size[0]+m.dw)/b.size[0];nx=(x-c[0])*sx+c[0];if(c[2]>2.30)nz=z+m.frontDelta;return[nx,ny,nz,0];}
  if(c[2]>2.30){nx=x+side*m.dw/2;nz=z+m.frontDelta;return[nx,ny,nz,0];}
  if(c[2]<.20&&Math.abs(c[0])>1.30){nx=x+side*m.dw/2;return[nx,ny,nz,0];}
  return[nx,ny,nz,0];
}

// plugin_path() already points to the plugin resources directory.
const modelUrl = () => pluginResourceBase.replace(/\/+$/, '') + '/documents/awning-configurator/models/' + (props.model === 'vollkassette'
  ? 'vollkassette-6100.glb' : props.model === 'halbkassette'
    ? 'halbkassette-2950.glb' : 'gelenkarm-1100.glb');

const hexRgb = (hex        ) => {
  const value = Number.parseInt(hex.replace('#', ''), 16);
  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ];
};

function shader(type        , source        ) {
  if (!gl) throw new Error('WebGL ist nicht initialisiert.');
  const s = gl.createShader(type);
  if (!s) throw new Error('Shader konnte nicht erstellt werden.');
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(s) || 'Shader-Fehler';
    gl.deleteShader(s);
    throw new Error(message);
  }
  return s;
}

function makeProgram(vertexSource        , fragmentSource        ) {
  if (!gl) throw new Error('WebGL ist nicht initialisiert.');
  const p = gl.createProgram();
  if (!p) throw new Error('WebGL-Programm konnte nicht erstellt werden.');
  let v                     = null;
  let f                     = null;
  try {
    v = shader(gl.VERTEX_SHADER, vertexSource);
    f = shader(gl.FRAGMENT_SHADER, fragmentSource);
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(p) || 'WebGL-Link-Fehler');
    }
    return p;
  } catch (cause) {
    gl.deleteProgram(p);
    throw cause;
  } finally {
    if (v) gl.deleteShader(v);
    if (f) gl.deleteShader(f);
  }
}

const vertexSource = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
uniform mat4 uMvp;
out vec3 vNormal;
out vec3 vPosition;
void main(){
  vNormal = aNormal;
  vPosition = aPosition;
  gl_Position = uMvp * vec4(aPosition, 1.0);
}`;

const fragmentSource = `#version 300 es
precision highp float;
in vec3 vNormal;
in vec3 vPosition;
uniform vec3 uColor;
uniform vec3 uEye;
uniform float uFabric;
uniform float uHasTexture;
uniform sampler2D uTex;
uniform vec2 uFabricMin;
uniform vec2 uFabricInvSize;
out vec4 fragColor;
void main(){
  vec3 n = normalize(vNormal);
  if(!gl_FrontFacing) n = -n;
  vec3 l = normalize(vec3(-2.8,5.0,3.7));
  vec3 fill = normalize(vec3(4.0,2.0,-3.0));
  vec3 view = normalize(uEye-vPosition);
  vec3 base;
  if(uFabric>.5 && uHasTexture>.5){
    vec2 uv=(vPosition.xz-uFabricMin)*uFabricInvSize;
    uv.y=1.0-uv.y;
    base=texture(uTex,uv).rgb;
  } else {
    base=pow(uColor,vec3(2.2));
  }
  vec3 c;
  if(uFabric<.5){
    float diffuse=.50+.07*n.y+.53*max(dot(n,l),0.0)+.20*max(dot(n,fill),0.0);
    c=base*diffuse;
    vec3 h=normalize(l+view);
    float spec=pow(max(dot(n,h),0.0),30.0)*.105*max(dot(n,l),0.0);
    float broad=pow(max(dot(n,h),0.0),7.0)*.050;
    float rim=pow(1.0-max(dot(n,view),0.0),3.0)*.010;
    c+=vec3(spec+broad+rim);
  } else {
    float ndv=max(dot(n,view),0.0);
    float wrap=.58+.42*max(dot(n,l)*.78+.22,0.0)+.12*max(dot(n,fill),0.0);
    float sheen=pow(1.0-ndv,3.2)*.065;
    float soft=pow(max(dot(n,normalize(l+view)),0.0),7.0)*.018;
    c=base*(wrap+.025)+base*sheen+vec3(soft);
  }
  c=pow(max(c,vec3(0.0)),vec3(1.0/2.2));
  fragColor=vec4(clamp(c,0.0,1.0),1.0);
}`;

const clamp = (value        , min        , max        ) => Math.min(max, Math.max(min, value));
const cross = (a          , b          ) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const dot = (a          , b          ) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a          ) => {
  const length = Math.hypot(...a) || 1;
  return a.map((v) => v / length);
};

function lookAt(eye          , target          ) {
  const z = norm(eye.map((v, i) => v - target[i]));
  const x = norm(cross([0, 1, 0], z));
  const y = cross(z, x);
  return new Float32Array([
    x[0], y[0], z[0], 0,
    x[1], y[1], z[1], 0,
    x[2], y[2], z[2], 0,
    -dot(x, eye), -dot(y, eye), -dot(z, eye), 1,
  ]);
}

function perspective(fov        , aspect        , near        , far        ) {
  const f = 1 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ]);
}

function multiply(a              , b              ) {
  const result = new Float32Array(16);
  for (let c = 0; c < 4; c += 1) {
    for (let r = 0; r < 4; r += 1) {
      for (let k = 0; k < 4; k += 1) {
        result[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
      }
    }
  }
  return result;
}

function disposeGpu() {
  if (!gl) return;
  for (const vao of vaos) gl.deleteVertexArray(vao);
  for (const buffer of buffers) gl.deleteBuffer(buffer);
  vaos.length = 0;
  buffers.length = 0;
  meshes = [];
}

function disposeTexture() {
  if (gl && activeTexture) gl.deleteTexture(activeTexture);
  activeTexture = null;
}

function initWebGl() {
  if (!canvas) return;
  gl = canvas.getContext('webgl2', {
    alpha: true,
    antialias: true,
    premultipliedAlpha: false,
  });
  if (!gl) throw new Error('WebGL 2 wird von diesem Browser nicht unterstützt.');
  program = makeProgram(vertexSource, fragmentSource);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.disable(gl.CULL_FACE);
  gl.clearColor(1, 1, 1, 1);
}

function accessorFactory(buffer             , json     , binOffset        , binLength        ) {
  const arrays                      = { 5126: Float32Array, 5125: Uint32Array, 5123: Uint16Array };
  const components                         = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };

  return (index        ) => {
    const accessor = json.accessors[index];
    const view = json.bufferViews[accessor.bufferView];
    const ArrayType = arrays[accessor.componentType];
    const size = components[accessor.type];
    if (!ArrayType || !size || view.byteStride || accessor.sparse || view.buffer !== 0) {
      throw new Error('Nicht unterstütztes GLB-Accessor-Format.');
    }
    const offset = (view.byteOffset || 0) + (accessor.byteOffset || 0);
    const count = accessor.count * size;
    if (offset + count * ArrayType.BYTES_PER_ELEMENT > binLength) {
      throw new Error('GLB-Accessor liegt außerhalb des Puffers.');
    }
    return { array: new ArrayType(buffer, binOffset + offset, count), spec: accessor };
  };
}

function uploadGlb(buffer             ) {
  if (!gl) throw new Error('WebGL ist nicht initialisiert.');
  const view = new DataView(buffer);
  if (view.byteLength < 20 || view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2) throw new Error('Ungültige GLB-Datei.');
  let at=12,json    =null,binOffset=0,binLength=0;
  while(at<buffer.byteLength){if(at+8>buffer.byteLength)throw new Error('Unvollständige GLB-Datei.');const length=view.getUint32(at,true),type=view.getUint32(at+4,true);at+=8;if(at+length>buffer.byteLength)throw new Error('Unvollständiger GLB-Datenblock.');if(type===0x4e4f534a)json=JSON.parse(new TextDecoder().decode(new Uint8Array(buffer,at,length)).replace(/\0+$/,''));if(type===0x004e4942){binOffset=at;binLength=length}at+=length;}
  if(!json||!binOffset||!json.meshes)throw new Error('GLB-Geometrie fehlt.');
  const accessor=accessorFactory(buffer,json,binOffset,binLength);let minFabricX=Infinity,maxFabricX=-Infinity,minFabricZ=Infinity,maxFabricZ=-Infinity;
  for(const sourceMesh of json.meshes){const role=sourceMesh.extras?.role                              ;if(role!=='frame'&&role!=='fabric')continue;if(props.model==='vollkassette'&&FULL_HIDDEN.has(sourceMesh.name))continue;if(props.model==='halbkassette'&&HALF_HIDDEN.has(sourceMesh.name))continue;if(props.model==='gelenkarm'&&ARM_HIDDEN.has(sourceMesh.name))continue;const renderRole                         =props.model==='halbkassette'&&HALF_VALANCE_FABRIC.has(sourceMesh.name)?'fabric':props.model==='halbkassette'&&HALF_VALANCE_WHITE.has(sourceMesh.name)?'white':props.model==='gelenkarm'&&ARM_VALANCE_FABRIC.has(sourceMesh.name)?'fabric':props.model==='gelenkarm'&&ARM_VALANCE_WHITE.has(sourceMesh.name)?'white':role;
    for(const primitive of sourceMesh.primitives){if(primitive.attributes.POSITION===undefined||primitive.indices===undefined)continue;const positions=accessor(primitive.attributes.POSITION),normals=primitive.attributes.NORMAL!==undefined?accessor(primitive.attributes.NORMAL):null,indices=accessor(primitive.indices);
      const originalPos=new Float32Array(positions.array                ),workingPos=new Float32Array(originalPos),originalNormal=normals?new Float32Array(normals.array                ):new Float32Array(originalPos.length);if(!normals)for(let i=1;i<originalNormal.length;i+=3)originalNormal[i]=1;const workingNormal=new Float32Array(originalNormal),bbox=bboxFromPositions(originalPos);
      if(role==='fabric')for(let i=0;i<originalPos.length;i+=3){minFabricX=Math.min(minFabricX,originalPos[i]);maxFabricX=Math.max(maxFabricX,originalPos[i]);minFabricZ=Math.min(minFabricZ,originalPos[i+2]);maxFabricZ=Math.max(maxFabricZ,originalPos[i+2]);}
      const vao=gl.createVertexArray();if(!vao)throw new Error('VAO konnte nicht erstellt werden.');vaos.push(vao);gl.bindVertexArray(vao);
      const posBuffer=gl.createBuffer();if(!posBuffer)throw new Error('Positionspuffer konnte nicht erstellt werden.');buffers.push(posBuffer);gl.bindBuffer(gl.ARRAY_BUFFER,posBuffer);gl.bufferData(gl.ARRAY_BUFFER,workingPos,gl.DYNAMIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,0,0);
      const normalBuffer=gl.createBuffer();if(!normalBuffer)throw new Error('Normalenpuffer konnte nicht erstellt werden.');buffers.push(normalBuffer);gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);gl.bufferData(gl.ARRAY_BUFFER,workingNormal,gl.DYNAMIC_DRAW);gl.enableVertexAttribArray(1);gl.vertexAttribPointer(1,3,gl.FLOAT,false,0,0);
      const indexBuffer=gl.createBuffer();if(!indexBuffer)throw new Error('Indexpuffer konnte nicht erstellt werden.');buffers.push(indexBuffer);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices.array,gl.STATIC_DRAW);
      meshes.push({name:sourceMesh.name,role,renderRole,vao,count:indices.spec.count,type:indices.spec.componentType,posBuffer,normalBuffer,originalPos,workingPos,originalNormal,workingNormal,bbox});
    }
  }
  if(Number.isFinite(minFabricX)){fabricBounds={minX:minFabricX,maxX:maxFabricX,minZ:minFabricZ,maxZ:maxFabricZ};clothReferenceBounds={...fabricBounds};}
  gl.bindVertexArray(null);applyParametricGeometry();
}

function applyParametricGeometry(){
  if(!gl||meshes.length===0)return;
  // Metrics depend on the selection, not on the individual vertex.
  const fm = fullMetrics(), hm = halfMetrics(), am = armMetrics();
  const transform = props.model==='vollkassette'
    ? (mesh        ,x       ,y       ,z       )=>fullTransform(mesh,x,y,z,fm)
    : props.model==='halbkassette'
      ? (mesh        ,x       ,y       ,z       )=>halfTransform(mesh,x,y,z,hm)
      : (mesh        ,x       ,y       ,z       )=>armTransform(mesh,x,y,z,am);
  let fminX=Infinity,fmaxX=-Infinity,fminZ=Infinity,fmaxZ=-Infinity;const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  for(const mesh of meshes){const src=mesh.originalPos,out=mesh.workingPos,nsrc=mesh.originalNormal,nout=mesh.workingNormal;for(let i=0;i<src.length;i+=3){const q=transform(mesh,src[i],src[i+1],src[i+2]);out[i]=q[0];out[i+1]=q[1];out[i+2]=q[2];for(let k=0;k<3;k+=1){min[k]=Math.min(min[k],q[k]);max[k]=Math.max(max[k],q[k]);}let nx=nsrc[i],ny=nsrc[i+1],nz=nsrc[i+2];if(q[3]){const rn=rotateNormalXZ(nx,nz,q[3]);nx=rn[0];nz=rn[1];}nout[i]=nx;nout[i+1]=ny;nout[i+2]=nz;if(mesh.role==='fabric'){fminX=Math.min(fminX,q[0]);fmaxX=Math.max(fmaxX,q[0]);fminZ=Math.min(fminZ,q[2]);fmaxZ=Math.max(fmaxZ,q[2]);}}
    gl.bindBuffer(gl.ARRAY_BUFFER,mesh.posBuffer);gl.bufferSubData(gl.ARRAY_BUFFER,0,out);gl.bindBuffer(gl.ARRAY_BUFFER,mesh.normalBuffer);gl.bufferSubData(gl.ARRAY_BUFFER,0,nout);
  }
  if(Number.isFinite(fminX))fabricBounds={minX:fminX,maxX:fmaxX,minZ:fminZ,maxZ:fmaxZ};if(Number.isFinite(min[0]))modelBounds={min,max,center:min.map((v,k)=>(v+max[k])/2),span:min.map((v,k)=>max[k]-v)};requestDraw();
}

async function loadFabricTexture() {
  const requestId = ++textureRequest;
  textureAbort?.abort();
  textureAbort = null;
  disposeTexture();
  textureError = '';
  textureFailure = null;
  syncMessage();
  requestDraw();
  if (!gl || !props.fabricTexture || disposed) return;
  const controller = new AbortController();
  textureAbort = controller;
  let objectUrl                = null;
  const requestUrl = props.fabricTexture;
  let responseStatus                = null;
  try {
    const response = await fetch(requestUrl, { signal: controller.signal, credentials: 'same-origin' });
    responseStatus = response.status;
    if (!response.ok) throw new Error(`Die Tuchtextur konnte nicht geladen werden (HTTP ${response.status}).`);
    const blob = await response.blob();
    if (disposed || requestId !== textureRequest || controller.signal.aborted) return;
    objectUrl = URL.createObjectURL(blob);
    const image = new Image();
    image.decoding = 'async';
    image.src = objectUrl;
    await image.decode();
    if (!gl || disposed || requestId !== textureRequest || controller.signal.aborted) return;
  disposeTexture();
  const texture = gl.createTexture();
  if (!texture) throw new Error('Stofftextur konnte nicht erstellt werden.');
  activeTexture = texture;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  const anisotropic = gl.getExtension('EXT_texture_filter_anisotropic');
  if (anisotropic) {
    const max = Math.min(8, gl.getParameter(anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT) || 1);
    gl.texParameterf(gl.TEXTURE_2D, anisotropic.TEXTURE_MAX_ANISOTROPY_EXT, max);
  }

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.SRGB8_ALPHA8, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
    textureError = '';
    syncMessage();
    requestDraw();
  } catch (cause) {
    if (disposed || requestId !== textureRequest || controller.signal.aborted) return;
    disposeTexture();
    textureError = responseStatus === 404
      ? 'Die gewählte Tuchtextur wurde nicht gefunden (HTTP 404).'
      : responseStatus !== null && responseStatus >= 400
        ? `Die gewählte Tuchtextur konnte nicht geladen werden (HTTP ${responseStatus}).`
        : 'Die gewählte Tuchtextur konnte nicht geladen werden. Bitte „Neu laden“ wählen.';
    textureFailure = { url: requestUrl, status: responseStatus };
    console.warn('[EclipseAwningConfigurator] Tuchtextur konnte nicht geladen werden.', {
      asset: 'texture', url: requestUrl, status: responseStatus,
      message: cause instanceof Error ? cause.message : String(cause),
    });
    syncMessage();
    requestDraw();
  } finally {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    if (textureAbort === controller) textureAbort = null;
  }
}

function requestDraw() {
  if (disposed || !gl) return;
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(draw);
}

function draw() {
  if (!gl || !program || !canvas || !stage || disposed || meshes.length === 0) return;

  const rect = stage.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2.25);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  const aspect = rect.width / Math.max(1, rect.height);
  const target = modelBounds.center;
  const refWidth=props.model==='halbkassette'?2.95:props.model==='gelenkarm'?3.0:3.845,refDepth=props.model==='halbkassette'?2.50:props.model==='gelenkarm'?2.50:3.132;
  const fit = clamp(Math.max((modelBounds.span[0] || refWidth) / refWidth, (modelBounds.span[2] || refDepth) / refDepth), .68, 1.58);
  const radius = Math.max(5.7, 7.7 / aspect) * zoom * fit;
  const eye = [
    target[0] + radius * Math.sin(yaw) * Math.cos(pitch),
    target[1] + radius * Math.sin(pitch),
    target[2] + radius * Math.cos(yaw) * Math.cos(pitch),
  ];

  const mvp = multiply(
    perspective(42 * Math.PI / 180, aspect, 0.05, 100),
    lookAt(eye, target),
  );

  gl.viewport(0, 0, width, height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(program);

  gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uMvp'), false, mvp);
  gl.uniform3fv(gl.getUniformLocation(program, 'uEye'), eye);
  gl.uniform2f(gl.getUniformLocation(program, 'uFabricMin'), fabricBounds.minX, fabricBounds.minZ);
  gl.uniform2f(
    gl.getUniformLocation(program, 'uFabricInvSize'),
    1000 / FABRIC_REFERENCE_WIDTH_MM,
    1000 / FABRIC_REFERENCE_DEPTH_MM,
  );
  gl.uniform1i(gl.getUniformLocation(program, 'uTex'), 0);

  for (const mesh of meshes) {
    gl.bindVertexArray(mesh.vao);
    if (mesh.renderRole === 'fabric') {
      gl.uniform3fv(gl.getUniformLocation(program, 'uColor'), [1, 1, 1]);
      gl.uniform1f(gl.getUniformLocation(program, 'uFabric'), 1);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, activeTexture);
      gl.uniform1f(gl.getUniformLocation(program, 'uHasTexture'), activeTexture ? 1 : 0);
    } else {
      const frameColor=mesh.renderRole==='white'?'#F6F6F3':props.housingColor;
      gl.uniform3fv(gl.getUniformLocation(program, 'uColor'), hexRgb(frameColor));
      gl.uniform1f(gl.getUniformLocation(program, 'uFabric'), 0);
      gl.uniform1f(gl.getUniformLocation(program, 'uHasTexture'), 0);
    }
    gl.drawElements(gl.TRIANGLES, mesh.count, mesh.type, 0);
  }
  gl.bindVertexArray(null);
}

async function loadModel() {
  const requestId = ++modelRequest;
  modelAbort?.abort();
  textureAbort?.abort();
  textureRequest += 1;
  disposeGpu();
  disposeTexture();
  if (!gl || disposed) return;
  const controller = new AbortController();
  modelAbort = controller;
  modelError = '';
  textureError = '';
  modelFailure = null;
  textureFailure = null;
  loading = true;
  setCanvasLabel();
  syncMessage();
  const requestUrl = modelUrl();
  const requestedModel = props.model;
  let responseStatus                = null;
  try {
    const response = await fetch(requestUrl, { signal: controller.signal, credentials: 'same-origin' });
    responseStatus = response.status;
    if (!response.ok) throw new Error(response.status === 404
      ? 'Das 3D-Modell wurde nicht gefunden (HTTP 404).'
      : `Das 3D-Modell konnte nicht geladen werden (HTTP ${response.status}).`);
    const buffer = await response.arrayBuffer();
    if (disposed || requestId !== modelRequest || controller.signal.aborted || !gl) return;
    uploadGlb(buffer);
    if (meshes.length === 0) throw new Error('Das 3D-Modell enthält keine darstellbaren Markisenteile.');
    resetView();
    await loadFabricTexture();
    if (disposed || requestId !== modelRequest || controller.signal.aborted) return;
    requestDraw();
  } catch (cause) {
    if (disposed || requestId !== modelRequest || controller.signal.aborted) return;
    disposeGpu();
    modelError = cause instanceof Error ? cause.message : 'Die 3D-Vorschau konnte nicht geladen werden.';
    modelFailure = { url: requestUrl, status: responseStatus };
    console.warn('[EclipseAwningConfigurator] 3D-Modell konnte nicht geladen werden.', {
      asset: 'model', model: requestedModel, url: requestUrl, status: responseStatus, message: modelError,
    });
  } finally {
    if (!disposed && requestId === modelRequest) {
      loading = false;
      syncMessage();
    }
    if (modelAbort === controller) modelAbort = null;
  }
}

function setZoom(value        ) {
  if (disposed) return;
  zoom = clamp(value, .48, 2.4);
  requestDraw();
}
function resetView() {
  if (disposed) return;
  yaw = .43;
  pitch = .52;
  zoom = 1;
  requestDraw();
}
function onPointerDown(event              ) {
  if (disposed || activePointer !== null) return;
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  if (event.pointerType !== 'mouse' && !interactionEnabled) return;
  dragging = true;
  activePointer = event.pointerId;
  lastX = event.clientX;
  lastY = event.clientY;
  canvas.style.cursor = 'grabbing';
  canvas.setPointerCapture(event.pointerId);
}
function onPointerMove(event              ) {
  if (!dragging || activePointer !== event.pointerId || disposed) return;
  yaw -= (event.clientX - lastX) * .008;
  pitch = clamp(pitch + (event.clientY - lastY) * .007, -1.45, 1.45);
  lastX = event.clientX;
  lastY = event.clientY;
  requestDraw();
}
function onPointerUp(event               ) {
  if (event && activePointer !== event.pointerId) return;
  const releasedPointer = activePointer;
  dragging = false;
  activePointer = null;
  if (releasedPointer !== null && canvas.hasPointerCapture(releasedPointer)) canvas.releasePointerCapture(releasedPointer);
  canvas.style.cursor = 'grab';
}
function onWheel(event            ) {
  if (disposed || (!interactionEnabled && !event.ctrlKey && !event.metaKey)) return;
  event.preventDefault();
  setZoom(zoom * Math.exp(clamp(event.deltaY, -120, 120) * .0016));
}
function onKeyDown(event               ) {
  if (event.key === 'Escape') { setInteraction(false); return; }
  if (event.key === '+' || event.key === '=') setZoom(zoom / 1.15);
  else if (event.key === '-') setZoom(zoom * 1.15);
  else if (event.key === '0' || event.key === 'Home') resetView();
  else if (event.key === 'ArrowLeft') { yaw -= .12; requestDraw(); }
  else if (event.key === 'ArrowRight') { yaw += .12; requestDraw(); }
  else if (event.key === 'ArrowUp') { pitch = clamp(pitch + .12, -1.45, 1.45); requestDraw(); }
  else if (event.key === 'ArrowDown') { pitch = clamp(pitch - .12, -1.45, 1.45); requestDraw(); }
  else return;
  event.preventDefault();
}

function update(next                            ) {
  if (disposed) return;
  const previous = { ...props };
  Object.assign(props, next);
  if (props.model !== previous.model) { void loadModel(); return; }
  if (props.widthMm !== previous.widthMm || props.projectionMm !== previous.projectionMm) applyParametricGeometry();
  if (props.fabricTexture !== previous.fabricTexture) void loadFabricTexture();
  if (props.housingColor !== previous.housingColor) requestDraw();
}
function destroy() {
  if (disposed) return;
  disposed = true;
  modelRequest += 1;
  textureRequest += 1;
  modelAbort?.abort();
  textureAbort?.abort();
  onPointerUp();
  resizeObserver?.disconnect();
  listeners.splice(0).forEach(remove => remove());
  cancelAnimationFrame(raf);
  disposeGpu();
  disposeTexture();
  if (gl && program) gl.deleteProgram(program);
  program = null;
  gl = null;
  stage.remove();
}

listen(canvas, 'pointerdown', onPointerDown                 );
listen(canvas, 'pointermove', onPointerMove                 );
listen(canvas, 'pointerup', onPointerUp                 );
listen(canvas, 'pointercancel', onPointerUp                 );
listen(canvas, 'lostpointercapture', onPointerUp                 );
listen(canvas, 'wheel', onWheel                 , { passive: false });
listen(canvas, 'keydown', onKeyDown                 );
listen(stage, 'keydown', ((event               ) => {
  if (event.key === 'Escape') setInteraction(false);
})                 );
listen(canvas, 'webglcontextlost', ((event       ) => {
  event.preventDefault();
  modelRequest += 1;
  textureRequest += 1;
  modelAbort?.abort();
  textureAbort?.abort();
  cancelAnimationFrame(raf);
  gl = null;
  program = null;
  meshes = [];
  buffers.length = 0;
  vaos.length = 0;
  activeTexture = null;
  loading = false;
  modelFailure = null;
  textureFailure = null;
  modelError = 'Die 3D-Ansicht wurde vom Browser pausiert. Sie wird nach Wiederherstellung neu geladen.';
  syncMessage();
})                 );
listen(canvas, 'webglcontextrestored', (() => {
  if (disposed) return;
  try { initWebGl(); void loadModel(); }
  catch (cause) { modelError = cause instanceof Error ? cause.message : 'Die 3D-Ansicht konnte nicht wiederhergestellt werden.'; syncMessage(); }
})                 );

setInteraction(false);
setCanvasLabel();
try {
  initWebGl();
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(requestDraw);
    resizeObserver.observe(stage);
  } else {
    listen(window, 'resize', requestDraw);
  }
  void loadModel();
} catch (cause) {
  modelError = cause instanceof Error ? cause.message : 'Die 3D-Vorschau ist in diesem Browser nicht verfügbar.';
  syncMessage();
}
return { update, resetView, destroy };
}

return {createAwningViewer};
})();
const Commerce = (() => {
/**
 * Native plentyShop LTS purchase adapter. No custom cart endpoint, no client prices.
 * Reference: official Ceres/IO stable 5.0.86, checked 2026-10-28.
 */
                                            

                                  
                                                        
                                                                      
 
                                 
                                            
                      
 

function extractVariation(payload     , expected                                         )      {
  const result = payload && (payload.data || payload);
  const documents = result && result.documents;
  if (!Array.isArray(documents)) throw new Error('Keine Produktdaten erhalten.');
  const document = documents.find((entry     ) =>
    Number(entry?.data?.item?.id) === expected.itemId &&
    Number(entry?.data?.variation?.id) === expected.variationId);
  if (!document) throw new Error('Die gelieferte Variante stimmt nicht mit der Auswahl überein.');
  // Keep all official price, property, availability and bundle metadata intact.
  const data = document.data;
  if (!data.filter || typeof data.filter.isSalable !== 'boolean') {
    throw new Error('Die Bestellbarkeit der Variante konnte nicht geprüft werden.');
  }
  if (!Array.isArray(data.properties)) {
    if (data.hasOrderProperties || data.hasRequiredOrderProperty) {
      throw new Error('Die Bestellmerkmale der Variante fehlen.');
    }
    data.properties = [];
  }
  if (data.hasRequiredOrderProperty && data.properties.length === 0) {
    throw new Error('Die erforderlichen Bestellmerkmale der Variante fehlen.');
  }
  return document;
}

function hasUsablePrice(product     )          {
  const numericPrice = (value         ) =>
    (typeof value === 'number' || (typeof value === 'string' && /^\d+(?:\.\d+)?$/.test(value))) &&
    Number.isFinite(Number(value)) && Number(value) >= 0;
  const price = product?.prices?.default;
  if (!price || !numericPrice(price.unitPrice?.value) || !numericPrice(price.price?.value) ||
    typeof price.currency !== 'string' || !price.currency.trim()) return false;
  for (const kind of ['rrp', 'specialOffer']) {
    const extra = product.prices[kind];
    if (extra && (!numericPrice(extra.unitPrice?.value) || !numericPrice(extra.price?.value))) return false;
  }
  const graduated = product.prices.graduatedPrices;
  if (graduated != null && (!Array.isArray(graduated) || graduated.some((entry     ) =>
    !numericPrice(entry?.unitPrice?.value) || !numericPrice(entry?.price?.value) ||
    !numericPrice(entry?.minimumOrderQuantity)))) return false;
  return true;
}

/** IO bundleSetting=0 replaces a bundle with its components in the real basket. */
function bundlePurchaseIssue(product     , App     )                {
  if (product?.variation?.bundleType === 'bundle_item') return 'catalog-points-to-bundle-component';
  if (product?.variation?.bundleType !== 'bundle') return null;
  const setting = App?.bundleSetting;
  if (setting === 1 || setting === 2 || setting === '1' || setting === '2') return null;
  return setting === 0 || setting === '0' ? 'native-basket-would-split-bundle' : 'unverified-native-bundle-setting';
}

async function installNativeVariation(store     , document     )                {
  const itemId = Number(document.data.item.id);
  if (!store.state.items[itemId]) {
    await store.dispatch('registerItem', document);
  } else {
    store.commit(`${itemId}/setVariation`, { documents: [document] });
  }
  store.commit(`${itemId}/variationSelect/setIsVariationSelected`, true);
  store.commit(`${itemId}/setVariationMarkInvalidProps`, false);
}

let purchaseScope = 0;
const isolatedRuntimeMessage = 'Der Kaufbereich für diese Artikelseite ist noch nicht verfügbar. Bitte laden Sie ihn erneut oder öffnen Sie die Produktseite der Auswahl.';

/**
 * Reuse the installed Ceres calculations and property validation, with fresh state.
 * BaseItemModule.registerItem closes over Ceres' GLOBAL store; copying its actions
 * would therefore overwrite the PDP. loadVariation also changes the page URL.
 * Only the two native basket/component actions cross this private store boundary.
 */
function createIsolatedPurchaseStore(rootStore     , Vuex     , itemId        )      {
  const base = rootStore?._modules?.root?._children?.items;
  const nativeItem = base?._children?.[rootStore?.state?.items?.mainItemId];
  const nativeSelect = nativeItem?._children?.variationSelect;
  const rawBase = base?._rawModule;
  const rawItem = nativeItem?._rawModule;
  const rawSelect = nativeSelect?._rawModule;
  const hasFunctions = (object     , names          ) => names.every(name => typeof object?.[name] === 'function');
  if (typeof Vuex?.Store !== 'function' || rootStore?.constructor !== Vuex.Store ||
    !rootStore.state.basket || !/^eam_\d+$/.test(itemId) ||
    ![rawBase, rawItem, rawSelect].every(raw => typeof raw?.state === 'function') ||
    rawBase.namespaced || !rawItem.namespaced || !rawSelect.namespaced ||
    !hasFunctions(rawBase.mutations, ['setMainItemId', 'setIsAddToBasketLoading']) ||
    !hasFunctions(rawBase.getters, ['currentItemVariation', 'itemSetTotalPrice', 'itemSetAllVariationSelected']) ||
    !hasFunctions(rawItem.mutations, ['setVariation', 'setVariationOrderQuantity', 'setVariationOrderProperty', 'setVariationPropertySurcharges', 'setVariationMarkInvalidProps']) ||
    !hasFunctions(rawItem.getters, ['currentItemVariation', 'variationTotalPrice', 'variationBasePrice', 'variationGraduatedPrice', 'variationGroupedProperties', 'variationMissingProperties']) ||
    !hasFunctions(rawSelect.mutations, ['setIsVariationSelected']) ||
    !rootStore._actions?.addBasketItem || !rootStore._actions?.loadComponent || !rootStore._mutations?.setIsBasketLoading) {
    throw new Error(isolatedRuntimeMessage);
  }
  const freshModule = (raw     ) => ({
    namespaced: !!raw.namespaced,
    state: JSON.parse(JSON.stringify(raw.state())),
    getters: { ...raw.getters },
    mutations: { ...raw.mutations },
    // Deliberately do not copy actions or registered children from the page.
  });
  const localStore = new Vuex.Store({
    devtools: false,
    state: { basket: rootStore.state.basket },
    actions: {
      addBasketItem(_context     , payload     ) { return rootStore.dispatch('addBasketItem', payload); },
      loadComponent(_context     , payload     ) { return rootStore.dispatch('loadComponent', payload); },
    },
    mutations: {
      setIsBasketLoading(_state     , value         ) { rootStore.commit('setIsBasketLoading', value); },
    },
    modules: {
      items: {
        ...freshModule(rawBase),
        modules: {
          [itemId]: { ...freshModule(rawItem), modules: { variationSelect: freshModule(rawSelect) } },
        },
      },
    },
  });
  localStore.commit('setMainItemId', itemId);
  return localStore;
}

function createCommerceController(host             , options                 )                 {
  let sequence = 0;
  let disposed = false;
  let controller                         = null;
  let purchaseVm      = null;
  let purchaseRenderError = false;
  let mountedItemId                  = 0;
  let isolatedStore      = null;
  let selection                 = null;
  let debounceTimer = 0;
  let unsubscribeStore                      = null;
  let currentDocument      = null;
  let contextKey = '';
  const initializedProperties = new WeakMap             ();

  const message = document.createElement('div');
  message.className = 'eam-commerce-message';
  message.setAttribute('role', 'status');
  message.setAttribute('aria-live', 'polite');
  const messageText = document.createElement('p');
  const retry = document.createElement('button');
  retry.type = 'button';
  retry.className = 'eam-retry';
  retry.textContent = 'Erneut laden';
  retry.hidden = true;
  const fallback = document.createElement('a');
  fallback.className = 'eam-product-link';
  fallback.textContent = 'Zur Produktseite';
  fallback.hidden = true;
  message.append(messageText, retry, fallback);
  const mount = document.createElement('div');
  mount.className = 'eam-native-mount';
  mount.hidden = true;
  host.replaceChildren(message, mount);

  function runtime() {
    const win = window       ;
    if (!win.Vue || !win.ceresStore || !win.App || !win.Vue.options?.components?.['single-add-to-basket']) {
      throw new Error('Der Kaufbereich ist momentan nicht verfügbar. Bitte laden Sie die Seite neu.');
    }
    return { Vue: win.Vue, Vuex: win.Vuex, store: win.ceresStore, App: win.App };
  }
  function productUrl(product     )                {
    try {
      const filter = (window       ).Vue?.options?.filters?.itemURL;
      const fallbackPath = Number.isSafeInteger(Number(product?.item?.id)) && Number(product.item.id) > 0 &&
        Number.isSafeInteger(Number(product?.variation?.id)) && Number(product.variation.id) > 0
        ? '/' + product.item.id + '_' + product.variation.id : null;
      const result = typeof filter === 'function' ? filter(product) : fallbackPath;
      if (typeof result !== 'string' || !result.trim()) return fallbackPath;
      const url = new URL(result, window.location.href);
      return url.origin === window.location.origin && /^https?:$/.test(url.protocol) ? url.href : null;
    } catch { return null; }
  }
  function showMessage(text        , canRetry         , url                = null) {
    mount.hidden = true;
    mount.setAttribute('inert', '');
    message.hidden = false;
    messageText.textContent = text;
    retry.hidden = !canRetry;
    fallback.hidden = !url;
    if (url) fallback.href = url;
    else fallback.removeAttribute('href');
  }
  function disposePurchase() {
    if (purchaseVm) {
      purchaseVm.$destroy();
      purchaseVm = null;
    }
    mountedItemId = 0;
    purchaseRenderError = false;
    mount.replaceChildren();
  }
  function disposeIsolatedStore() {
    // Vuex 3 has two private Vue instances; neither belongs to the page store.
    isolatedStore?._vm?.$destroy();
    isolatedStore?._watcherVM?.$destroy();
    isolatedStore = null;
  }
  function scopePropertyInputs(component     ) {
    if (!isolatedStore || !component.$el?.querySelectorAll) return;
    const prefix = String(mountedItemId) + '_';
    for (const field of component.$el.querySelectorAll('input, select, textarea')) {
      const oldId = field.getAttribute('id');
      if (oldId && !oldId.startsWith(prefix)) {
        // The native text/select IDs are not unique when the PDP also has them.
        const scopedId = prefix + component._uid + '_' + oldId;
        field.setAttribute('id', scopedId);
        for (const label of component.$el.querySelectorAll('label[for]')) {
          if (label.getAttribute('for') === oldId) label.setAttribute('for', scopedId);
        }
      }
      const name = field.getAttribute('name');
      if (name && !name.startsWith(prefix)) field.setAttribute('name', prefix + name);
    }
  }
  function resetLocalPropertyInputs() {
    if (!isolatedStore || disposed || !purchaseVm || !currentDocument ||
      Number(currentDocument.data.variation.id) !== selection?.variationId) return;
    const visit = (component     ) => {
      if (component.$options?.name === 'order-property-list-item') {
        scopePropertyInputs(component);
        // Run once per document/child, including a late native component mount.
        if (initializedProperties.get(component) !== currentDocument) {
          initializedProperties.set(component, currentDocument);
          if (component.property?.valueType === 'selection') {
            component.selectionValue = component.property.value || null;
          } else if (component.property?.valueType === 'file') {
            if (component.$refs?.fileInput) component.clearSelectedFile();
          } else {
            component.inputValue = component.property?.value || '';
          }
        }
      }
      for (const child of component.$children || []) visit(child);
    };
    visit(purchaseVm);
  }
  function afterPropertiesMounted() {
    // The wrapper is assigned only after synchronous child mounts have finished.
    const Vue = (window       ).Vue;
    if (Vue) void Vue.nextTick(() => {
      if (isolatedStore) resetLocalPropertyInputs();
      else emitVariationChanged();
    });
  }
  function emitVariationChanged() {
    if (isolatedStore) { resetLocalPropertyInputs(); return; }
    if (disposed || !currentDocument || Number(currentDocument.data.variation.id) !== selection?.variationId) return;
    document.dispatchEvent(new CustomEvent('onVariationChanged', {
      detail: { itemId: Number(currentDocument.data.item.id), documents: [currentDocument], attributes: currentDocument.data.attributes || [] },
    }));
  }
  function ensureSubscription(store     ) {
    if (unsubscribeStore) return;
    const key = () => JSON.stringify([
      store.state.localization?.shippingCountryId,
      store.state.user?.userData?.id ?? store.state.user?.userData?.contactId ?? null,
      store.state.user?.userData?.classId ?? null,
      store.state.basket?.showNetPrices,
      (window       ).App?.activeCurrency,
    ]);
    contextKey = key();
    unsubscribeStore = store.subscribe((mutation     ) => {
      if (!['setShippingCountryId', 'setUserData', 'setShowNetPrices'].includes(mutation.type)) return;
      const next = key();
      if (next === contextKey) return;
      contextKey = next;
      retrySelection();
    });
  }
  function mountPurchase(itemId                 , Vue     , store     , App     ) {
    if (purchaseVm && mountedItemId === itemId && !purchaseRenderError) return;
    disposePurchase();
    const point = document.createElement('div');
    mount.appendChild(point);
    purchaseVm = new Vue({
      name: 'EclipseNativePurchase',
      store,
      provide: () => ({ itemId }),
      computed: {
        product() { return this.$store.getters[`${itemId}/currentItemVariation`]; },
        groupedProperties() { return this.$store.getters[`${itemId}/variationGroupedProperties`] || []; },
        netPrices() { return this.$store.state.basket.showNetPrices; },
      },
      methods: {
        translate(key        , fallbackText        ) {
          try {
            const value = this.$translate('Ceres::Template.' + key);
            return value && value !== 'Ceres::Template.' + key ? value : fallbackText;
          } catch { return fallbackText; }
        },
      },
      updated() { resetLocalPropertyInputs(); },
      errorCaptured(error     ) {
        if (disposed || this._isDestroyed) return false;
        purchaseRenderError = true;
        showMessage('Der Kaufbereich konnte nicht vollständig geladen werden. Bitte versuchen Sie es erneut.', true,
          productUrl(currentDocument?.data));
        options.onStatus('Kaufbereich momentan nicht verfügbar', false);
        console.warn('[EclipseAwningConfigurator] Native Kaufkomponente:', error?.message || String(error));
        return false;
      },
      render(h     ) {
        const item = this.product;
        if (!item || !hasUsablePrice(item)) return h('div');
        const blocks        = [];
        blocks.push(h('item-price', { props: { showCrossPrice: true } }));
        blocks.push(h('div', { class: 'eam-tax' }, [
          this.translate('singleItemFootnote1', '*') + ' ',
          this.netPrices
            ? this.translate('singleItemExclVAT', 'zzgl. MwSt.')
            : this.translate('singleItemInclVAT', 'inkl. MwSt.'),
          ' ' + this.translate('singleItemExclusive', 'zzgl.') + ' ',
          Number(App.config?.global?.shippingCostsCategoryId) > 0
            ? h('a', { attrs: { href: '#shippingscosts', 'data-toggle': 'modal' } }, this.translate('singleItemShippingCosts', 'Versandkosten'))
            : h('span', this.translate('singleItemShippingCosts', 'Versandkosten')),
        ]));
        if (item.variation.bundleType === 'bundle') blocks.push(h('single-item-bundle'));
        if (item.filter.isSalable && this.groupedProperties.length) blocks.push(h('order-property-list', {
          on: { 'hook:mounted': afterPropertiesMounted, 'hook:updated': resetLocalPropertyInputs },
        }));
        if (Array.isArray(item.prices.graduatedPrices)) blocks.push(h('graduated-prices'));
        blocks.push(h('div', { class: 'eam-native-availability' }, [h('item-availability')]));
        blocks.push(h('div', { class: 'eam-native-buy' }, [h('single-add-to-basket', { props: { buttonSize: 'btn-lg' } })]));
        if (!item.filter.isSalable) blocks.push(h('p', { class: 'eam-unavailable' }, 'Diese Variante ist derzeit nicht bestellbar.'));
        return h('div', { class: 'eam-native-purchase' }, blocks);
      },
    }).$mount(point);
    mountedItemId = itemId;
  }

  async function load(current         , requestId        ) {
    let responseUrl                = null;
    try {
      const { Vue, Vuex, store, App } = runtime();
      ensureSubscription(store);
      if (disposed || requestId !== sequence) return;
      controller = new AbortController();
      const activeController = controller;
      const timeout = window.setTimeout(() => activeController.abort(), 20000);
      let payload     ;
      try {
        const slash = App.urlTrailingSlash ? '/' : '';
        const url = new URL(`/rest/io/variations/${current.variationId}${slash}`, window.location.origin);
        url.searchParams.set('template', 'Ceres::Item.SingleItem');
        if (App.templateType) url.searchParams.set('templateType', App.templateType);
        const headers                         = { Accept: 'application/json', 'Accept-Language': App.language || 'de' };
        const token = (document.getElementById('csrf-token')                           )?.value;
        if (token) headers['X-CSRF-TOKEN'] = token;
        const response = await fetch(url.href, {
          method: 'GET', credentials: 'same-origin', cache: 'no-store',
          headers, signal: activeController.signal,
        });
        if (!response.ok) throw new Error('Produktabfrage fehlgeschlagen (' + response.status + ').');
        payload = await response.json();
      } finally {
        window.clearTimeout(timeout);
      }
      if (disposed || requestId !== sequence) return;
      const itemDocument = extractVariation(payload, current);
      const product = itemDocument.data;
      responseUrl = productUrl(product);
      options.onProduct(product, responseUrl);
      // A selected item set still needs Ceres' full native set-component UI.
      // Standard products on a set PDP are safe in their independent context.
      if (product.item.itemType === 'set' || (!App.isItemView && store.state.items?.isItemSet)) {
        showMessage('Für diese Auswahl können Sie die Bestellung auf der Produktseite abschließen.', false, responseUrl);
        options.onStatus('Bitte auf der Produktseite fortfahren', false);
        return;
      }
      const bundleIssue = bundlePurchaseIssue(product, App);
      if (bundleIssue) {
        showMessage('Diese Markise kann derzeit nicht als vollständiges Paket bestellt werden.', false, responseUrl);
        options.onStatus('Paketbestellung derzeit nicht verfügbar', false);
        console.warn('[EclipseAwningConfigurator] Paketbestellung nicht freigegeben.', {
          reason: bundleIssue, itemId: current.itemId, variationId: current.variationId,
          bundleType: product.variation.bundleType, bundleSetting: App.bundleSetting,
        });
        return;
      }
      if (!hasUsablePrice(product)) {
        showMessage('Für diese Variante ist derzeit kein Verkaufspreis verfügbar.', true, responseUrl);
        options.onStatus('Preis derzeit nicht verfügbar', false);
        return;
      }
      // Display-only optional metadata expected by the installed native component.
      if (!product.prices.default.lowestPrice) product.prices.default.lowestPrice = { value: null, formatted: '' };
      let purchaseStore = store;
      let purchaseItemId                  = current.itemId;
      if (App.isItemView) {
        purchaseItemId = 'eam_' + (++purchaseScope);
        // Prepare completely before replacing a previous working scope. A fresh
        // store also keeps late native file-upload callbacks on their old item.
        const nextStore = createIsolatedPurchaseStore(store, Vuex, purchaseItemId);
        const localDocument = JSON.parse(JSON.stringify(itemDocument));
        try {
          nextStore.commit(`${purchaseItemId}/setVariation`, { documents: [localDocument] });
          nextStore.commit(`${purchaseItemId}/variationSelect/setIsVariationSelected`, true);
          nextStore.commit(`${purchaseItemId}/setVariationMarkInvalidProps`, false);
        } catch (error) {
          nextStore._vm?.$destroy();
          nextStore._watcherVM?.$destroy();
          throw error;
        }
        disposePurchase();
        disposeIsolatedStore();
        isolatedStore = nextStore;
        purchaseStore = nextStore;
        currentDocument = localDocument;
      } else {
        currentDocument = itemDocument;
        await installNativeVariation(store, itemDocument);
      }
      if (disposed || requestId !== sequence) return;
      mountPurchase(purchaseItemId, Vue, purchaseStore, App);
      await Vue.nextTick();
      if (disposed || requestId !== sequence || purchaseRenderError) return;
      // PDP inputs reset locally, never by an event targeting the page's item.
      emitVariationChanged();
      message.hidden = true;
      mount.hidden = false;
      mount.removeAttribute('inert');
      const availability = product.variation.availability?.names?.name;
      options.onStatus(product.filter.isSalable
        ? (availability || 'Bestellbar')
        : (availability ? availability + ' · Derzeit nicht bestellbar' : 'Derzeit nicht bestellbar'), product.filter.isSalable);
    } catch (error     ) {
      if (disposed || requestId !== sequence) return;
      const unsupportedPdp = error?.message === isolatedRuntimeMessage;
      showMessage(unsupportedPdp ? isolatedRuntimeMessage : error?.name === 'AbortError'
        ? 'Die Produktabfrage hat zu lange gedauert. Bitte versuchen Sie es erneut.'
        : 'Preis und Verfügbarkeit konnten momentan nicht geladen werden. Bitte versuchen Sie es erneut.', true, responseUrl);
      options.onStatus(unsupportedPdp ? 'Kaufbereich der Artikelseite noch nicht verfügbar' : 'Verfügbarkeit konnte nicht geladen werden', false);
      options.onProduct(null, null);
      console.warn('[EclipseAwningConfigurator] Produkt konnte nicht geladen werden.', {
        itemId: current.itemId, variationId: current.variationId, message: error?.message || String(error),
      });
    }
  }

  function select(variant                ) {
    sequence += 1;
    selection = variant;
    currentDocument = null;
    if (controller) controller.abort();
    window.clearTimeout(debounceTimer);
    options.onProduct(null, null);
    if (!variant) {
      showMessage('Diese Kombination ist nicht verfügbar.', false);
      options.onStatus('Diese Kombination ist nicht verfügbar', false);
      return;
    }
    showMessage('Preis und Verfügbarkeit werden geladen …', false);
    options.onStatus('Verfügbarkeit wird geprüft …', false);
    const requestId = sequence;
    // Prevent unnecessary requests while changing several dependent choices.
    debounceTimer = window.setTimeout(() => { void load(variant, requestId); }, 100);
  }
  function retrySelection() { if (selection) select(selection); }
  retry.addEventListener('click', retrySelection);
  try {
    const { store } = runtime();
    ensureSubscription(store);
  } catch { /* The first selection displays the useful error message. */ }
  return {
    select,
    destroy() {
      disposed = true;
      sequence += 1;
      controller?.abort();
      window.clearTimeout(debounceTimer);
      unsubscribeStore?.();
      retry.removeEventListener('click', retrySelection);
      disposePurchase();
      disposeIsolatedStore();
      host.replaceChildren();
    },
  };
}

return {createCommerceController, extractVariation, hasUsablePrice, installNativeVariation};
})();
const Context = (() => {
const { families, resolveSelection } = Catalog;
                                              

/** Prefer the currently loaded script over URLs baked into saved ShopBuilder HTML. */
function resolveResourceBase(scriptSrc               , scriptBase               , legacyBase               , pageUrl        )         {
  const safeUrl = (value               ) => {
    if (!value) return null;
    try {
      const url = new URL(value, pageUrl);
      return ['http:', 'https:'].includes(url.protocol) ? url : null;
    } catch { return null; }
  };
  const script = safeUrl(scriptSrc);
  if (script && /\/js\/awning-configurator\.js$/.test(script.pathname)) {
    return new URL('../', script).href.replace(/\/+$/, '');
  }
  const explicit = safeUrl(scriptBase);
  if (explicit) {
    explicit.search = '';
    explicit.hash = '';
    return explicit.href.replace(/\/+$/, '');
  }
  const legacy = safeUrl(legacyBase);
  if (legacy) {
    legacy.search = '';
    legacy.hash = '';
    return legacy.href.replace(/\/+$/, '').replace(/\/assets$/, '');
  }
  throw new Error('Der aktuelle Pfad der Konfigurator-Dateien konnte nicht ermittelt werden.');
}

/** Exact catalog lookup. Product and variation IDs must both match the current PDP. */
function selectionForPageVariation(itemId        , variationId        )                   {
  if (!Number.isSafeInteger(itemId) || !Number.isSafeInteger(variationId) || itemId <= 0 || variationId <= 0) return null;
  for (const family of families) {
    const variant = family.variants.find((entry) => entry.itemId === itemId && entry.variationId === variationId);
    if (!variant) continue;
    const housing = family.housings.find((entry) => entry.name === variant.housing);
    if (!housing) return null;
    const result = resolveSelection({
      model: family.id,
      operation: variant.operation || family.defaultSelection.operation,
      sizeKey: `${variant.widthMm}x${variant.projectionMm}`,
      housing: housing.id,
      fabric: variant.fabricCode,
    });
    return result.variant?.variationId === variationId ? { ...result.selection } : null;
  }
  return null;
}

function readPageSelection(win     )                                                  {
  if (!win.App?.isItemView) return { ready: true, selection: null };
  const store = win.ceresStore;
  const mainItemId = Number(store?.state?.items?.mainItemId);
  let current      = null;
  try {
    current = store?.getters?.currentItemVariation || (mainItemId > 0 ? store?.getters?.[`${mainItemId}/currentItemVariation`] : null);
  } catch { return { ready: false, selection: null }; }
  const itemId = Number(current?.item?.id);
  const variationId = Number(current?.variation?.id);
  if (!Number.isSafeInteger(itemId) || itemId <= 0 || !Number.isSafeInteger(variationId) || variationId <= 0) {
    return { ready: false, selection: null };
  }
  if (mainItemId > 0 && mainItemId !== itemId) return { ready: false, selection: null };
  return { ready: true, selection: selectionForPageVariation(itemId, variationId) };
}

return {resolveResourceBase, selectionForPageVariation, readPageSelection};
})();
const Application = (() => {
const { families, defaults, resolveSelection } = Catalog;
                                                                          
const { createAwningViewer } = Viewer;
const { createCommerceController } = Commerce;
const { resolveResourceBase, readPageSelection } = Context;

let nextInstance = 0;

function node                                       (tag   , className = '', text = '')                           {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

/** Keep authored Bootstrap content, without executing embedded active content. */
function renderShopHtml(target             , html        ) {
  const template = document.createElement('template');
  template.innerHTML = typeof html === 'string' ? html : '';
  const tags = new Set('DIV SPAN P A IMG BR HR STRONG EM B I U S SMALL SUP SUB H1 H2 H3 H4 H5 H6 UL OL LI DL DT DD TABLE THEAD TBODY TFOOT TR TH TD CAPTION COLGROUP COL FIGURE FIGCAPTION BLOCKQUOTE PRE CODE DETAILS SUMMARY'.split(' '));
  const attrs = new Set(['class', 'style', 'title', 'alt', 'width', 'height', 'colspan', 'rowspan', 'scope', 'loading', 'decoding', 'href', 'src', 'target', 'rel', 'open', 'start', 'reversed']);
  for (const element of Array.from(template.content.querySelectorAll('*'))) {
    if (!tags.has(element.tagName)) { element.remove(); continue; }
    for (const attr of Array.from(element.attributes)) {
      const name = attr.name.toLowerCase();
      if (!attrs.has(name) && !/^aria-[a-z-]+$/.test(name)) { element.removeAttribute(attr.name); continue; }
      if (name === 'style' && /url\s*\(|expression\s*\(|@import|behavior\s*:|-moz-binding/i.test(attr.value)) element.removeAttribute(attr.name);
      if (name === 'href' || name === 'src') {
        try {
          const url = new URL(attr.value, location.href);
          const safe = ['http:', 'https:'].includes(url.protocol) || (name === 'href' && ['mailto:', 'tel:'].includes(url.protocol));
          if (!safe) element.removeAttribute(attr.name);
        } catch { element.removeAttribute(attr.name); }
      }
    }
    if (element.tagName === 'A' && element.getAttribute('target') === '_blank') element.setAttribute('rel', 'noopener noreferrer');
    if (element.tagName === 'IMG') { element.setAttribute('loading', 'lazy'); element.setAttribute('decoding', 'async'); }
  }
  target.replaceChildren(template.content);
}

function createConfigurator(root             , currentScriptSrc               , currentScriptBase               ) {
  const instanceId = 'eam-' + (++nextInstance);
  const resourceBase = resolveResourceBase(currentScriptSrc, currentScriptBase, root.dataset.assetBase || null, window.location.href);
  const textureBase = resourceBase + '/images/awning-configurator/textures';
  const defaultModel = families.find((family) => family.id === root.dataset.defaultModel)?.id || 'vollkassette';
  const allowModelSwitch = root.dataset.allowModelSwitch !== 'false';
  const showDescription = root.dataset.showDescription !== 'false';
  const showTechnical = root.dataset.showTechnical !== 'false';
  const remembered                             = {
    vollkassette: { ...defaults.vollkassette },
    halbkassette: { ...defaults.halbkassette },
    gelenkarm: { ...defaults.gelenkarm },
  };
  const pageSelection = root.dataset.useCurrentVariation !== 'false' ? readPageSelection(window).selection : null;
  let resolved = resolveSelection(pageSelection || remembered[defaultModel]);
  remembered[resolved.selection.model] = { ...resolved.selection };
  let openPanel                = null;
  let lastVariationId = 0;
  let disposed = false;

  root.classList.add('eam');
  root.setAttribute('aria-label', 'Markisen-Konfigurator');
  const scene = node('div', 'eam-scene');
  const viewerHost = node('div', 'eam-viewer-host');
  const controls = node('div', 'eam-controls');
  const status = node('div', 'eam-availability', 'Verfügbarkeit wird geprüft …');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  scene.append(viewerHost, controls, status);
  const commerceRow = node('div', 'eam-commerce');
  const summary = node('div', 'eam-summary');
  const eyebrow = node('span', 'eam-eyebrow', 'Ihre Konfiguration');
  const summaryName = node('strong', 'eam-summary-name');
  const summaryChoices = node('p', 'eam-summary-choices');
  const summaryNumber = node('p', 'eam-summary-number');
  const productLink = node('a', 'eam-product-link', 'Produktdetails öffnen');
  productLink.hidden = true;
  const notice = node('p', 'eam-selection-notice');
  notice.setAttribute('role', 'status');
  notice.setAttribute('aria-live', 'polite');
  notice.hidden = true;
  summary.append(eyebrow, summaryName, summaryChoices, summaryNumber, productLink, notice);
  const commerceHost = node('div', 'eam-commerce-host');
  commerceRow.append(summary, commerceHost);
  const details = node('div', 'eam-details');
  const descriptionBlock = node('details', 'eam-detail');
  const descriptionTitle = node('summary', '', 'Artikelbeschreibung');
  const descriptionContent = node('div', 'eam-shop-content');
  descriptionBlock.append(descriptionTitle, descriptionContent);
  const technicalBlock = node('details', 'eam-detail');
  const technicalTitle = node('summary', '', 'Technische Daten');
  const technicalContent = node('div', 'eam-shop-content');
  technicalBlock.append(technicalTitle, technicalContent);
  descriptionBlock.hidden = true;
  technicalBlock.hidden = true;
  details.hidden = true;
  details.append(descriptionBlock, technicalBlock);
  root.replaceChildren(scene, commerceRow, details);

  function textureUrl(state                   ) {
    return textureBase + '/' + state.selection.model + '/' + state.fabric.file;
  }
  const viewer = createAwningViewer(viewerHost, {
    model: resolved.selection.model, housingColor: resolved.housing.hex,
    fabricTexture: textureUrl(resolved), widthMm: resolved.size.widthMm,
    projectionMm: resolved.size.projectionMm,
  }, resourceBase);
  const commerce = createCommerceController(commerceHost, {
    onStatus(message, salable) {
      if (disposed) return;
      status.textContent = message;
      status.classList.toggle('eam-availability--ok', salable);
    },
    onProduct(product, url) {
      if (disposed) return;
      productLink.hidden = !url;
      if (url) productLink.href = url;
      else productLink.removeAttribute('href');
      const description = product?.texts?.description || '';
      const technical = product?.texts?.technicalData || '';
      descriptionBlock.hidden = !showDescription || !description.trim();
      technicalBlock.hidden = !showTechnical || !technical.trim();
      details.hidden = descriptionBlock.hidden && technicalBlock.hidden;
      renderShopHtml(descriptionContent, description);
      renderShopHtml(technicalContent, technical);
    },
  });

  function option(label        , value        , selected         , enabled = true, extraClass = '') {
    const button = node('button', 'eam-option ' + extraClass, label);
    button.type = 'button';
    button.dataset.value = value;
    button.disabled = !enabled;
    button.setAttribute('aria-pressed', String(selected));
    button.classList.toggle('is-selected', selected);
    if (!enabled) button.title = 'Für diese Auswahl nicht erhältlich';
    return button;
  }
  function buildPanel(key        , label        , currentLabel        , number        , optionsClass = '') {
    const panel = node('section', 'eam-panel eam-panel--' + key);
    panel.classList.toggle('is-open', openPanel === key);
    const trigger = node('button', 'eam-panel-trigger');
    trigger.type = 'button';
    trigger.dataset.panel = key;
    trigger.id = instanceId + '-' + key + '-trigger';
    trigger.setAttribute('aria-expanded', String(openPanel === key));
    trigger.setAttribute('aria-controls', instanceId + '-' + key);
    trigger.append(node('span', 'eam-panel-number', String(number).padStart(2, '0')));
    const copy = node('span', 'eam-panel-copy');
    copy.append(node('strong', '', label), node('small', '', currentLabel));
    const plus = node('span', 'eam-panel-plus', openPanel === key ? '−' : '+');
    plus.setAttribute('aria-hidden', 'true');
    trigger.append(copy, plus);
    const body = node('div', 'eam-panel-body ' + optionsClass);
    body.id = instanceId + '-' + key;
    body.hidden = openPanel !== key;
    body.setAttribute('role', 'group');
    body.setAttribute('aria-label', label);
    panel.append(trigger, body);
    controls.appendChild(panel);
    return body;
  }
  function renderControls(focusPanel                = null, focusValue                = null) {
    controls.replaceChildren();
    let position = 0;
    if (allowModelSwitch) {
      const body = buildPanel('model', 'Modell', resolved.family.name, ++position, 'eam-list');
      families.forEach((family) => body.append(option(family.name, family.id, family.id === resolved.selection.model)));
    }
    if (resolved.selection.model === 'halbkassette') {
      const body = buildPanel('operation', 'Bedienung', resolved.selection.operation, ++position, 'eam-size-grid');
      resolved.family.operations.forEach((operation) => body.append(option(operation, operation, operation === resolved.selection.operation)));
    }
    const sizes = buildPanel('size', 'Größe', resolved.size.label, ++position, 'eam-size-grid');
    resolved.family.sizes.forEach((size) => sizes.append(option(size.label, size.key, size.key === resolved.selection.sizeKey, resolved.availableSizeKeys.has(size.key))));
    const housings = buildPanel('housing', 'Gehäuse', resolved.housing.name, ++position, 'eam-swatch-grid eam-housing-grid');
    resolved.family.housings.forEach((housing) => {
      const button = option('', housing.id, housing.id === resolved.selection.housing, resolved.availableHousingIds.has(housing.id), 'eam-swatch');
      button.setAttribute('aria-label', housing.name);
      const swatch = node('span', 'eam-swatch-circle');
      swatch.style.backgroundColor = housing.hex;
      button.append(swatch, node('span', 'eam-swatch-name', housing.name));
      housings.append(button);
    });
    const fabrics = buildPanel('fabric', 'Tuch', resolved.fabric.name, ++position, 'eam-swatch-grid eam-fabric-grid');
    resolved.family.fabrics.forEach((fabric) => {
      const button = option('', fabric.code, fabric.code === resolved.selection.fabric, resolved.availableFabricCodes.has(fabric.code), 'eam-swatch');
      button.setAttribute('aria-label', fabric.name);
      const swatch = node('span', 'eam-swatch-circle');
      const img = node('img');
      img.src = textureBase + '/' + resolved.selection.model + '/' + fabric.file;
      img.alt = '';
      img.loading = 'lazy';
      img.width = 40;
      img.height = 40;
      swatch.appendChild(img);
      button.append(swatch, node('span', 'eam-swatch-name', fabric.name));
      fabrics.append(button);
    });
    scene.classList.toggle('eam-scene--operation', resolved.selection.model === 'halbkassette');
    scene.classList.toggle('eam-scene--fixed-model', !allowModelSwitch);
    if (focusPanel) {
      const target = focusValue
        ? Array.from(controls.querySelectorAll                   ('.eam-panel--' + focusPanel + ' [data-value]')).find((button) => button.dataset.value === focusValue && !button.disabled)
        : controls.querySelector                   ('[data-panel="' + focusPanel + '"]');
      target?.focus({ preventScroll: true });
    }
  }
  function update(next                    , focusKey               , value               ) {
    const previous = resolved;
    resolved = resolveSelection(next);
    remembered[resolved.selection.model] = { ...resolved.selection };
    renderControls(focusKey, value);
    summaryName.textContent = resolved.family.name;
    summaryChoices.textContent = [resolved.size.label, resolved.housing.name, resolved.fabric.name,
      resolved.selection.model === 'halbkassette' ? resolved.selection.operation : null].filter(Boolean).join(' · ');
    summaryNumber.textContent = resolved.variant ? 'Artikel-Nr. ' + resolved.variant.variationNumber : '';
    root.dataset.selectedVariation = String(resolved.variant?.variationId || '');
    root.dataset.selectedModel = resolved.selection.model;
    const adjusted           = [];
    if (resolved.changed && previous.selection.model === resolved.selection.model) {
      if (next.sizeKey !== resolved.selection.sizeKey) adjusted.push('Größe: ' + resolved.size.label);
      if (next.housing !== resolved.selection.housing) adjusted.push('Gehäuse: ' + resolved.housing.name);
      if (next.fabric !== resolved.selection.fabric) adjusted.push('Tuch: ' + resolved.fabric.name);
    }
    notice.hidden = !adjusted.length;
    notice.textContent = adjusted.length ? 'An die verfügbaren Varianten angepasst: ' + adjusted.join(' · ') : '';
    viewer.update({ model: resolved.selection.model, housingColor: resolved.housing.hex, fabricTexture: textureUrl(resolved), widthMm: resolved.size.widthMm, projectionMm: resolved.size.projectionMm });
    if (lastVariationId !== (resolved.variant?.variationId || 0)) {
      lastVariationId = resolved.variant?.variationId || 0;
      commerce.select(resolved.variant);
    }
    window.dispatchEvent(new CustomEvent('awning:selectionchange', {
      detail: {
        model: resolved.selection.model, operation: resolved.selection.operation,
        size: { ...resolved.size }, housing: resolved.housing.name, fabric: resolved.fabric.name,
        plenty: resolved.variant ? { itemId: resolved.variant.itemId, variationId: resolved.variant.variationId, variationNumber: resolved.variant.variationNumber } : null,
      },
    }));
  }
  function onClick(event            ) {
    const button = (event.target               ).closest                   ('button');
    if (!button || !controls.contains(button) || button.disabled) return;
    if (button.dataset.panel) {
      const key = button.dataset.panel;
      openPanel = openPanel === key ? null : key;
      renderControls(key);
      return;
    }
    const panel = button.closest             ('.eam-panel');
    const key = panel?.querySelector                   ('[data-panel]')?.dataset.panel;
    const value = button.dataset.value;
    if (!key || !value) return;
    if (key === 'model') {
      openPanel = null;
      update(remembered[value           ], 'model', null);
      return;
    }
    const property = key === 'size' ? 'sizeKey' : key;
    update({ ...resolved.selection, [property]: value }, key, value);
  }
  function onKeydown(event               ) {
    if (event.key !== 'Escape' || !openPanel) return;
    const key = openPanel;
    openPanel = null;
    renderControls(key);
  }
  controls.addEventListener('click', onClick);
  controls.addEventListener('keydown', onKeydown);
  update(resolved.selection, null, null);
  return {
    destroy() {
      disposed = true;
      controls.removeEventListener('click', onClick);
      controls.removeEventListener('keydown', onKeydown);
      commerce.destroy();
      viewer.destroy();
    },
  };
}

function start() {
  const win = window       ;
  if (win.EclipseAwningConfigurator?.started) return;
  // Capture while this deferred script is executing, before DOMContentLoaded.
  const script = (document.currentScript || document.getElementById('eclipse-awning-configurator-script'))                            ;
  const currentScriptSrc = script?.src || null;
  const currentScriptBase = script?.dataset.eamResourceBase || null;
  const instances = new Map                                                    ();
  const waitingSince = new Map                     ();
  let retryTimer = 0;
  function scheduleContextRetry() {
    if (retryTimer) return;
    retryTimer = window.setTimeout(() => { retryTimer = 0; mountAll(); }, 100);
  }
  function mountAll() {
    for (const root of waitingSince.keys()) if (!root.isConnected) waitingSince.delete(root);
    for (const [root, handle] of instances) {
      if (!root.isConnected) { handle.destroy(); instances.delete(root); }
    }
    document.querySelectorAll             ('[data-eam-root]').forEach((root) => {
      if (instances.has(root)) return;
      if (instances.size) {
        root.textContent = 'Der Markisen-Konfigurator ist bereits weiter oben auf dieser Seite verfügbar.';
        return;
      }
      if (win.App?.isItemView && root.dataset.useCurrentVariation !== 'false' && !readPageSelection(win).ready) {
        const since = waitingSince.get(root) ?? Date.now();
        waitingSince.set(root, since);
        if (Date.now() - since < 8000) { scheduleContextRetry(); return; }
      }
      waitingSince.delete(root);
      try { instances.set(root, createConfigurator(root, currentScriptSrc, currentScriptBase)); }
      catch (error) {
        root.textContent = 'Der Markisen-Konfigurator konnte nicht geladen werden. Bitte laden Sie die Seite neu.';
        console.error('[EclipseAwningConfigurator]', error);
      }
    });
  }
  win.EclipseAwningConfigurator = { version: '1.1.0', started: true, mountAll };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountAll, { once: true });
  else mountAll();
  const observer = new MutationObserver((records) => {
    const rootChanged = records.some((record) => [...record.addedNodes, ...record.removedNodes].some((changed) =>
      changed instanceof HTMLElement && (changed.matches('[data-eam-root]') || changed.querySelector('[data-eam-root]'))));
    if (rootChanged) mountAll();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

return {start, renderShopHtml};
})();
Application.start();
})();
