function attachEvents(){
    const locationsURL = 'https://judgetests.firebaseio.com/locations.json'
    const forecastURL = 'https://judgetests.firebaseio.com/forecast/'
    const forecastDiv = $('#forecast')
    const todaysDiv = $('#current')
    const upcomingDiv = $('#upcoming')
    const town = $('#location')
    const symbols = {
        Sunny:'&#x2600', // ☀
        Partlysunny:'&#x26C5', // ⛅
        Overcast:'&#x2601', // ☁
        Rain:'&#x2614', // ☂
        degrees:'&#176'   // °

}

    $('#submit').on('click',getLocation)

    function getLocation() {
        forecastDiv.css('display','none')
        $('.condition').empty()

        upcomingDiv.empty()
        upcomingDiv.append($('<div class="label">Three-day forecast</div>'))

        $.ajax({
            method:"GET",
            url:locationsURL
        }).then(getForecast).catch(handleError)
    }

    function getForecast(res) {
        let code = (function () {
            for (let loc of res) {
                if (loc.name === town.val()){
                    return loc.code
                }
            }
        })()

        let todaysForecastRequest = function () {
            return $.ajax({
                method:"GET",
                url:forecastURL + `today/${code}.json`
            })
        }
        let upcomingForecastRequest = function () {
            return $.ajax({
                method:"GET",
                url:forecastURL + `upcoming/${code}.json`
            })
        }


        Promise.all([todaysForecastRequest(),upcomingForecastRequest()])
            .then(populatePage)
            .catch(handleError)



        function populatePage(res) {
            let today = res[0]
            let upcoming = res[1].forecast;

            let conditionsSpan = $('<span class="condition">')
            forecastDiv.css('display','')

            todaysDiv.append($(`<span class="condition symbol">${symbols[today.forecast.condition]}</span>`))

            let nameSpan = $('<span class="forecast-data">')
            nameSpan.text(`${today.name}`)

            let temperatureSpan = $('<span class="forecast-data">')
            temperatureSpan.html(`${today.forecast.low}${symbols.degrees}/${today.forecast.high}${symbols.degrees}`)

            let forecastSpan = $('<span class="forecast-data">')
            forecastSpan.text(`${today.forecast.condition}`)

            nameSpan.appendTo(conditionsSpan)
            temperatureSpan.appendTo(conditionsSpan)
            forecastSpan.appendTo(conditionsSpan)

            conditionsSpan.appendTo(todaysDiv)

            //`${today.forecast.low}${symbols.degrees}/${today.forecast.high}${symbols.degrees}`


            for (let obj of upcoming) {
                let upcomingSpan = $('<span class="upcoming">')

                let symbol = $(`<span class="symbol">${symbols[obj.condition.replace(/\s/g, '')]}</span>`)
                upcomingSpan.append(symbol)

                let temp = $('<span class="forecast-data">')
                temp.html(`${obj.low}${symbols.degrees}/${obj.high}${symbols.degrees}`)
                upcomingSpan.append(temp)

                let weather = $('<span class="forecast-data">')
                weather.text(`${obj.condition}`)
                upcomingSpan.append(weather)

                upcomingDiv.append(upcomingSpan)
            }


        }

    }


    function handleError() {
        $('.label').text('Error')
        forecastDiv.css('display','')

    }


}