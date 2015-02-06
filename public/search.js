var guestRowTemplate;
var $guestList;
var $search;

function renderGuests(guests) {
    var html = _.map(guests, guestRowTemplate).join("");
    $guestList.html(html);
}

$(function () {
    guestRowTemplate = _.template("<tr><td><%= name %></td><td class='tableNum'><%= table %></td></tr>");
    $guestList = $(".guestList tbody");
    $search = $("#search");

    renderGuests(GUESTS);
    $search.on('keyup', function handleSearch(e) {
        hideHeader();
        var term = $(e.currentTarget).val();
        var filteredGuests = searchName(GUESTS, term);
        renderGuests(filteredGuests);
    });

    bindFocus();

    $("#floorplan").on("click", ".close", showList);
    $("#list tbody").on("click", "tr", showFloorplan);
});

function searchName(guests, term) {
    term = term.toLowerCase().replace(" ", ".+");
    var regTerm = new RegExp(term, "i");

    function predicate (guest) {
        var cond = guest.name.toLowerCase().match(regTerm);
        return cond;
    }
    return _.filter(guests, predicate);
}

function hideHeader() {
    $("#header").hide();
}

function showHeader() {
    $("#header").show();
}

function bindFocus() {
    // $search.on('focusin', hideHeader);
    // $search.on('focusout', showHeader);
}

function showFloorplan(e) {
    $("#list").hide();
    $("#floorplan").show();
    
    highlightTable(tableNum(e));
}

function tableNum(e) {
    return parseInt($(e.currentTarget).find(".tableNum").html());
}

function showList() {
    $("#floorplan").hide();
    $("#list").show();
}

var HEIGHT_PERC = 0.15;
var WIDTH_PERC = 0.10;
function highlightWidth() {
    var $image = $("#floorplan img");
    return $image.width() * WIDTH_PERC;
}

function highlightHeight() {
    var $image = $("#floorplan img");
    return $image.height() * HEIGHT_PERC;
}

function highlightTable(num) {
    var $highlight = $("#table-highlight");
    var $image = $("#floorplan img");

    var pos = calcHighlightPosition(num);
    $highlight.css({
        height: highlightHeight(),
        width: highlightWidth(),
        top: pos[0],
        left: pos[1]
    }); 
}

function calcHighlightPosition(num) {
    var $image = $("#floorplan img");
    var pos = POSITIONS[num];
    var hWidth = highlightWidth();
    var hHeight = highlightHeight();
    var hLeft = (pos[0] * hWidth) + hWidth/3.2;
    if (num < 16) {
        hLeft = hLeft + 2.5 * hWidth;
    }
    var hTop = pos[1] * highlightHeight();
    hTop = hTop + $image.position().top + (highlightHeight() * 1.25);

    return [hTop, hLeft];
}

var POSITIONS = {
    1: [6,0],
    2: [6,1],
    3: [6,2],
    4: [6,3],
    5: [6,4],
    6: [5,0],
    7: [5,1],
    8: [5,2],
    9: [5,3],
    10: [5,4],
    11: [4,0],
    12: [4,1],
    13: [4,2],
    14: [4,3],
    15: [4,4],
    16: [3,0],
    17: [3,1],
    18: [3,2],
    19: [3,3],
    20: [3,4],
    21: [2,0],
    22: [2,1],
    23: [2,2],
    24: [2,3],
    25: [2,4],
    26: [1,0],
    27: [1,1],
    28: [1,2],
    29: [1,3],
    30: [1,4],
    31: [0,0],
    32: [0,1],
    33: [0,2],
    34: [0,3],
    35: [0,4]
};

