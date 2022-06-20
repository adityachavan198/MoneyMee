/*!
 * rumcaJS
 * Sebastian Musiał - https://github.com/sebastianmusial/rumcaJS
 * Free to use under terms of MIT license
 */

(function($) {

    //*********************************
    //  Defaults options
    //*********************************
    var defauls = {
        data: {},
        animation: true,
        animationOffset: 0,
        showValues: true,
        showVerticalLines: false,
        showHorizontalLines: false
    };

    //*********************************
    //  Private methods
    //*********************************
    function swap(list, a, b) {
        var tmp = list[a];
        list[a] = list[b];
        list[b] = tmp;
    }

    function getNewData($this) {
        var $axisYLabels = $this.find('.chart__label-y');
        var $bars = $this.find('.bar__container');
        var newData = {
            "axisY": [],
            "bars": []
        };

        var barsLength = $bars.length;

        if (barsLength && $axisYLabels.length === barsLength) {
            for (var i = 0; i < barsLength; i++) {
                var text = $($axisYLabels[i]).text();
                var value = $($bars[i]).data('value');

                newData.barsLength = barsLength;
                newData.axisY.push(text);
                newData.bars.push(value);
            }

            return newData;
        }

        return 0;
    }

    function viewportAnimation($item, offset) {
        var viewport = $(window);
        var setVisible = function ($item, offset) {
            var viewportTop = viewport.scrollTop(),
                viewportBottom = viewport.scrollTop() + viewport.height() - offset;
            $item.each(function () {
                var self = $(this),
                    top = self.offset().top,
                    bottom = top + self.height(),
                    topOnScreen = top >= viewportTop && top <= viewportBottom,
                    betweenScreen = top <= viewportTop && bottom >= viewportBottom,
                    bottomOnScreen = bottom >= viewportTop && bottom <= viewportBottom,
                    elemVisible = topOnScreen || bottomOnScreen || betweenScreen;
                self.toggleClass('visible', elemVisible);
            });
        };

        setVisible($item, offset);

        viewport.scroll(function() {
            setVisible($item, offset);
        });
    }


    //*********************************
    //  Public methods
    //*********************************
    var methods = {
        init: function(options, $this) {
            var initCode =  '<div class="chart--top">' +
                '<div class="chart__axis-y"></div>' +
                '<div class="chart__box chart--horizontal"> ' +
                    '<div class="chart__bars"></div>' +
                '</div>' +
            '</div>' +
            '<div class="chart__axis-x"></div>';

            $this.addClass('chart__container');

            $this.html(initCode);
            methods.appendAll(options.data, $this);
            methods.selectMax($this);
            methods.selectMin($this);

            if(!options.animation) {
                $this.addClass('visible');
            }
            else {
                viewportAnimation($this, options.animationOffset);
                methods.runAnimation($this);
            }
            if(options.showValues) {
                $this.addClass('show-values');
            }
            if(options.showVerticalLines) {
                $this.addClass('show-vertical-lines');
            }
            if(options.showHorizontalLines) {
                $this.addClass('show-horizontal-lines');
            }
        },
        prependItem: function(name, value) {
            methods.prependAxisY([name], this);
            methods.prependBars([value], this);
        },
        prependAxisX: function(data, $this) {
            if (!$this) {
                $this = this;
            }

            var $axis = $this.find('.chart__axis-x');

            data.forEach(function(v) {
                var label = '<span class="chart__label-x">' + v + '</span>';
                $axis.prepend(label);
            });

            var $labels = $axis.find('span');
            var quantityOfLabels = $labels.length;

            $labels.width(100/quantityOfLabels + '%');
        },
        prependBars: function(data, $this) {
            if (!$this) {
                $this = this;
            }

            var $bars = $this.find('.chart__bars');

            data.forEach(function(v) {
                var bar = '<div class="bar__container" data-value="' + v + '" style="width:' + v + '%">' +
                            '<span class="bar"></span></div>';
                $bars.prepend(bar);
            });

            methods.selectMax($this);
            methods.selectMin($this);
        },
        prependAxisY: function(data, $this) {
            if (!$this) {
                $this = this;
            }

            var $axis = $this.find('.chart__axis-y');

            data.forEach(function(v) {
                var label = '<div class="chart__label-y">' + v + '</div>';
                $axis.prepend(label);
            });
        },
        prependAll: function(data, $this) {
            if (!$this) {
                $this = this;
            }

            methods.prependAxisX(data.axisX, $this);
            methods.prependAxisY(data.axisY, $this);
            methods.prependBars(data.bars, $this);
        },
        appendItem: function(name, value) {
            methods.appendAxisY([name], this);
            methods.appendBars([value], this);
        },
        appendAxisX: function(data, $this) {
            if (!$this) {
                $this = this;
            }

            var $axis = $this.find('.chart__axis-x');

            data.forEach(function(v) {
                var label = '<span class="chart__label-x">' + v + '</span>';
                $axis.append(label);
            });

            var $labels = $axis.find('span');
            var quantityOfLabels = $labels.length;

            $labels.width(100/quantityOfLabels + '%');
        },
        appendBars: function(data, $this) {
            if (!$this) {
                $this = this;
            }

            var $bars = $this.find('.chart__bars');

            data.forEach(function(v) {
                var bar = '<div class="bar__container" data-value="' + v + '" style="width:' + v + '%">' +
                            '<span class="bar"></span></div>';
                $bars.append(bar);
            });

            methods.selectMax($this);
            methods.selectMin($this);
        },
        appendAxisY: function(data, $this) {
            if (!$this) {
                $this = this;
            }

            var $axis = $this.find('.chart__axis-y');

            data.forEach(function(v) {
                var label = '<div class="chart__label-y">' + v + '</div>';
                $axis.append(label);
            });
        },
        appendAll: function(data, $this) {
            if (!$this) {
                $this = this;
            }

            methods.appendAxisX(data.axisX, $this);
            methods.appendAxisY(data.axisY, $this);
            methods.appendBars(data.bars, $this);
        },
        resetBars: function($this) {
            if (!$this) {
                $this = this;
            }

            $this.find('.chart__bars').empty();
        },
        resetAxisX: function($this) {
            if (!$this) {
                $this = this;
            }

            $this.find('.chart__axis-x').empty();
        },
        resetAxisY: function($this) {
            if (!$this) {
                $this = this;
            }

            $this.find('.chart__axis-y').empty();
        },
        resetAll: function($this) {
            if (!$this) {
                $this = this;
            }

            methods.resetAxisX($this);
            methods.resetAxisY($this);
            methods.resetBars($this);
        },
        updateBars: function(data) {
            methods.resetBars(this);
            methods.appendBars(data, this);
        },
        updateAxisX: function(data) {
            methods.resetAxisX(this);
            methods.appendAxisX(data, this);
        },
        updateAxisY: function(data) {
            methods.resetAxisY(this);
            methods.appendAxisY(data, this);
        },
        updateAll: function(data) {
            methods.resetAll(this);
            methods.appendBars(data.bars, this);
            methods.appendAxisX(data.axisX, this);
            methods.appendAxisY(data.axisY, this);
        },
        removeItem: function(number) {
            var $axisYLabels = this.find('.chart__label-y');
            var $bars = this.find('.bar__container');

            $bars[number - 1].remove();
            $axisYLabels[number - 1].remove();
        },
        sortByName: function(desc) {
            var newData = getNewData(this);

            if (newData.barsLength) {
                for (var n = newData.barsLength; n > 1; --n) {
                    for (var i = 0; i < n - 1; ++i) {
                        if (newData.axisY[i] > newData.axisY[i + 1]) {
                            swap(newData.bars, i, i + 1);
                            swap(newData.axisY, i, i + 1);
                        }
                    }
                }

                methods.addSortedData(newData, desc, this);
            }
            else {
                console.error('Number of bars is not equals number of axis Y labels.');
            }
        },
        sortByValue: function(desc) {
            var newData = getNewData(this);

            if (newData.barsLength) {
                for (var n = newData.barsLength; n > 1; --n) {
                    for (var i = 0; i < n - 1; ++i) {
                        if (newData.bars[i] > newData.bars[i + 1]) {
                            swap(newData.bars, i, i + 1);
                            swap(newData.axisY, i, i + 1);
                        }
                    }
                }

                methods.addSortedData(newData, desc, this);
            }
            else {
                console.error('Number of bars is not equals number of axis Y labels.');
            }
        },
        addSortedData: function(data, desc, $this) {
            if(desc){
                data.bars.reverse();
                data.axisY.reverse();
            }

            methods.resetBars($this);
            methods.appendBars(data.bars, $this);
            methods.resetAxisY($this);
            methods.appendAxisY(data.axisY, $this);
        },
        selectMax: function($this) {
            if (!$this) {
                $this = this;
            }

            var $bars = $this.find('.bar__container');

            $bars.removeClass('max');

            var value = $bars.map(function() {
                return $(this).data('value');
            }).get();
            var max = Math.max.apply(Math, value);
            var $maxBar = $bars.filter('[data-value="' + max +'"]');

            $maxBar.addClass('max');
        },
        selectMin: function($this) {
            if (!$this) {
                $this = this;
            }

            var $bars = $this.find('.bar__container');

            $bars.removeClass('min');

            var value = $bars.map(function() {
                return $(this).data('value');
            }).get();
            var min = Math.min.apply(Math, value);
            var $minBar = $bars.filter('[data-value="' + min +'"]');

            $minBar.addClass('min');
        },
        runAnimation: function($this) {
            if (!$this) {
                $this = this;
            }

            $this.removeClass('visible');

            setTimeout(function() {
                $this.addClass('visible');
            }, 250);
        }
    };

    //*********************************
    //  Plugin definition
    //*********************************
    $.fn.horizontalChart = function(options) {
        // Run public methods
        if(methods[options]) {  
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        // Run plugin
        else if (typeof options === 'object' || ! options) {
            // Set options
            var settings = $.extend( {}, defauls, options);

            methods.init(settings, this);

            return;
        }
        // Error
        else {
            $.error('Method or option ' + options + ' does not exist on RumcaJS');
        }
    };
})(jQuery);
