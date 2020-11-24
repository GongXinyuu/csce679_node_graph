
//SVG variables, should be able to chnage freely
var svgWidth = 1800;
var svgHeight = 1000;

//create SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//bring in nodes and links
var nodes = JSON.parse(nodes)

var links = JSON.parse(links)

//defines a link
var link = svg
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .style("stroke", "#aaa")
    .style("stroke-width", linkWidth)

//changes link strokewidth based on calculated length magnitude
function linkWidth(link){
    var linkMag = link.magnitude
    if (linkMag <= 30){
        return "1px"
    }
    else
    {
        return "0px"
    }
}

//colors
//pop #ff0000
//rock #006600
//hip hop #0066cc
//metal #993366
//indie #ffff80

//defines node
var node = svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", function(d){return d.popularity**5 / 100000000})
    .style("fill", function(d){
        return "rgb(" + d.energy + ", " + d.danceability * 2 + ", " + d.bpm + ")"
        if (d.genre == "classic rock"){
            return "#006600"
        }
        if (d.genre == "adult standards"){
            return "#0066cc"
        }
        if (d.genre == "album rock"){
            return "#006700"
        }
        if (d.genre == "alternative hip hop"){
            return "#0066cd"
        }
        if (d.genre == "alternative metal"){
            return "#993366"
        }
        if (d.genre == "alternative pop rock"){
            return "#006800"
        }
        if (d.genre == "pop"){
            return "#ff0000"
        }
        if (d.genre == "modern rock"){
            return "#006900"
        }
        if (d.genre == "detroit hip hop"){
            return "#0066ce"
        }
        if (d.genre == "dutch indie"){
            return "#ffff00"
        }
        if (d.genre == "garage rock"){
            return "#006a00"
        }
        if (d.genre == "dutch cabaret"){
            return "#ffff00"
        }
        if (d.genre == "permanent wave"){
            return "#FFFFFF"
        }
        if (d.genre == "classic uk pop"){
            return "#ff0100"
        }
        if (d.genre == "dance pop"){
            return "#ff0200"
        }
        if (d.genre == "modern folk rock"){
            return "#006b00"
        }
        if (d.genre == "dutch pop"){
            return "#ff0300"
        }
        if (d.genre == "dutch americana"){
            return "#FFFFFF"
        }
        if (d.genre == "alternative dance"){
            return "#FFFFFF"
        }
        if (d.genre == "german pop"){
            return "#ff0400"
        }
        if (d.genre == "afropop"){
            return "#ff0500"
        }
        if (d.genre == "british soul"){
            return "#FFFFFF"
        }
        if (d.genre == "irish rock"){
            return "#006c00"
        }
        if (d.genre == "disco"){
            return "#FFFFFF"
        }
        if (d.genre == "big room"){
            return "#FFFFFF"
        }
        if (d.genre == "art rock"){
            return "#006d00"
        }
        if (d.genre == "danish pop rock"){
            return "#006f00"
        }
        if (d.genre == "neo mellow"){
            return "#ffff00"
        }
        if (d.genre == "britpop"){
            return "#ff0600"
        }
        if (d.genre == "boy band"){
            return "#FFFFFF"
        }
        if (d.genre == "carnaval limburg"){
            return "#ffff00"
        }
        if (d.genre == "arkansas country"){
            return "#FFFFFF"
        }
        if (d.genre == "latin alternative"){
            return "#ffff00"
        }
        if (d.genre == "celtic"){
            return "#ffff00"
        }
        if (d.genre == "chanson"){
            return "#ffff00"
        }
        if (d.genre == "celtic rock"){
            return "#007600"
        }
        if (d.genre == "hip pop"){
            return "#ff0F00"
        }
        if (d.genre == "east coast hip hop"){
            return "#0066cf"
        }
        if (d.genre == "blues rock"){
            return "#007700"
        }
        if (d.genre == "electro"){
            return "#FFFFFF"
        }
        if (d.genre == "australian pop"){
            return "#ff0700"
        }
        if (d.genre == "belgian rock"){
            return "#007800"
        }
        if (d.genre == "downtempo"){
            return "#FFFFFF"
        }
        if (d.genre == "reggae fusion"){
            return "#FFFFFF"
        }
        if (d.genre == "british invasion"){
            return "#FFFFFF"
        }
        if (d.genre == "alternative rock"){
            return "#007900"
        }
        if (d.genre == "british folk"){
            return "#ffff00"
        }
        if (d.genre == "dutch rock"){
            return "#007a00"
        }
        if (d.genre == "finnish metal"){
            return "#993366"
        }
        if (d.genre == "canadian pop"){
            return "#ff0800"
        }
        if (d.genre == "bow pop"){
            return "#ff0900"
        }
        if (d.genre == "dutch hip hop"){
            return "#0066dc"
        }
        if (d.genre == "dutch metal"){
            return "#993366"
        }
        if (d.genre == "soft rock"){
            return "#007b00"
        }
        if (d.genre == "acoustic pop"){
            return "#ff0a00"
        }
        if (d.genre == "acid jazz"){
            return "#FFFFFF"
        }
        if (d.genre == "dutch prog"){
            return "#FFFFFF"
        }
        if (d.genre == "candy pop"){
            return "#ff0b00"
        }
        if (d.genre == "operatic pop"){
            return "#ff0c00"
        }
        console.log(d.genre)
        return "#000000"
    })

//varies the pull of a link based on magnitude
function linkStr(link){
    var linkMag = link.magnitude
    if (linkMag <= 30){
        return 1
    }
    if (linkMag <= 60){
        return .1
    }
    else{
        return .01
    }
}

//Whole simulation
var simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink()
          .id(function(d) { return d.name; })
          //Distance between nodes
          .distance(function(d){return d.magnitude})
          //defines the strength of a link
          .strength(linkStr)
          .links(links)
    )
    //play with base value
    .force("charge", d3.forceManyBody().strength(-2000))         // This adds repulsion between nodes
    .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))     // This force attracts nodes to the center of the svg area
    .on("tick", ticked);

// This function is run at each iteration of the force algorithm, updating the nodes position.
function ticked() {
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node
       .attr("cx", function (d) { return d.x; })
       .attr("cy", function(d) { return d.y; });
}