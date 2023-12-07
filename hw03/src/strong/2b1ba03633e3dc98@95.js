import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# HW03 Strong baseline`
)}

function _data(FileAttachment){return(
FileAttachment("UserData.json").json()
)}

function _bgColor(Inputs){return(
Inputs.color({ label: "background color", value: "#E0DFD5" })
)}

function _strokeColor(Inputs){return(
Inputs.color({ label: "stroke color", value: "#000000" })
)}

function _strokeOpacity(Inputs){return(
Inputs.range([0, 1], {
  step: 0.1,
  label: "stroke opacity"
})
)}

function _taiwan(taiwanMap){return(
taiwanMap(800, 600, -0.0, -0.6, 8000)
)}

function _taiwanMap(d3,topojson,tw,DOM,bgColor,strokeColor,strokeOpacity,defaultColor,minidata){return(
(width, height, offsetX, offsetY, scale) => {
  offsetX = offsetX + 0.75;

  const bboxCenter = (bbox) => [
    (bbox[0] + bbox[2]) / 2 + offsetX,
    (bbox[1] + bbox[3]) / 2 + offsetY
  ];
  const projection = d3
    .geoMercator()
    .center(bboxCenter(topojson.bbox(tw)))
    .translate([width / 2, height / 2])
    .scale(scale);

  const path = d3.geoPath().projection(projection);

  const svg = d3
    .select(DOM.svg(width, height))
    .style("width", "auto")
    .style("height", "auto")
    .style("background-color", bgColor);

  const details = svg
    .append("g")
    .selectAll("path")
    .data(topojson.feature(tw, tw.objects.counties).features);

  svg
    .append("path")
    .datum(topojson.mesh(tw, tw.objects.counties, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", strokeColor)
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 0.5)
    .attr("opacity", strokeOpacity)
    .attr("d", path);

  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
  
  
    // 設定人數閥值，可以根據實際情況調整
  const thresholds = [1, 5, 30, 40];

  // 設定對應的填充顏色
  const colorScale = d3.scaleThreshold()
    .domain(thresholds)
      .range(["#CFE0C3", "#9EC1A3", "#70A9A1", "#40798C","#1F363D", defaultColor]);

  
  details
    .enter()
    .append("path")
    .attr("fill", (d) => {
      const countyData = minidata.find(
        (t) =>
          t.value === d.properties.COUNTYNAME &&
          t["value"].replace("　", "") === d.properties.COUNTYNAME
      );

      if (countyData) {
        return colorScale(countyData.count);
      } else {
        return defaultColor;
      }
    })
    .attr("d", path)
    .append("title")
    // .text((d) => d.properties.COUNTYNAME);
    .text((d) => {
    const countyData = minidata.find(
      (t) =>
        t.value === d.properties.COUNTYNAME &&
        t["value"].replace("　", "") === d.properties.COUNTYNAME
    );

    if (countyData) {
      // 格式化提示訊息，這裡假設人數資料存在 count 屬性中
      return `${d.properties.COUNTYNAME}: ${countyData.count} 人`;
    } else {
      return `${d.properties.COUNTYNAME}: 0 人`;
    }
  });
  

  svg.append("g");
 
  return svg.node();
}
)}

function _8(md){return(
md`## Parameter`
)}

function _LivePlace(data){return(
Object.keys(data[0])[0]
)}

function _LivePlace_column(data,LivePlace){return(
data.map(row => row[LivePlace])
)}

function _LivePlace_uniqueValues(LivePlace_column){return(
[...new Set(LivePlace_column)].sort()
)}

function _LivePlace_counts(LivePlace_uniqueValues,LivePlace_column){return(
LivePlace_uniqueValues.map(val => ({
  value: val,
  count: LivePlace_column.filter(v => v === val).length
}))
)}

function _minidata(LivePlace_counts){return(
LivePlace_counts.flatMap((item, index) => ([
  {
    value: item.value,
    count: item.count,
    series: 'LivePlace'
  }
]))
)}

function _14(minidata){return(
minidata[5].value = "台中市"
)}

function _15(minidata){return(
minidata[6].value = "台北市"
)}

function _16(minidata){return(
minidata[7].value = "台東縣"
)}

function _defaultColor(){return(
"#DBEBC0"
)}

function _18(md){return(
md`## Requirement`
)}

function _tw(d3){return(
d3.json("https://cdn.jsdelivr.net/npm/taiwan-atlas/towns-10t.json")
)}

function _topojson(require){return(
require("topojson-client@3")
)}

function _d3(require){return(
require("d3@5")
)}

function _path(d3){return(
d3.geoPath()
)}

function _buildHierarchy(){return(
function buildHierarchy(csv) {
  // Helper function that transforms the given CSV into a hierarchical format.
  const root = { name: "root", children: [] };
  for (let i = 0; i < csv.length; i++) {
    const sequence = csv[i][0];
    const size = +csv[i][1];
    if (isNaN(size)) {
      // e.g. if this is a header row
      continue;
    }
    const parts = sequence.split("-");
    let currentNode = root;
    for (let j = 0; j < parts.length; j++) {
      const children = currentNode["children"];
      const nodeName = parts[j];
      let childNode = null;
      if (j + 1 < parts.length) {
        // Not yet at the end of the sequence; move down the tree.
        let foundChild = false;
        for (let k = 0; k < children.length; k++) {
          if (children[k]["name"] == nodeName) {
            childNode = children[k];
            foundChild = true;
            break;
          }
        }
        // If we don't already have a child node for this branch, create it.
        if (!foundChild) {
          childNode = { name: nodeName, children: [] };
          children.push(childNode);
        }
        currentNode = childNode;
      } else {
        // Reached the end of the sequence; create a leaf node.
        childNode = { name: nodeName, value: size };
        children.push(childNode);
      }
    }
  }
  return root;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["UserData.json", {url: new URL("../UserData.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("viewof bgColor")).define("viewof bgColor", ["Inputs"], _bgColor);
  main.variable(observer("bgColor")).define("bgColor", ["Generators", "viewof bgColor"], (G, _) => G.input(_));
  main.variable(observer("viewof strokeColor")).define("viewof strokeColor", ["Inputs"], _strokeColor);
  main.variable(observer("strokeColor")).define("strokeColor", ["Generators", "viewof strokeColor"], (G, _) => G.input(_));
  main.variable(observer("viewof strokeOpacity")).define("viewof strokeOpacity", ["Inputs"], _strokeOpacity);
  main.variable(observer("strokeOpacity")).define("strokeOpacity", ["Generators", "viewof strokeOpacity"], (G, _) => G.input(_));
  main.variable(observer("taiwan")).define("taiwan", ["taiwanMap"], _taiwan);
  main.variable(observer("taiwanMap")).define("taiwanMap", ["d3","topojson","tw","DOM","bgColor","strokeColor","strokeOpacity","defaultColor","minidata"], _taiwanMap);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("LivePlace")).define("LivePlace", ["data"], _LivePlace);
  main.variable(observer("LivePlace_column")).define("LivePlace_column", ["data","LivePlace"], _LivePlace_column);
  main.variable(observer("LivePlace_uniqueValues")).define("LivePlace_uniqueValues", ["LivePlace_column"], _LivePlace_uniqueValues);
  main.variable(observer("LivePlace_counts")).define("LivePlace_counts", ["LivePlace_uniqueValues","LivePlace_column"], _LivePlace_counts);
  main.variable(observer("minidata")).define("minidata", ["LivePlace_counts"], _minidata);
  main.variable(observer()).define(["minidata"], _14);
  main.variable(observer()).define(["minidata"], _15);
  main.variable(observer()).define(["minidata"], _16);
  main.variable(observer("defaultColor")).define("defaultColor", _defaultColor);
  main.variable(observer()).define(["md"], _18);
  const child1 = runtime.module(define1);
  main.import("select", child1);
  main.variable(observer("tw")).define("tw", ["d3"], _tw);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("path")).define("path", ["d3"], _path);
  main.variable(observer("buildHierarchy")).define("buildHierarchy", _buildHierarchy);
  return main;
}