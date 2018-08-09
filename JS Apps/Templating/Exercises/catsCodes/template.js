(async function () {
    const catHtml = await $.get('./templates/catTemplate.hbs')
    const catTemplate = Handlebars.compile(catHtml)
    for (let cat of window.cats) {
        let res = catTemplate(cat)
        $('#allCats').append(res)

    }

    $('.btn-primary').on('click',function () {
        let codeDiv = $(this).parent().children()[1]
        $(codeDiv).toggle()
        $(this).text(function(i, text){
            return text === "Show status code" ? "Hide status code" : "Show status code";
        })
    })

})()
