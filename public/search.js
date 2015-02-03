
var guestRowTemplate = _.template("<tr><td><%= name %></td><td><%= table %></td></tr>");
var $guestList = $(".guestList tbody");

function renderGuests(guests) {
    var html = _.map(guests, guestRowTemplate).join("");
    $guestList.html(html);
}

$(function () {
    renderGuests(GUESTS);
    $("#search").on('keyup', function handleSearch(e) {
        console.log(e);
        var term = $(e.currentTarget).val();
        var filteredGuests = searchName(GUESTS, term);
        renderGuests(filteredGuests);
    });
});

function searchName(guests, term) {
    term = term.toLowerCase();
    console.log(term);
    function predicate (guest) {
        console.log(guest.name);
        var cond = guest.name.toLowerCase().indexOf(term) > -1;
        console.log(cond);
        return cond;
    }
    return _.filter(guests, predicate);
}

