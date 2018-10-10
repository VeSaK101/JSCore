function attachEvents(){
    const submitBtn = $('#submit');
    const refreshBtn = $('#refresh');
    const authorInput = $('#author');
    const messageInput = $('#content');
    const baseURL = 'https://messanger-b360d.firebaseio.com/messanger.json'
    const textArea = $('#messages')

    refreshBtn.on('click',refreshChat)
    submitBtn.on('click',postMessage)
    

    function postMessage() {
        if (authorInput.val() && messageInput.val()){
            $.ajax({
                method:"POST",
                url:baseURL,
                data:JSON.stringify({
                    author: authorInput.val(),
                    content: messageInput.val(),
                    timestamp: Date.now()
                })
            }).then(function () {
                // textArea.append(`${authorInput.val()}: ${messageInput.val()}\n`)
                messageInput.val('')
            }).catch(function (err) {
                console.log(err);
            })
        }
    }


    function refreshChat() {
        textArea.empty()
        $.ajax({
            method:'GET',
            url: baseURL
        }).then(function (res) {
            let sortedMsgs = Object.keys(res).map(i => res[i]).sort((a,b) => {
                return a.timestamp - b.timestamp
            })
            for (let msgObj of sortedMsgs) {
                let result = `${msgObj.author}: ${msgObj.content}\n`
                textArea.append(result)
            }
        }).catch(function (err) {
            console.log(err)
        })
    }
}