const apiURL = 'https://api.github.com'

const request = async (url: string, params?: string, method = 'GET') => {
    let options: { method: string; body?: string } = { method }

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

export const get = (url: string, params?: string) => {
    return request(url, params, 'GET')
}

export const post = (url: string, params?: string) => {
    return request(url, params, 'POST')
}
