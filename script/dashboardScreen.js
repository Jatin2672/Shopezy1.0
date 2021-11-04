let expandMenuBtn ,tray , profilepic , menuExpanded = true
window.addEventListener("DOMContentLoaded",() => {

   expandMenuBtn = document.getElementById("expandMenuBtn")
   tray = document.getElementById("tray")
   profilepic = document.getElementById("profilepic")
    expandMenuBtn.addEventListener("click",() => {
        collapseExpandMenu()
    })
    expandMenuBtn.click()
})
function collapseExpandMenu() {
    allSpans = document.getElementById("tray").getElementsByTagName("span")
    if(menuExpanded) {
    // add animation for changing width
    tray.animate([
        {width: "15%"},
        {width: "5%"}
    ],{
        duration: 500,
        fill: "forwards"
    })
    tray.style.width = "5%"
    for(let i = 0 ; i < allSpans.length ; i++) {
        allSpans[i].style.opacity = "0"
        allSpans[i].style.transition = "opacity 0.5s"
        profilepic.style.marginLeft = "10px"
    }
    }else{

    // add animation for changing width
    tray.animate([
        {width: "5%"},
        {width: "15%"}
    ],{
        duration: 500,
        fill: "forwards"
    })

    tray.style.width = "15%"
        for(let i = 0 ; i < allSpans.length ; i++) {
            allSpans[i].style.opacity = "1"
            allSpans[i].style.transition = "opacity 0.5s"
            profilepic.style.marginLeft = "0px"
        }
    }
    menuExpanded = !menuExpanded
}