// fetch('https://puzzle.mead.io/puzzle').then(function(response){
//     response.json().then(function(data){
//         console.log(data)
//     })
// })


// fetch('http://localhost:3000/weather?address=Lahore').then(function(response){
//     response.json().then(function(data){
//         if(data.error) {
//            console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const formData = document.querySelector('form')
const search = document.querySelector('input')
const errorMessagae = document.querySelector('#errorMessage')
const successMessagae = document.querySelector('#successMessage')

formData.addEventListener('submit', function(e){
    e.preventDefault()
    const location = search.value

    fetch('/weather?address='+location).then(function(response){
        response.json().then(function(data){
            if(data.error) {
                errorMessagae.textContent = data.error
                successMessagae.textContent = ''
                // console.log(data.error)
            } else {
                successMessagae.textContent = data.location + ': ' + data.forecast
                errorMessagae.textContent = ''
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })
})