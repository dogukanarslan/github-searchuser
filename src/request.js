const apiURL = 'https://api.github.com'

const request = async (url, params, method = 'GET') => {
    let options = { method }

    if (method === 'GET') {
        if (params) {
            url += `?${params}`
        }
    }

    if (method === 'POST') {
        options.body = JSON.stringify(params)
    }

    let response = await fetch(apiURL + url, options)
    response = await response.json()

    return response
}

export const get = (url, params) => {
    return request(url, params, 'GET')
}

export const post = (url, params) => {
    return request(url, params, 'POST')
}
