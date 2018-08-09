function attachEvents() {
    const URL = 'https://baas.kinvey.com/appdata/kid_rkSyHHoVX'
    const USERNAME = 'peter'
    const PASSWORD = 'p'
    const BASE_64 = btoa(USERNAME + ':' + PASSWORD)
    const AUTH = {'Authorization': 'Basic ' + BASE_64}

    $('#btnLoadPosts').on('click', loadPosts)
    $('#btnViewPost').on('click', viewPost)

    function viewPost() {
        let selected = $(':selected')
        $('#post-comments').empty()
        function getPost() {
            return $.ajax({
                method: 'GET',
                url: URL + `/posts/${selected[0].value}`,
                headers: AUTH
            })
        }

        function getComm() {
            return $.ajax({
                method: 'GET',
                url: URL + `/comments/?query={"post_id":"${selected[0].value}"}`,
                headers: AUTH
            })
        }

        Promise.all([ getPost(),getComm()]).then((res) => {
            $('#post-title').text(`${res[0].title}`)
            $('#post-body').text(`${res[0].body}`)

            for (let comm of res[1]) {
                $('#post-comments').append($('<li>').text(comm.text));
            }


        }).catch((err) => {
            console.log(err);
        })

    }

    function loadPosts() {
        $('#posts').empty()
        $.ajax({
            method: 'GET',
            url: URL + '/posts',
            headers: AUTH
        }).then(function (res) {
            for (let post of res) {
                $('#posts').append($(`<option value="${post._id}">${post.title}</option>`))
            }
        }).catch(function (err) {
            console.log(err);
        })
    }

}