var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c står for context
var c = canvas.getContext('2d');

// fillRect har har 4 parametere x, y, width, heigth
// det starter fra toppen venstre 
// firkant
// c.fillStyle = 'blue'
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'pink'
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'green'
// c.fillRect(300, 300, 100, 100);
// linje
// moveto og lineto har x, y som parametere og er i px
// der kommer først en linje når man kalder stroke
// for at tilføre farve skal der være en strokestyle
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(300, 100);
// c.lineTo(300, 100);
// c.lineTo(300, 400);
// c.strokeStyle = "blue"
// c.stroke()

// arc bruger man til at laver cirkler med
// den har x, y, radius, startvinkel, endvinkel, og retning. 
// (med eller mod uret). Den tager ikke grader men radian
// hvis vi ikke starter med beginmath, starter den fra sidste linje

// c.beginPath();
// c.arc(400,500,30, 0, Math.PI*2, false);
// c.strokeStyle="red";
// c.stroke();

// for at lave mange skal der være en for loop
// for at gentage 3 gange:
// for at få den forstellige steder skal der laves var
// til x og y kordinaterne og ganger med widte og højte
// for at de ikke bare er i øverst venstre hjørne
// for (var i = 0; i < 100; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = "red";
//     c.stroke();
// }

// animation:

// bliver udregnet på afstanden på afstanden mellem mus og cirkel
var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 70;
var minRadius = 2;
var colorArray = [
    '#82B8D9',
    '#9BDAF2',
    '#1FAFBF',
    '#B2BF50',
    '#BF814B'
];

window.addEventListener('mousemove',
    function (event) {
        // console.log(event)
        mouse.x = event.x;
        mouse.y = event.y;
        // console.log(mouse)
    }
)

// for at bevare fuld størrelse på skærmen når browseren ændre størrelse
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    // her vælger vi en tilfældig farve fra arryet enten 0,1,2,3,4
    // math.floor vælger det nærmeste hele nummer, så det vælger fra arrylisten og ikke
    // et tilfældigt tal
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "black";
        c.fillStyle = this.color;
        c.fill();
        c.stroke();

    }
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interarktivitet med mouse
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {

            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();

    }
}

var cirkleArray = [];
function init() {

    cirkleArray=[];
    // // vi laver et loop

    for (var i = 0; i < 800; i++) {
        // her laver vi et tilfældigt størrelse radius til cirklerne
        // 
        var radius = Math.random() * 3 + 4;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);

        cirkleArray.push(new Circle(x, y, dx, dy, radius));
        // var cirkle = new Circle(200, 200,3,3,30);
    }
}
// animation:

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < cirkleArray.length; i++) {
        cirkleArray[i].update();
    }
}
animate();
init();