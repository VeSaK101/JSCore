class PublicTransportTable{
    constructor(townName){
       $('table caption').text(`${townName}'s Public Transport`)
        this.addEventListeners()
    }
    addVehicle(vehicleObj){
        let type = vehicleObj.type
        let name = vehicleObj.name
        let tbody =  $('tbody[class="vehicles-info"]')
        let tr = $('<tr>').attr('class','hide-info')
        let button = $('<button>More Info</button>')
        button.on('click',function () {
            if (button.text() === 'More Info'){
                button.text('Less Info')
                let infoTr = $('<tr class="more-info">')
                let td = $('<td colspan="3">')
                let table = $('<table>')
                let body = $('<tbody>')

                body.append($('<tr>').append($('<td>').text(`Route: ${vehicleObj.route}`)))
                body.append($('<tr>').append($('<td>').text(`Price: ${vehicleObj.price}`)))
                body.append($('<tr>').append($('<td>').text(`Driver: ${vehicleObj.driver}`)))
                table.append(body)
                td.append(table)
                infoTr.append(td)
                $(this).parent().parent().after(infoTr)
                $(this).parent().parent().attr('class','show-info')
            }
            else{
                button.text('More Info')
                $(this).parent().parent().next().remove();
                $(this).parent().parent().attr('class','hide-info')
            }
        })
        tr.append($(`<td>${type}</td>`))
        tr.append($(`<td>${name}</td>`))
        tr.append($(`<td>`).append(button))
        tbody.append(tr)
    }
    addEventListeners(){
        $('.search-btn').on('click',function () {
            let typeField = $('input[name="type"]')
            let nameField = $('input[name="name"]')
            let typeVal = typeField.val()
            let nameVal = nameField.val()

            if (typeVal || nameVal){
                let rows = $('.vehicles-info > tr').not($('.more-info'))
                for (let i = 0; i < rows.length; i++) {
                    let firstChild = $(rows[i]).find('td').eq(0)
                    let secondChild = $(rows[i]).find('td').eq(1)
                    if(!firstChild.text().includes(typeVal) || !secondChild.text().includes(nameVal)) {
                        $(rows[i]).css('display', 'none')
                        let button = $(rows[i]).find('td').eq(2).find('button')
                        if (button.text() === 'Less Info') {
                            button.click()
                        }
                    } else {
                        $(rows[i]).css('display', '')
                    }

                }
            }
        })
        $('.clear-btn').on('click',function () {
            $('input[name="type"]').val('')
            $('input[name="name"]').val('')
            $('.vehicles-info *').css('display','')
        })
    }
}
