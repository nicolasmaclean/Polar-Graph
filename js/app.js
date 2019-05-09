var canvas = document.getElementById('canvas');
const colors = ["#0A08FF", "#0457E8", "#06BCFF", "#5D04E8", "#C505FF"];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var w = 75;

var mouse = {
    x: canvas.width/2,
    y: canvas.height/2
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function getRandomColor(){
    return colors[Math.floor(Math.random()*colors.length)];
}

function r(theta){
    // return equation;
    return 2*Math.sin(4*theta);
}

function Circle(x, y, velocity, radius, radian, color) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radian = radian;
    this.velocity = velocity;
    this.origin = {
        x: canvas.width/2,
        y: canvas.height/2
    }

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        this.x = this.origin.x + (r(this.radian))*(Math.cos(this.radian))*w;
        this.y = this.origin.y + (r(this.radian))*(Math.sin(this.radian))*w;
        if(this.radian === 100)
            this.radian = 0;
        this.radian += velocity;
        
        this.draw();
    }  
}

var circles = [];

function init(){

    circles = [];
    var radius = 10;
    var x = canvas.width/2;
    var y = canvas.height/2;
    var color = getRandomColor();
    var radian = 0;
    var velocity = .025;

    for(var i = 0; i < 10; i++){
        circles.push(new Circle(x, y, velocity, radius, radian-.01*i, color));
    }

    if(canvas.height < canvas.width){
        w = canvas.height/5;
    } else {
        w = canvas.width/5;
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(255, 255, 255, 0.05)";
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);

    for(var i = 0; i < circles.length; i++){
        circles[i].update();
    }
}

init();
animate();