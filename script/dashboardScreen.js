let expandMenuBtn ,tray , profilepic , menuExpanded = true
window.addEventListener("DOMContentLoaded",() => {

   expandMenuBtn = document.getElementById("expandMenuBtn")
   tray = document.getElementById("tray")
   profilepic = document.getElementById("profilepic")

    expandMenuBtn.addEventListener("click",() => {
        collapseExpandMenu()
    })
})
function collapseExpandMenu() {
    allSpans = document.getElementById("tray").getElementsByTagName("span")
    if(menuExpanded) {
           tray.style.width = "5%"
    for(let i = 0 ; i < allSpans.length ; i++) {
        allSpans[i].style.display = "none"
        profilepic.style.marginLeft = "10px"

    }
    }else{
        tray.style.width = "15%"
        for(let i = 0 ; i < allSpans.length ; i++) {
            allSpans[i].style.display = "block"
            profilepic.style.marginLeft = "0px"
        }
    }
    menuExpanded = !menuExpanded
}