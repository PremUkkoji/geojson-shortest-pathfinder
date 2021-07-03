# GeoJSON Shortest Pathfinder

Standalone JavaScript library for routing/path finding using GeoJSON & coords as input.

# Install

## Node

`npm i geojson-shortest-pathfinder`

## Web

```html
<script src="https://bundle.run/geojson-shortest-pathfinder@1.0.4"></script>
```


# Usage

```js
const package = require('geojson-shortest-pathfinder');

const geojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              74.7509765625,
              19.08288436934017
            ],
            [
              77.7392578125,
              20.96143961409684
            ]
          ]
        }
      }
      // etc.....
   ]
};

let start = [74.75097656, 19.082884369340];
let end = [80.375976562499, 22.60386884289];

const path = package.pathFinder(geojson, start, end);
console.log(path);
```
