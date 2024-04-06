window.addEventListener('load', function () {
    const amenityIds = {};

    $('input[type=checkbox]').change(function () {
        if ($(this).prop('checked'))
            amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
        else
            delete amenityIds[$(this).attr('data-id')];

        if (Object.keys(amenityIds).length === 0)
            $('div.amenities h4').html('&nbsp');
        else
            $('div.amenities h4').text(Object.values(amenityIds).join(', '));
    });

    $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
        if (data.status == 'OK')
            $('#api_status').addClass('available');
        else
            $('#api_status').removeClass('available');
    });

    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({})
    }).done(function (places) {
        for (const place of places) {
            let article = document.createElement('article');
            article.innerHTML = `
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
                </div>
                    <div class="user">
                        <b>Owner:</b> ${place.name}
                    </div>
                    <div class="description">
                    ${place.description}
                </div>
            `;
            $('section.places').append(article);
        }
    });
});
