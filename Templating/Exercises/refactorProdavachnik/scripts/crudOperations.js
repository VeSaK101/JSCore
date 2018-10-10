const BASE_URL = 'https://baas.kinvey.com/'
const APP_KEY = 'kid_H1L2SnHH7'
const APP_SECRET = 'fe7d61ae1bed4ca48713bc8226eb67b9'
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)}
const TABLE_HEAD = $('<tr><th>Title</th>' +
    '<th>Description</th>' +
    '<th>Publisher</th>' +
    '<th>Date Published</th>' +
    '<th>Price</th>' +
    '<th>Actions</th></tr>')


function createAd() {
    let title = $('#formCreateAd input[name="title"]').val()
    let description = $('#formCreateAd textarea[name="description"]').val()
    let publisher = sessionStorage.getItem('username')
    let datePublished = $('#formCreateAd input[name="datePublished"]').val()
    let price = $('#formCreateAd input[name="price"]').val()
    let link = $('#formCreateAd input[name="link"]').val()

    $.ajax({
        method: 'POST',
        url: BASE_URL + 'appdata/' + APP_KEY + '/Ads',
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        data: {link, title, description, publisher, datePublished, price}
    }).then(function (res) {
        let _id = res._id
        let views = 0
        $.ajax({
            method:"POST",
            url: BASE_URL + 'appdata/' + APP_KEY + '/views',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data:{_id,views}
        })
        listAds()
        showInfo('Ad created.')
    }).catch(handleAjaxError)
}

function deleteAd(ad) {
    $.ajax({
        method: "DELETE",
        url: BASE_URL + 'appdata/' + APP_KEY + '/Ads/' + ad._id,
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function () {
        listAds()
        showInfo('Ad deleted.')
    }).catch(handleAjaxError)
}

function loadAdForEdit(ad) {
    showView('viewEditAd')
    $('#formEditAd input[name="title"]').val(ad.title)
    $('#formEditAd textarea[name="description"]').val(ad.description)
    $('#formEditAd input[name="datePublished"]').val(ad.datePublished)
    $('#formEditAd input[name="price"]').val(ad.price)
    $('#formEditAd input[name="id"]').val(ad._id)
    $('#formEditAd input[name="link"]').val(ad.link)
}

function editAd() {
    let title = $('#formEditAd input[name="title"]').val()
    let description = $('#formEditAd textarea[name="description"]').val()
    let datePublished = $('#formEditAd input[name="datePublished"]').val()
    let price = $('#formEditAd input[name="price"]').val()
    let id = $('#formEditAd input[name="id"]').val()
    let link = $('#formEditAd input[name="link"]').val()
    let publisher = sessionStorage.getItem('username')

    $.ajax({
        method: "PUT",
        url: BASE_URL + 'appdata/' + APP_KEY + '/Ads/' + id,
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        data: {title, description, datePublished, price, publisher, link}
    }).then(function () {
        listAds()
        showInfo('Edited successfully.')
    }).catch(handleAjaxError)
}

function count(views,id) {
    $.ajax({
        method:"PUT",
        url: BASE_URL + 'appdata/' + APP_KEY + '/views/' + id,
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        data:{views}
    })
}

function loadAd(ad) {
    $.ajax({
        method:"GET",
        url: BASE_URL + 'appdata/' + APP_KEY + '/views/' + ad._id,
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
    }).then(function (res) {
        let views = Number(res.views)
        let id = ad._id
        views++
        count(views,id)
    }).catch(handleAjaxError)
    let openAd = $('#viewAd')
    openAd.empty()
    openAd.append($(`<img src="${ad.link}" alt="${ad.description}" width="200" height="100">`))
        .append($('<div>Title:</div>'))
        .append($(`<div><h1>${ad.title}</h1></div>`))
        .append($(`<div>Description:</div>`))
        .append($(`<div>${ad.description}</div>`))
        .append($(`<div>Publisher:</div>`))
        .append($(`<div>${ad.publisher}</div>`))
        .append($(`<div>Date:</div>`))
        .append($(`<div>${ad.datePublished}</div>`))


    showView('viewAd')
}

function listAds() {
    $.ajax({
        method: "GET",
        url: BASE_URL + 'appdata/' + APP_KEY + '/Ads',
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function (res) {
        let table = $('#ads table')
        showView('viewAds')
        table.empty()
        table.append(TABLE_HEAD)
        for (let ad of res) {
            let title = $(`<td>${ad.title}</td>`)
            let description = $(`<td>${ad.description}</td>`)
            let publisher = $(`<td>${ad.publisher}</td>`)
            let datePublished = $(`<td>${ad.datePublished}</td>`)
            let price = $(`<td>${ad.price}</td>`)
            let tr = $('<tr>')
                .append(title)
                .append(description)
                .append(publisher)
                .append(datePublished)
                .append(price)

            let detailsBtn = $(`<a href="#">[Details]</a>`).on('click', function () {
                loadAd(ad)
            })
            let actions = $(`<td>`).append(detailsBtn)

            if (ad._acl.creator === sessionStorage.getItem("userId")) {

                let delBtn = $(`<a href="#">[Delete]</a>`).on('click', function () {
                    deleteAd(ad)
                })
                let editBtn = $(`<a href="#">[Edit]</a>`).on('click', function () {
                    loadAdForEdit(ad)
                })

                actions.append(delBtn).append(editBtn)

            }
            tr.append(actions)

            table.append(tr)
        }
    }).catch(handleAjaxError)

}

function loginUser() {
    let username = $('#formLogin input[name="username"]').val()
    let password = $('#formLogin input[name="passwd"]').val()

    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/login',
        headers: AUTH_HEADERS,
        data: {username, password}
    }).then(function (res) {
        signInUser(res, 'Login successful.')
    }).catch(handleAjaxError)
}

function registerUser() {
    let username = $('#formRegister input[name="username"]').val()
    let password = $('#formRegister input[name="passwd"]').val()

    $.ajax({
        method: "POST",
        url: BASE_URL + 'user/' + APP_KEY + '/',
        headers: AUTH_HEADERS,
        data: {username, password}
    }).then(function (res) {
        signInUser(res, 'Registration successful.')
    }).catch(handleAjaxError)
}

function logoutUser() {
    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/_logout',
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
    })
    sessionStorage.clear()
    showHomeView()
    showHideMenuLinks()
    $('#loggedInUser').text("")
    showInfo('Logout successful.')
}

function saveAuthInSession(userInfo) {
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
    sessionStorage.setItem('username', userInfo.username)
    sessionStorage.setItem('userId', userInfo._id)
}

function signInUser(res, message) {
    saveAuthInSession(res)
    showHideMenuLinks()
    showHomeView()
    $('#loggedInUser').text("Hello " + res.username + "!")
    showInfo(message)
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response)
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error."
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description
    showError(errorMsg)
}