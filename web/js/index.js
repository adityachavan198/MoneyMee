var chartData = {
    "barCircleMobile":[
        {"index":0.3, "value":17436920, "fill":"#231F20", "label":"WebMd Health"},
        {"index":0.4, "value":10884799, "fill":"#494551", "label":"Livestrong.com"},
        {"index":0.5, "value":10257432, "fill":"#564965", "label":"Everyday Health"},
        {"index":0.6, "value":6110024,  "fill":"#574270", "label":"About.com"},
        {"index":0.7, "value":3895612,  "fill":"#4D2D77", "label":"Drugs.com"},
        {"index":0.8, "value":3414585,  "fill":"#684E88", "label":"Alliance Health"},
        {"index":0.9, "value":3099372,  "fill":"#846F9D", "label":"Lifescript.com"},
        {"index":1,   "value":2897520,  "fill":"#A494B7", "label":"Health.com"},
        {"index":1.1, "value":2772679,  "fill":"#CBC3D6", "label":"Health Grades"},
        {"index":1.2, "value":2636126,  "fill":"#F1EFF4", "label":"Healthline"}
    ],
    "barCircleWeb":[
        {"index":0.3, "value":31588490, "fill":"#231F20", "label":"WebMD Health"},
        {"index":0.4, "value":26260662, "fill":"#403437", "label":"Everyday Health"},
        {"index":0.5, "value":24263463, "fill":"#53363C", "label":"Livestrong.com"},
        {"index":0.6, "value":12795112, "fill":"#5E2C3A", "label":"About.com Health Section"},
        {"index":0.7, "value":11959167, "fill":"#660E34", "label":"Healthline"},
        {"index":0.8, "value":10408917, "fill":"#7D3A4D", "label":"HealthGrades"},
        {"index":0.9, "value":10317462, "fill":"#96606B", "label":"Yahoo! Health"},
        {"index":1,   "value":9765589,  "fill":"#B28A91", "label":"Lifescript.com"},
        {"index":1.1, "value":7734964,  "fill":"#D3BCBF", "label":"Health.com"},
        {"index":1.2, "value":7504000 , "fill":"#EDE4E5", "label":"Drugs.com"}
    ]
};

function drawBarCircleChart(data,target,values,labels){
    var w = 362,
        h = 362,
        size = data[0].value * 1.15,
        radius = 200,
        sectorWidth = .1,
        radScale = 25,
        sectorScale = 1.45,
        target = d3.select(target),
        valueText = d3.select(values),
        labelText = d3.select(labels);


    var arc = d3.svg.arc()
        .innerRadius(function(d,i){return (d.index/sectorScale) * radius + radScale; })
        .outerRadius(function(d,i){return ((d.index/sectorScale) + (sectorWidth/sectorScale)) * radius + radScale; })
        .startAngle(Math.PI)
        .endAngle(function(d) { return Math.PI + (d.value / size) * 2 * Math.PI; });
    
    var path = target.selectAll("path")
        .data(data);

    //TODO: seperate color and index from data object, make it a pain to update object order
    path.enter().append("svg:path")
        .attr("fill",function(d,i){return d.fill})
        .attr("stroke","#D1D3D4")
        .transition()
        .ease("elastic")
        .duration(1000)
        .delay(function(d,i){return i*100})
        .attrTween("d", arcTween);
        
    valueText.selectAll("tspan").data(data).enter()
        .append("tspan")
        .attr({
            x:50,
            y:function(d,i){return i*14},       
            "text-anchor":"end"
        })
        .text(function(d,i){return data[i].value});
    
    labelText.selectAll("tspan").data(data).enter()
        .append("tspan")
        .attr({
            x:0,
            y:function(d,i){return i*14}
        })
        .text(function(d,i){return data[i].label});

    function arcTween(b) {
        var i = d3.interpolate({value: 0}, b);
        return function(t) {
            return arc(i(t));
        };
    }
}

// Animation Queue
setTimeout(function(){drawBarCircleChart(chartData.barCircleWeb,"#circleBar-web-chart","#circleBar-web-values","#circleBar-web-labels")},500);
setTimeout(function(){drawBarCircleChart(chartData.barCircleMobile,"#circleBar-mobile-chart","#circleBar-mobile-values","#circleBar-mobile-labels")},800);

d3.select("#circleBar-web-icon")
    .transition()
    .delay(500)
    .duration(500)
    .attr("opacity","1");
d3.select("#circleBar-web-text")
    .transition()
    .delay(750)
    .duration(500)
    .attr("opacity","1");

d3.select("#circleBar-web-clipLabels")
    .transition()
    .delay(600)
    .duration(1250)
    .attr("height","150");

d3.select("#circleBar-mobile-icon")
    .transition()
    .delay(800)
    .duration(500)
    .attr("opacity","1");
d3.select("#circleBar-mobile-text")
    .transition()
    .delay(1050)
    .duration(500)
    .attr("opacity","1");
d3.select("#circleBar-mobile-clipLabels")
    .transition()
    .delay(900)
    .duration(1250)
    .attr("height","150");