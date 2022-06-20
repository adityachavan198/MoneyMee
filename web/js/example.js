$( document ).ready(function() {
    'use strict';

    // Data to charts
    var data = [{
        "name": "Miasta",
        "axisY": ["Manhattan", "Bronx", "Staten Island", "Wyry", "Brooklyn", "Brooklyn", "Gliwice"],
        "axisX": ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"],
        "bars": [50, 65, 90, 76, 90, 76, 68]
    },
    {
        "name": "Coca-cola - składniki",
        "axisY": ["Pomidor", "Woda", "Cukier", "Karmel", "Kofeina", "Dwutlenek węgla"],
        "axisX": ["20%", "40%", "60%", "80%", "100%"],
        "bars": [32, 23, 76, 68, 4, 97]
    }];

    // My options
    var options = {
        data: data[0],
        showValues: true,
        showVerticalLines: true,
        showHorizontalLines: true,
        animation: true,
        animationOffset: 200,
    };

    // Defaul chart
    var $myChart = $('#chart-1');

    $myChart.horizontalChart(options);

    //*************************************************************************
    //  Methods
    /**************************************************************************
    $myChart.horizontalChart(options);                             // Initialization horizontal chart.

    $myChart.horizontalChart('resetAll');                          // Remove all data.
    $myChart.horizontalChart('resetBars');                         // Remove all bars.
    $myChart.horizontalChart('resetAxisY');                        // Remove all data from axis Y.
    $myChart.horizontalChart('resetAxisX');                        // Remove all data from axis X.

    $myChart.horizontalChart('removeItem', 4);                     // Remove single item. Prameter: int value (from the top, starting on 1).

    $myChart.horizontalChart('appendAll', data[1]);                // Insert all data. Parameter: object with data.
    $myChart.horizontalChart('appendItem', 'new item', 33);        // Insert an element to the end. Parameters: string value (for axis Y label), int value (for bar).
    $myChart.horizontalChart('appendBars', data[1].bars);          // Insert a bars to the end. Parameter: array with int value.
    $myChart.horizontalChart('appendAxisY', data[1].axisY);        // Insert an axis Y value to the end. Parameter: array with string value.
    $myChart.horizontalChart('appendAxisX', data[0].axisX);        // Insert an axis X value to the ending. Parameter: array with string value.

    $myChart.horizontalChart('prependAll', data[1]);               // Insert all data. Parameter: object with data.
    $myChart.horizontalChart('prependItem', 'new item', 76);       // Insert an element to the beginning. Parameters: string value (for axis Y label), int value (for bar).
    $myChart.horizontalChart('prependBars', data[0].bars);         // Insert a bars on the beginning. Parameter: array with int value.
    $myChart.horizontalChart('prependAxisY', data[0].axisY);       // Insert an axis Y value to the beginning. Parameter: array with string value.
    $myChart.horizontalChart('prependAxisX', data[1].axisX);       // Insert an axis X value to the beginning. Parameter: array with string value.

    $myChart.horizontalChart('updateAll', data[1]);                // Update chart with new data. Parameter: object with new data.
    $myChart.horizontalChart('updateBars', data[0].bars);          // Update a bars. Parameter: array with int value.
    $myChart.horizontalChart('updateAxisY', data[0].axisY);        // Update an axis Y. Parameter: array with string value.
    $myChart.horizontalChart('updateAxisX', data[0].axisX);        // Update an axis X. Parameter: array with string value.

    $myChart.horizontalChart('sortByName', true);                  // Sort by name. Parameter: boolean value (true - descending, false - ascending).
    $myChart.horizontalChart('sortByValue', false);                // Sort by value. Parameter: boolean value (true - descending, false - ascending).

    $myChart.horizontalChart('selectMax');                         // Select bar with maxiumum value.
    $myChart.horizontalChart('selectMin');                         // Select bar with maxiumum value.

    $myChart.horizontalChart('runAnimation');                      // Animation trigger.
    **************************************************************************/
});
