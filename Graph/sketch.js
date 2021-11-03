let  data , selectedValue = "2 Nov" ,profitValueLabel
window.addEventListener("DOMContentLoaded", ()=> {
    
    profitValueLabel = document.getElementById("profitValue")
    data = { 
        "2 Nov": [2848 , 7654],"3 Nov": [2756 , 8435],"4 Nov": [1912 , 7564],"5 Nov": [1564 , 7986],"6 Nov": [1856 , 8112],
        "7 Nov": [2000 , 8756],"8 Nov": [2341 , 7848]
    }

  
})
// use p5js to draw scatter plot graph

function setup(){
    createCanvas(200 , 120)
    
}
function draw(){
    background("#EEEEEE")
    fill(0)
    stroke(0)
    calcScales()
    profitValueLabel.innerHTML = "₹" + data[selectedValue][0]
    //make line dashed dashed
    setLineDash([1, 2]);
    strokeWeight(1)
    stroke(100 , 100 , 100 , 180)
    line(mouseX , 0 , mouseX , height)
    // line(0 , mouseY , width , mouseY)
    setLineDash([0, 0]);
    fill(0)
    triangle(mouseX , 0 , mouseX+2 , 2 , mouseX-2 , 2)
    triangle(mouseX , height , mouseX+2 , height-2 , mouseX-2 , height-2)
    
}
function calcScales(){
    i = 0 
    lastLastRect = 10
    lastRectHeight = 10
    rectHeight = 0
    noOfKeys = Object.keys(data).length
    Object.keys(data).forEach(key => {
        lastLastRect = lastRectHeight
        lastRectHeight = rectHeight
        rectHeight , rect2Height = calcRectHeight(data[key][0] , data[key][1])
        // set gradient fill
        strokeWeight(0)
        fill(64,135,243 , 200)
        
        gradientRect(i , height , 15 , rectHeight , color(64,135,243 , 255) , color(64,135,243 , 0))
        
        fill(0, 0 , 0)
        textSize(8)
        text(key.slice(0,1) , i+5 , height)
        noFill()
        strokeWeight(1)
        stroke("#0175ff")
        translate(15,0)
        if(i%60 == 0){
        bezier(i-65 , height+lastLastRect , i-35 , height+lastRectHeight, i-35 , height+lastRectHeight , i-5 , height+rectHeight)
        }
        if(i == 180){
            line(i-5 , height+rectHeight, width , height+rectHeight)
        }
        translate(-15,0)
        i+=30
        stroke(0)
        if(mouseX < i-15 && mouseX > i-30){
            selectedValue = key
            fill(0 , 0 , 200, random(100,255))
            strokeWeight(0)
            ellipse(i-22 , height+rectHeight , random(4,5) , random(4,5))
        }
    })
}

function calcRectHeight(value , value2){
    profit = []
    sell = []
    Object.keys(data).forEach(key => {
        profit.push(data[key][0])
        sell.push(data[key][1])
    })
    maxProfit = Math.max(...profit)
    minProfit = Math.min(...profit)
    rectHeight = -map(value , minProfit , maxProfit ,20, height-20)
    rect2Height = -map(value2 , minProfit , maxProfit ,20, height-20)
    return rectHeight , rect2Height
}
function setLineDash(list) {
    drawingContext.setLineDash(list);
}
function gradientRect(x , y , w , h , c1 , c2){
    for(let i = 10 ; i >= 0 ; i--){
        fill(lerpColor(c1 , c2 , (10-i) / 10))
        if(i == 10){
            rect(x , y+(i*h/10) , 15 , -h/10 , 60 , 60 , 0 , 0)
        }else{
            rect(x , y+(i*h/10) , 15 , -h/10)
        }
        
    }
}