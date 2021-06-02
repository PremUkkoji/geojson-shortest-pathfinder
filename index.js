nodes = [];
edges = {};
inf = 9999999999;
parent = {};
dist = {};

class Point{
    constructor(x, y){
        this.x=x;
        this.y=y;
    }
};

function distance(a, b){
    var d1 = a.x - b.x;
    var d2 = a.y - b.y;

    return Math.sqrt( d1*d1 + d2*d2 );
}

function createEdge(a, b){
    let key1 = String(a.x) + "_" + String(a.y);
    let key2 = String(b.x) + "_" + String(b.y);
    var weight = distance(a, b);
    
    if(Object.keys(edges).indexOf(key1) == -1){
        edges[key1] = {};
    }
    edges[key1][key2] = weight;
    
    if(Object.keys(edges).indexOf(key2) == -1){
        edges[key2] = {};
    }
    edges[key2][key1] = weight;
}

function dijkstras(start, end){
    parent = {};
    dist = {};
    var visited = [];
    for(var i=0;i<nodes.length;i++){
        var key = String(nodes[i].x) + "_" + String(nodes[i].y);
        if(nodes[i].x == start.x && nodes[i].y == start.y){
            dist[key] = 0;
        }else{
            dist[key] = inf;
        }
    }

    for(var i=0;i<nodes.length;i++){
        var small = inf;
        var small_node;
        
        for(var j=0;j<nodes.length;j++){
            var key = String(nodes[j].x) + "_" + String(nodes[j].y);
            if(visited.find(ele => ele.x == nodes[j].x && ele.y == nodes[j].y) == undefined){
                if(dist[key] < small){
                    small = dist[key];
                    small_node = nodes[j];
                }
            }
        }

        var current_node = String(small_node.x) + "_" + String(small_node.y);
        Object.keys(edges[current_node]).forEach(element => {
            
            if(dist[element] > dist[current_node] + edges[current_node][element]){
                edges[current_node][element] = dist[current_node] + edges[current_node][element];
                edges[element][current_node] = dist[current_node] + edges[element][current_node];
                parent[element] = current_node;
                dist[element] = dist[current_node] + edges[current_node][element];
            }
        });
        visited.push(small_node);
    }
}

function shortestPath(start, end){
    var begin = String(start.x) + "_" + String(start.y);
    // var destination = String(end.x) + "_" + String(end.y);
    var path = [];
    var curr = String(end.x) + "_" + String(end.y);

    while(curr != begin){
        path.push(curr);
        curr = parent[curr];
    }
    path.push(curr);
    return path;
}

module.exports = {
  pathFinder: (geojson, start, end) => {
    start = new Point(start[0], start[1]);
    end = new Point(end[0], end[1]);
    if(geojson["type"] == "FeatureCollection"){
        var features = geojson["features"];

        if(features.length > 0){
            for(var i=0;i<features.length;i++){
                var feature = features[i];
                var geometry = feature["geometry"];
                var coordinates = geometry["coordinates"];

                var lastnode = undefined;
                for(var j=0;j<coordinates.length;j++){
                    var node = new Point(coordinates[j][0], coordinates[j][1]);
                    if(nodes.find(ele => ele.x == node.x && ele.y == node.y) == undefined){
                        nodes.push(node);
                    }
                    
                    if(lastnode){
                        createEdge(lastnode, node);
                    }
                    lastnode = node;
                }
            }
            dijkstras(start, end);
            var path = shortestPath(start, end);
            path = path.reverse();
            var path_coordinates = [];
            for(var i=0;i<path.length;i++){
                var temp = [0,0];
                temp[0] = path[i].split("_")[0];
                temp[1] = path[i].split("_")[1];
                path_coordinates.push(temp);
            }
            
            return path_coordinates;
        }else{
            throw Error("no features available to create graph")
            return;
        }
    }else{
        throw Error("not valid geojson data")
        return;
    }
  }
}