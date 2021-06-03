const package = require('geojson-shortest-pathfinder');

geojson = {
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
      },
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
              75.8056640625,
              22.755920681486405
            ]
          ]
        }
      },
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
              82.0458984375,
              19.103648251663646
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              75.8056640625,
              22.755920681486405
            ],
            [
              80.37597656249999,
              22.6038688428957
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              77.7392578125,
              20.96143961409684
            ],
            [
              78.541259765625,
              19.663280219987662
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              78.541259765625,
              19.663280219987662
            ],
            [
              80.37597656249999,
              22.6038688428957
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              82.0458984375,
              19.103648251663646
            ],
            [
              80.37597656249999,
              22.6038688428957
            ]
          ]
        }
      }
    ]
}

start = [74.75097656, 19.082884369340];
end = [80.375976562499, 22.60386884289];

var path = package.pathFinder(geojson, start, end);
process.stdout.write(JSON.stringify(path) + "\n");