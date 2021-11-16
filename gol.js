(function ($) {
    "use strict"

    var xAxis = 10;
    var yAxis = 10;

    var $table = $("<table>");

    var golArray = [];

    // Make Chart
    for (var i = 0; i < yAxis; i++){
        var $row = $("<tr>");
        var rowArray = [];
        for (var j= 0; j < xAxis; j++){
            var $cell = $("<td>");
            $cell.attr('id', i + '_' + j);
            $cell.attr('class', 'dead');
            $cell.appendTo($row);
            rowArray.push($cell);
        }
        $row.appendTo($table);
        golArray.push(rowArray);
    };

    $(".content-gol").append($table);

    function isAlive(x,y) {
        if (x < 0) {
            x=9;
        };
        if (x > 9) {
            x=0;
        };
        if (y < 0) {
            y=9;
        }
        if (y > 9) {
            y=0;
        };
        var alive = (golArray[x][y]).hasClass("alive");
        return alive;
    };

    function currLoc (td) {
        var currLocation = $(td).attr('id');
        var currX = currLocation[0];
        var currY = currLocation[2];
        return {x:currX, y:currY};
    };

    $("td").on("click", function(){
        if ($(this).is(".alive")) {
            $(this).addClass('dead').removeClass('alive');
        } else {
            $(this).addClass('alive').removeClass('dead');
        }
    });

    function neighborCheck (x,y) {
        var currentCell = isAlive(x,y);
        var aliveCount = 0;

        if (isAlive(x-1, y-1)) {
            aliveCount += 1;
        }
        if (isAlive(x-1, y)) {
            aliveCount += 1;
        }
        if (isAlive(x-1, y+1)) {
            aliveCount += 1;
        }
        if (isAlive(x, y-1)) {
            aliveCount += 1;
        }
        if (isAlive(x, y+1)) {
            aliveCount += 1;
        }
        if (isAlive(x+1, y-1)) {
            aliveCount += 1;
        }
        if (isAlive(x+1, y)) {
            aliveCount += 1;
        }
        if (isAlive(x+1, y+1)) {
            aliveCount += 1;
        }
        if (currentCell) {
            if (aliveCount < 2 || aliveCount > 3) {
                return "makedead";
            } else {
                return "makealive";
            }
        } else {
            if (aliveCount === 3) {
                return "makealive";
            }
        }
    }

    var timer;

    $(".start-sim").on("click", function(event){
        event.preventDefault();
        timer = setInterval(startSim, 1000);
    });

    $(".end-sim").on("click", function(event){
        event.preventDefault();
        clearInterval(timer);
    });

    function startSim() {
        $("td").each(function(index) {
            var currentCell = currLoc($(this));
            var x = parseInt(currentCell.x);
            var y = parseInt(currentCell.y);
            var result = neighborCheck(x,y);

            if (result === 'makealive') {
                $(this).addClass('will-be-alive');
            } else {
                $(this).addClass('will-be-dead');
            }
        });

        $("td").each(function(index){
            if($(this).hasClass("will-be-alive")){
                $(this).addClass('alive').removeClass('dead will-be-alive');
            } else if ($(this).hasClass("will-be-dead")){
                $(this).addClass('dead').removeClass('alive will-be-dead');
            }
        })
    };
} (jQuery));