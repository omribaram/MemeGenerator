function loadMemesFromStorage(key) {
    var json = localStorage.getItem(key)
    return JSON.parse(json)
}

function saveMemesToStorage(key, data) {
    var json = JSON.stringify(data);
    localStorage.setItem(key, json)
}