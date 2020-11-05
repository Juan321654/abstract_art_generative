const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//add event listener to when clicked switches  effect
const effect1 = document.getElementById('effect1')
const effect2 = document.getElementById('effect2')
const effect3 = document.getElementById('effect3')
const effect4 = document.getElementById('effect4')
const effect5 = document.getElementById('effect5')


effect1.addEventListener("click", function(){
  ctx.globalCompositeOperation = 'luminosity';
})

effect2.addEventListener("click", function(){
  ctx.globalCompositeOperation = 'color'; 
})

effect3.addEventListener("click", function(){
  ctx.globalCompositeOperation = 'xor';
})

effect4.addEventListener("click", function(){
  ctx.globalCompositeOperation = 'soft-light';
})

effect5.addEventListener("click", function(){
  ctx.globalCompositeOperation = 'color-burn';
})



// ctx.globalCompositeOperation = 'lighter';
// ctx.globalCompositeOperation = 'xor';
// ctx.globalCompositeOperation = 'destination-over';
// ctx.globalCompositeOperation = 'source-over';
// ctx.globalCompositeOperation = 'screen';
// ctx.globalCompositeOperation = 'overlay';
// ctx.globalCompositeOperation = 'darken';
// ctx.globalCompositeOperation = 'color-dodge';
// ctx.globalCompositeOperation = 'color-burn';
// ctx.globalCompositeOperation = 'hard-light';             //cool one
// ctx.globalCompositeOperation = 'soft-light';
// ctx.globalCompositeOperation = 'difference';
// ctx.globalCompositeOperation = 'exclusion';
// ctx.globalCompositeOperation = 'hue';
// ctx.globalCompositeOperation = 'saturation';
// ctx.globalCompositeOperation = 'color';
// ctx.globalCompositeOperation = 'luminosity';


//this determines the radius around the mouse for the particles to be created.
//and makes it seem smaller or larger
const edge = 100; 
let drawing = false;
//mouse interaction
const mouse = {
  x: null,
  y: null
}

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  // console.log(mouse.x);
})

//this is just being called root because the animation looks like roots growing.
class Root {
  constructor(x, y, color, centerX, centerY){
    this.x = x;
    this.y = y;
    this.color = color;
    this.speedX = 0;     //this will determine how fast the particles move
    this.speedY = 0;
    this.centerX = centerX;
    this.centerY = centerY;
  }
  draw() {
    this.speedX += (Math.random() - 0.5) / 2;
    this.speedY += (Math.random() - 0.5) / 2;
    this.x += this.speedX;
    this.y += this.speedY;

    const distanceX = this.x - this.centerX;
    const distanceY = this.y - this.centerY;
    //The Pythagorean Theorem
    const distance = Math.sqrt(distanceX * distanceX + distanceX * distanceY * distanceY);
    //change "edge / 10" to some other number  to get different length of the root tails
    const radius = (-distance / edge + 1) * edge / 10;

    if (radius > 0) {
      //the bind is to tell JS to attach the current context because draw is out of scope for the branchout function
      requestAnimationFrame(this.draw.bind(this));
      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      //this changes the color of the stroke that is around the roots
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
  }
}

function branchOut(){
  if(drawing === true) {
    //this is when the dots first appear
    const centerX = mouse.x;
    const centerY = mouse.y;
    //then it grows 3 roots from the center point
    for(let i = 0; i < 5; i++) {
      //this creates a new instance of the object created before, x, y, color, centerX, centerY
      //also  the constructor expect 5 attributes, and the order matters.
      //also change the color here
      const root = new Root(mouse.x, mouse.y, 'pink', centerX, centerY);
      root.draw();
    }
  }
}
//this is to prevent stretching and distorting the roots when the window is resized.
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', function(){
  //fillStyle and fillRect make the roots disappear
  // ctx.fillStyle = 'rgba(255,255,255,0.03)';
  // ctx.fillRect(0,0, canvas.width, canvas.height);
  branchOut();
})

window.addEventListener('mousedown', function(){
  drawing = true;
})

window.addEventListener('mouseup', function(){
  drawing = false;
})
