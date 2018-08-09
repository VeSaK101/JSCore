function attachEvents() {
    const loadBtn = $('.load')
    const addBtn = $('.add')
    const baseURL = 'https://baas.kinvey.com/appdata/kid_SJVA82pEQ/biggestCatches'
    const BASE_64 = btoa('admin:admin')
    const AUTH = {'Authorization': 'Basic ' + BASE_64}
    const CATCHES = $('#catches')
    const anglerIn = $('#addForm .angler')
    const weightIn = $('#addForm .weight')
    const speciesIn = $('#addForm .species')
    const locationIn = $('#addForm .location')
    const baitIn = $('#addForm .bait')
    const captureTimeIn = $('#addForm .captureTime')


    loadBtn.on('click', loadCatches)
    addBtn.on('click', addCatch)

    function addCatch() {
        if (anglerIn.val() && weightIn.val() && speciesIn.val() && locationIn.val() && baitIn.val() && captureTimeIn.val()){

            $.ajax({
                method:"POST",
                url:baseURL,
                headers:AUTH,
                data:{"angler":anglerIn.val(),
                    "weight":weightIn.val(),
                    "species":speciesIn.val(),
                    "location":locationIn.val(),
                    "bait":baitIn.val(),
                    "captureTime":captureTimeIn.val()}
            })

            anglerIn.val('')
            weightIn.val('')
            speciesIn.val('')
            locationIn.val('')
            baitIn.val('')
            captureTimeIn.val('')
        }
    }

    function update() {
        let currId = $(this).parent().attr('data-id')
        let currAngler = $(this).parent().find('input.angler').val()
        let currWeight = $(this).parent().find('input.weight').val()
        let currSpecies = $(this).parent().find('input.species').val()
        let currLocation = $(this).parent().find('input.location').val()
        let currBait = $(this).parent().find('input.bait').val()
        let currCaptureTime = $(this).parent().find('input.captureTime').val()

        $.ajax({
            method:"PUT",
            url:baseURL + '/' + currId,
            headers:AUTH,
            data:{"angler":currAngler,
                "weight":currWeight,
                "species":currSpecies,
                "location":currLocation,
                "bait":currBait,
                "captureTime":currCaptureTime}
        }).catch(function (err) {
            console.log(err);
        })
    }

    function del() {
        let currId = $(this).parent().attr('data-id')
        $.ajax({
            method:"DELETE",
            url:baseURL + '/' + currId,
            headers:AUTH
        }).then(function () {
            $(CATCHES).find($(`[data-id="${currId}"]`)).remove()
        })
    }

    function loadCatches() {

        $.ajax({
            method: "GET",
            url: baseURL,
            headers: AUTH
        }).then(function (res) {
            CATCHES.empty()

            for (let obj of res) {
                let updateBtn = $('<button class="update">Update</button>')
                let delBtn = $('<button class="delete">Delete</button>')
                updateBtn.on('click',update)
                delBtn.on('click',del)

                let template =
                    $(`  <div class="catch" data-id="${obj._id}">
                            <label>Angler</label>
                            <input type="text" class="angler" value="${obj.angler}"/>
                            <label>Weight</label>
                            <input type="number" class="weight" value="${obj.weight}"/>
                            <label>Species</label>
                            <input type="text" class="species" value="${obj.species}"/>
                            <label>Location</label>
                            <input type="text" class="location" value="${obj.location}"/>
                            <label>Bait</label>
                            <input type="text" class="bait" value="${obj.bait}"/>
                            <label>Capture Time</label>
                            <input type="number" class="captureTime" value="${obj.captureTime}"/>
                        </div>`)

                template.append(updateBtn)
                template.append(delBtn)

                CATCHES.append(template)
            }
        }).catch(function (err) {
            console.log(err);
        })
    }
}


