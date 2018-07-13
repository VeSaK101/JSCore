class PaymentManager {
    constructor(title) {
        this.caption = $(`<caption>${title} Payment Manager</caption>`)
    }

    render(id) {
        let table = $('<table>')
        table.append(this.caption)
        table.append($('<thead>\n' +
            '<tr>' +
            '<th class="name">Name</th>' +
            '<th class="category">Category</th>' +
            '<th class="price">Price</th>' +
            '<th>Actions</th>' +
            '</tr>' +
            '</thead>'))

        let addBtn = $('<button>Add</button>')
        let deleteBtn = $('<button>Delete</button>')

        let tbody = $('<tbody class="payments">')

        let tfootTR = $('<tr>' +
            '<td><input name="name" type="text"></td>' +
            '<td><input name="category" type="text"></td>' +
            '<td><input name="price" type="number"></td></tr>')

        tfootTR.append($('<td>').append(addBtn))

        let tfoot = $('<tfoot class="input-data">')

        addBtn.on('click',function () {
            let nameElement = $(`#${id} input[name="name"]`)
            let categoryElement = $(`#${id} input[name="category"]`)
            let priceElement = $(`#${id} input[name="price"]`)

            if (nameElement.val() && categoryElement.val() && priceElement.val()){
                let tbodyTr = $('<tr>' +
                    `<td>${nameElement.val()}</td>` +
                    `<td>${categoryElement.val()}</td>` +
                    `<td>${(Number(priceElement.val())*100)/100}</td></tr>`)
                let delBtn = $('<button>Delete</button>')
                delBtn.on('click',function () {
                    delBtn.parent().parent().remove()
                })
                tbodyTr.append($('<td>').append(delBtn))

                tbody.append(tbodyTr)

                nameElement.val('')
                categoryElement.val('')
                priceElement.val('')
            }
        })


        table.append(tbody)
        tfoot.append(tfootTR)
        table.append(tfoot)

        $(`#${id}`).append(table)
    }
}


