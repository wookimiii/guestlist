
var guestRowTemplate = _.template("<tr><td><%= name %></td><td><%= table %></td></tr>");
var $guestList = $(".guestList tbody");

function renderGuests(guests) {
    var html = _.map(guests, guestRowTemplate).join("");
    $guestList.html(html);
}

$(function () {
    renderGuests(GUESTS);
    $("#search").on('keyup', function handleSearch(e) {
        var term = $(e.currentTarget).val();
        var filteredGuests = searchName(GUESTS, term);
        renderGuests(filteredGuests);
    });
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

