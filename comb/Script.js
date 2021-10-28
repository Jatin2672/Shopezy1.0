const login_card = document.getElementById("login_card")
const new_acc = document.getElementById("New_acc")
const reg_btn = document.getElementById("register")
const already = document.getElementById("already")


reg_btn.addEventListener("click", () => {
    login_card.style.display = "none"
    new_acc.style.display = "flex"
    // Added basic animation keyframe
    // login_card.animate([
    //     { opacity: '1' },
    //     { transform: 'translateX(0px)' },
    //     { transform: 'translateX(60px)' },
    // ], {
    //     duration: 1000
    // })

    // new_acc.animate([
    //     { opacity: '0' },
    //     { transform: 'translateX(60px)' },
    //     { transform: 'translateX(0px)' },
    // ], {
    //     duration: 500
    // })


})