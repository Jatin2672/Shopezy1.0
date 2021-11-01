// import ipc renderer
const {ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    
    //declare all the buttons
    const minimize_btn = document.getElementById('minimize_btn')
    const close_btn = document.getElementById('close_btn')
    const maximize_btn = document.getElementById('maximize_btn')
    const login_btn = document.getElementById('login_btn')
    //add event listener to buttons
    minimize_btn.addEventListener('click', () => {
        ipcRenderer.send('welcome:minimize')
    })
    close_btn.addEventListener('click', () => {
        ipcRenderer.send('welcome:close')
    })
    maximize_btn.addEventListener('click', () => {
        ipcRenderer.send('welcome:maximize')
    })
    login_btn.addEventListener('click',() => {
        ipcRenderer.send('go_to_dashboard')
   }) 
})
