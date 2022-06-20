var Fn = Fn || {};

Fn.makeCircleChart = function(figure) {
    function sliceSize(dataNum, dataTotal) {
        return (dataNum / dataTotal) * 360;
    }
    function addSlice(sliceSize, figure, color1, color2) {
        $(figure).append("<div class='slice-bg'></div>");
        $(figure).append("<div class='slice'><span></span></div>");
        var sizeRotation = -180 + sliceSize;
        var gradient = "linear-gradient" || "-webkit-linear-gradient" || "-o-linear-gradient" || "-moz-linear-gradient" || "-ms-linear-gradient";
		var transform = "transform" || "-webkit-transform" || "-o-transform" || "-moz-transform" || "-ms-transform";
		if (!$(".ie-lower").length) {
			if (sliceSize > 180) {
				$(figure).append("<div class='slice2'><span></span></div>");
				$(figure).addClass("pie-two");
				$(figure).find(".slice span").css({
					transform: "rotate(" + 0 + "deg) translate3d(0,0,0)",
					"background": gradient + "(to bottom, " + color1 + ", " + color2 + ")"
				});
				$(figure).find(".slice2").css({
					transform: "rotate(" + sizeRotation + "deg) translate3d(0,0,0)"
				});
				$(figure).find(".slice2 span").css({
					"background": gradient + "(to bottom, " + color1 + ", " + color2 + ")"
				});
			} else {
				$(figure).find(".slice span").css({
					transform: "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
					"background": gradient + "(to bottom, " + color1 + ", " + color2 + ")"
				});
			}
		}
    }
    function iterateSlices(sliceSize, figure, dataCount, sliceCount, color1, color2) {
        addSlice(sliceSize, figure, color1, color2);
    }
    function createPie(figure) {
        
        var listData = $(figure).parents(".circle-one").find(".percent").text().split("%")[0];
        var listTotal = 100;
        var color = [
            ["#fb3232", "#be1818"],
            ["#268bba", "#1d4c81"],
            ["#4a7b2a", "#36621a"],
            ["#d4ae42", "#bb962c"],
            ["#a89e8b", "#8b8270"],
            ["#898989", "#cbcbcb"]
        ];
        var idx = $(figure).parents("li").index();
        var size = sliceSize(listData, listTotal);
        iterateSlices(size, figure, 1, 0, color[idx][0], color[idx][1]);
      if ($(".ie-lower").length) {
        $(figure).find(".slice").css({
          "width":listData/100*198,
          "background-color": color[idx][0]
        });
      } 
    }
    createPie(figure);
};

if ($(".circle-one .pie").length) {
  $(".circle-one .pie").each(function () {
    Fn.makeCircleChart(this);
  });
}
