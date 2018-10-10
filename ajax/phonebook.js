function attachEvents() {
    let createBtn = $('#btnCreate')
    let loadBtn = $('#btnLoad')
    let baseURL = 'https://phonebook-c3f96.firebaseio.com/phonebook.json'

    createBtn.on('click',createContact)

}