const axios = require('axios');
var validUrl = require('valid-url');

const visited = []
const backlog_url = []

exports.url_parse = async function (url) {
    backlog_url.push(url)
    while (backlog_url.length) {
        await getURLsFromURI(backlog_url.pop())
    }
}

const getHostname = (url) => {
    return new URL(url).hostname;
}


const getURLsFromURI = async (url) => {
    if (!(visited.includes(url))) {
        try {
            const { data } = await axios.get(url);
            visited.push(url)
            console.log(url)
            html_garbage = data.split(" ")
            url_garbage = html_garbage.filter(validUrl.isUri)
            sanatise_url = url_garbage.filter(contains(getHostname(url)))
            backlog_url.push(...sanatise_url)
        } catch (error) {
            throw error;
        }
    }
};

const contains = url => (element, index, array) => {
    return element.includes(url);
}
