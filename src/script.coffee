scroll = new SmoothScroll 'a[href*="#"]', {offset: 66}

$('.banner').flowtype {
    minimum: 200,
    maximum: 600,
}

$('#myNavbar').flowtype {
    minimum: 200,
    maximum: 1980,
    minFont: 16,
    maxFont: 24
}

$('#myNavbar a').click -> $('#myNavbar').collapse('hide')