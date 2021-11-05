let expandMenuBtn,
    tray,
    profilepic,
    menuExpanded = true,
    close_btn, minimize_btn, maximize_btn
    ,AndroidConnect, DBcontent, QRscreen,
    CloseHTC ;
const { ipcRenderer } = require("electron");
window.addEventListener("DOMContentLoaded", () => {
    expandMenuBtn = document.getElementById("expandMenuBtn");
    tray = document.getElementById("tray");
    close_btn = document.getElementById("close_btn");
    minimize_btn=document.getElementById("minimize_btn");
    maximize_btn=document.getElementById("maximize_btn");
    profilepic = document.getElementById("profilepic");
    
    AndroidConnect = document.getElementById("Connect_btn");
    DBcontent = document.getElementById("contents");
    QRscreen = document.getElementById("blur_bg");
    CloseHTC = document.getElementById("close_btn_htc");

    minimize_btn.addEventListener("click", () => {
        ipcRenderer.send("dashboard:minimize");
    });
    close_btn.addEventListener("click", () => {
        ipcRenderer.send("dashboard:close");
    });
    maximize_btn.addEventListener("click", () => {
        ipcRenderer.send("dashboard:maximize");
    });
    expandMenuBtn.addEventListener("click", () => {
        collapseExpandMenu();
    });
    expandMenuBtn.click();
//  android connect
    AndroidConnect.addEventListener('click',() =>{
        // DBcontent.style.display="none";
        QRscreen.style.display="flex";
    })
    
    CloseHTC.addEventListener('click',() =>{
        // DBcontent.style.display="flex";
        QRscreen.style.display="none";
    })

});
function collapseExpandMenu() {
    allSpans = document.getElementById("tray").getElementsByTagName("span");
    if (menuExpanded) {
        // add animation for changing width
        tray.animate([{ width: "15%" }, { width: "5%" }], {
            duration: 500,
            fill: "forwards",
        });
        tray.style.width = "5%";
        for (let i = 0; i < allSpans.length; i++) {
            allSpans[i].style.opacity = "0";
            allSpans[i].style.transition = "opacity 0.5s";
            profilepic.style.marginLeft = "10px";
        }
    } else {
        // add animation for changing width
        tray.animate([{ width: "5%" }, { width: "15%" }], {
            duration: 500,
            fill: "forwards",
        });

        tray.style.width = "15%";
        for (let i = 0; i < allSpans.length; i++) {
            allSpans[i].style.opacity = "1";
            allSpans[i].style.transition = "opacity 0.5s";
            profilepic.style.marginLeft = "0px";
        }
    }
    menuExpanded = !menuExpanded;
}


