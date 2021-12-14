console.log('js file loaded client side')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''

    //console.log(location)

    fetch('http://localhost:3000/weather?location='+ location).then((response) =>{
        response.json().then((data)=> {
            if (data.error){
                messageOne.textContent = data.error
                console.log(data.error)
            } else {
                messageOne.textContent = data.location
                console.log(data.location)
                messageTwo.textContent = data.forcast
                console.log(data.forcast)
            }
        
    })
})
})