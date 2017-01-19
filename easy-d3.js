function createSVG(div, width, height) {
  d3.select(div + " > svg").remove();
  var svg = d3.select(div).append("svg")
    .attr("width", width)
    .attr("height", height);
}

function annotate(div, objects) {
  var svg = d3.select(div + " > svg");
  for (var i in objects) {
    var o = objects[i];
    if (o.type == "rect") {
      svg.append("rect")
        .attr("x", o.x)
        .attr("y", o.y)
        .attr("width", o.width)
        .attr("height", o.height)
        .attr("fill", o.fill)
    } else if (o.type == "arrow") {
      var path;
      if (o.direction == "right") {
        path = ["M", o.x, o.y, "L", o.x + o.width, o.y + o.height / 2, "L", o.x, o.y + o.height].join(" ")
      } else if (o.direction == "down") {
        path = ["M", o.x, o.y, "L", o.x + o.width / 2, o.y + o.height, "L", o.x + o.width, o.y].join(" ")
      } else if (o.direction == "up") {
        path = ["M", o.x, o.y + o.height, "L", o.x + o.width / 2, o.y, "L", o.x + o.width, o.y + o.height].join(" ")
      } else if (o.direction == "left") {
        path = ["M", o.x + o.width, o.y, "L", o.x, o.y + o.height / 2, "L", o.x + o.width, o.y + o.height].join(" ")
      }
      svg.append("path")
        .attr("d", path)
        .attr("fill", o.fill)
        .attr("stroke", o.stroke)
    } else if (o.type == "text") {
      svg.append("text")
        .attr("x", o.x)
        .attr("y", o.y)
        .attr("fill", o.fill)
        .attr("text-anchor", "middle")
        .text(o.text)
    } else if (o.type == "bracket") {
      var path = ["M", o.x, o.y + o.height, "L", o.x, o.y, "L", o.x + o.width, o.y, "L", o.x + o.width, o.y + o.height].join(" ");
      svg.append("path")
        .attr("d", path)
        .attr("stroke", o.stroke)
        .attr("fill", "none")
    } else if (o.type == "dashed-line") {
      var path = ["M", o.x, o.y, "L", o.x, o.y + o.height].join(" ")
      svg.append("path")
        .attr("d", path)
        .style("stroke-dasharray", ("3, 3"))
        .attr("stroke", o.stroke)
    } else if (o.type == "marker") {
      var markerGroup = svg.append("g")
      markerGroup.append("text")
        .attr("x", o.x)
        .attr("y", o.y)
        .attr("text-anchor", "middle")
        .attr("fill", o.fill)
        .text(o.text)
      var path = ["M", o.x, o.y + 5, "L", o.x, o.y + o.height].join(" ")
      markerGroup.append("path")
        .attr("d", path)
        .style("stroke-dasharray", ("3, 3"))
        .attr("stroke", o.stroke)
    }
  }
}