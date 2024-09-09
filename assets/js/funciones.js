export const peticionFetch = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(data => data.json())
            .then(async response => {
                resolve(response)
            }).catch(error => {
                reject(`Error: ${error}`)
            })
    })
}

export const ajax = (url) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: "GET",
            data: {},
            success: function(response) {
                resolve(response)
            },
            error: function(error) {
                reject(error)
            }
        })
    })
}