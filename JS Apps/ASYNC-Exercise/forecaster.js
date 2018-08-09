function attachEvents() {
    $.ajax({
        method:"GET",
        url: 'https://judgetests.firebaseio.com/locations.json'
    }).then(function (res) {
        for (let obj of res) {
            
        }
    })
}