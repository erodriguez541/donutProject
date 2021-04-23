const apiData = {
    url: '',
    type: '',
    id: ,
}

const {url, type, id} = apiData

const apiData = `${url}${type}/${id}`

fetch(apiUrl)
    .then( (data) => {
        if(data.ok){
            return data.json()
        }
        throw new Error('Response not ok.'); 
    })
    .then(  => generateHtml())
    .catch( error => console.error('Error:', error))


const generateHtml = (data) => {
    console.log(data)
    const html = `
        <div class="name">${data.name}</div>
        <img src=${data.sprites.front_default}>
        <div class="details">
            <span>Height: ${data.height}</span>
            <span>Weight: ${data.weight}</span>
        </div>
    `
    const donutDiv = document.querySelector('')
    donutDiv.innerHTML = html