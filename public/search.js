var guestRowTemplate;
var $guestList;
var $search;

function renderGuests(guests) {
    var html = _.map(guests, guestRowTemplate).join("");
    $guestList.html(html);
}

$(function () {
    guestRowTemplate = _.template("<tr><td><%= name %></td><td><%= table %></td></tr>");
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
});

function searchName(guests, term) {
    term = term.toLowerCase().replace(" ", ".+");
    console.log(term);
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
    $search.on('focusin', hideHeader);

    $search.on('focusout', showHeader);
}
