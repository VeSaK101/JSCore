function attachEvents() {
    let townHtml = $('#towns-template').html()
    let townTemplate = Handlebars.compile(townHtml)

    $('#btnLoadTowns').on('click', function () {
        let data = $('#towns').val().split(', ').map(s => s = {town:s})
        console.log(data);

        for (let town of data) {
            let resHtml = townTemplate(town)
            $('#root').append(resHtml)
        }
    })
}