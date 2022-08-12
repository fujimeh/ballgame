//main js file
var canvas = document.querySelector('canvas');
var second_canvas = document.getElementById('levelup');
const b = second_canvas.getContext('2d');
const c=canvas.getContext('2d');
canvas.height=innerHeight;
canvas.width=innerWidth;
const restartBtn = document.querySelector('#restartBtn');
const wipebutton = document.querySelector('#wipebutton');

var point = 0;
var enemiesRemaining = 3;
var count = 0;
var numLevel = 1;
var Enemycolor=[
    'purple',
    'green',
    'red',
    'blue'
]
var dropDash = false;
var OneDash = 0;

//Create player
class Player{
    constructor(x, y, radius, color)
    {
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
    }
    draw()
    {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle=this.color;
        c.fill();
    }
}

// const player = new Player(100, 100, 30, 'blue')
// player.draw()
// console.log(player)
//Create projectile
class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
        this.velocity=velocity;
    }
    draw()
    {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle=this.color;
        c.fill();
    }
    update()
    {
        this.draw();
        this.x+= this.velocity.x;
        this.y+= this.velocity.y;
    }
}

class Enemy{
    constructor(x, y, radius, color, velocity, angle, type){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
        this.velocity=velocity;
        this.angle = angle;
        this.type = type
    }
    draw()
    {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle=this.color;
        c.fill();
    }
    update(angle)
    {
        this.draw();
        if(this.type === 'small'){
        this.velocity={
                x: 4*Math.cos(angle),
                y: 4*Math.sin(angle)
            }
        }
        else{
            this.velocity={
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
        }
        this.x+= this.velocity.x;
        this.y+= this.velocity.y;
    }
    
}
class Particle{
    constructor(x, y, radius, color, velocity){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
        this.velocity=velocity;
        this.alpha=1;
    }
    draw()
    {
        c.save();
        c.globalAlpha=this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle=this.color;
        c.fill();
        c.restore();
    }
    update()
    {
        this.draw();
        this.x+= this.velocity.x;
        this.y+= this.velocity.y;
        this.alpha-=0.01;
    }
}
class Abilities {
    constructor(x, y, width, color) {
        this.x = x
        this.y =y;
        this.width = width
        this.color = color
    }
    draw() {
        c.beginPath()
        c.fillStyle = this.colorc.fill()
        c.rect(this.x, this.y, this.width, this.height);
        c.fill();
    }
    update(){
        this.draw()
        this.x = this.x
        this.y = this.y
    }
}
function SpawnEnemies(){
    setInterval(()=>{
        const radius = Math.random()*30+10;
        let x;
        let y;
        if(Math.random()<0.5){
            x=(Math.random()<0.5)? 0-radius : canvas.width+radius;
            y=Math.random()*canvas.height;
        }
        else{
            x=Math.random()*canvas.width;
            y=(Math.random()<0.5)? 0-radius : canvas.height+radius;
        } 
        const color = Enemycolor[Math.floor(Math.random()*Enemycolor.length)];
        const angle = Math.atan2(centerY-y, centerX-x)
        const velocity={
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, radius, color, velocity, angle, 'normal'))
    }, 1000)
}
// function SpawnDash() {
//     const width = 30;
//     let x;
//     let y;
//     const color = white;
//      if
        
// }


function SpawnBigBoss(){
   // setInterval(()=>{
        const radius = 300;
        let x;
        let y;
        if(Math.random()<0.5){
            x=(Math.random()<0.5)? 0-radius : canvas.width+radius;
            y=Math.random()*canvas.height;
        }
        else{
            x=Math.random()*canvas.width;
            y=(Math.random()<0.5)? 0-radius : canvas.height+radius;
        } 
        const color = 'pink';
        const angle = Math.atan2(centerY-y, centerX-x)
        const velocity={
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, radius, color, velocity, angle, 'big'))
   // }, 2000)
}
function SpawnSmallSpeed(){
    // setInterval(()=>{
         const radius = 5
         const type = 'small';
         let x;
         let y;
         if(Math.random()<0.5){
             x=(Math.random()<0.5)? 0-radius : canvas.width+radius;
             y=Math.random()*canvas.height;
         }
         else{
             x=Math.random()*canvas.width;
             y=(Math.random()<0.5)? 0-radius : canvas.height+radius;
         } 
         const color = '#D4AF37';
         const angle = Math.atan2(centerY-y, centerX-x)
         const velocity={
             x: 10*Math.cos(angle),
             y: 10*Math.sin(angle)
         }
         //velocity = velocity * 5.25;
         enemies.push(new Enemy(x, y, radius, color, velocity, angle, 'small'))
    // }, 2000)
 }
//chagne back to 10

function levelText(enemiesRemaining, numLevel){
   
    c.fillStyle = "#A3CDD9";
    c.font = "bold 16px Arial";
    c.fillText("Level", 10, 18);
    c.fillText(numLevel, 60, 18);
    c.fillText("Enemies Remaining", 120, 18);
    
    c.fillText(enemiesRemaining, 280, 18)
    if(isImmune == true) {
        c.fillText("Immunity Activated", 350, 18);
    }
    if(isImmune == false){
        c.fillText("I", 370, 18);
    }

    //if (isImmune == true) {
        //c.fillText("Immunity Cooldown: ", )
    //}

    c.font = "bold 16px Arial"; 
        if(enemiesRemaining <= 0){
            
            c.fillStyle = "white";
            c.fillRect(0, 0, outerWidth, outerHeight);
            //c.fillRect(0, 0, outerWidth, outerHeight);
            console.log("level up!!!!");
            return true;
         
            
        }
}
let animationId;
function animate(){
   
    
    animationId=requestAnimationFrame(animate);
    if(levelText(enemiesRemaining, numLevel)){
        //go to next level
        //cancelAnimationFrame(animationId);
        count++;
        goToNextLevel(count);
        numLevel++;
       
       
    }
    c.fillStyle='rgba(0, 0, 0 ,0.08)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
    movement();
    particles.forEach((particle, particleindex) =>{
        if(particle.alpha<=0)
        {
            particles.splice(particleindex, 1);
        }
        else
        {
            particle.update();
        }
    })
    projectiles.forEach((projectile, index)=>{
        projectile.update();
        if(projectile.x-projectile.radius<0||
            projectile.x-projectile.radius>canvas.width||
            projectile.y+projectile.radius<0||
            projectile.y-projectile.radius>canvas.height)
        {
            setTimeout(()=>
            {
                projectiles.splice(index, 1);
            }, 0)
        }
    })
    enemies.forEach((enemy, index)=>{
        var angle = Math.atan2(player.y-enemy.y, player.x-enemy.x);
        enemy.update(angle);
        const dist = Math.hypot(player.x-enemy.x, player.y-enemy.y);
        if (isImmune == false){
            if(dist - enemy.radius-player.radius<1)
            {
                wipebutton.style.display = 'flex'
                console.log("you die");
                //go();
                //DEATH SCREEN
                cancelAnimationFrame(animationId);
                    // txt.EndTitle.innerHTML = 'YOU LOSE';
                    // document.getElementById('endScreen').style.display = 'block';
                c.fillStyle = "white";
                c.fillRect(0, 0, outerWidth, outerHeight);
                 c.fillStyle = "red";
                 c.font = "bold 20px Arial";
             
                c.fillText("You Died!", centerX -45, centerY - 35);
        
                // canvas.addEventListener('click', function(evt){
                //     var mousePos = getMousePosition(canvas, evt);
                //     if(isInside(mousePos, rect)){
                //         console.log("restart");
                //     }
                // }, false);
            }
        }
        
        projectiles.forEach((projectile, projectileindex)=>{
        const dist = Math.hypot(projectile.x-enemy.x, projectile.y-enemy.y);
        //object touch
        if(dist - enemy.radius-projectile.radius<1)
        {

            for(let i=0; i<enemy.radius-4; i++)
            {
                particles.push(new Particle(projectile.x, projectile.y, 2*Math.random()+2, enemy.color, {
                    x: Math.random()-0.5,
                    y: Math.random()-0.5
                }))
            }
            if(enemy.radius-projectile.radius>10)
            {
                enemy.radius-=projectile.radius;
                setTimeout(()=>
                {
                    
                    projectiles.splice(projectileindex, 1);
                }, 0)
            }
            else
            {
                setTimeout(()=>
                {
                   
                   
                    enemies.splice(index, 1);
                 
                    //point = point + 1
                    enemiesRemaining--;
                    
                    //levelText(point);
                    
                    projectiles.splice(projectileindex, 1);
                    
                }, 0)
                
                //OneDash++;
            }
           
            
        }
        })
    })
    immunity();
}
const centerX = canvas.width/2;
const centerY = canvas.height/2;

let player = new Player(centerX, centerY , 50, '#F2CA50');
player.draw();
let projectiles = [];
let enemies = [];
let particles=[];
const attackCoolDown=false;

function tommyInIt(){
    player = new Player(centerX, centerY , 50, '#F2CA50');
player.draw();
    projectiles = [];
    enemies = [];
    particles=[];
}

addEventListener('click', (event)=>
    {

        if(attackCoolDown==false)
        {
            const angle = Math.atan2(event.clientY-player.y, event.clientX-player.x);
            const velocity={
                x: 5*Math.cos(angle),
                y: 5*Math.sin(angle)
            }
            projectiles.push(
                new Projectile
                (
                    player.x, player.y, 10, 'white',velocity
                )
            )
            attackCoolDown=true
            setInterval(()=>{
                attackCoolDown=false;
            }, 1000)
            // setInterval(attackCoolDown, 1000);
        }
    }
)
// function attackCoolDown() {
//     attackCoolDown = false;
// }

function goToNextLevel(count){

    if(count == 1){
        
        console.log("Approached Level 2");
        SpawnBigBoss();
        SpawnSmallSpeed();
        dropDash = true;
        //if (OneDash == 1) {
        // SpawnDash();
        //}
        enemiesRemaining = 20;
    
        //a.style.display = "block";
        //firstRound.style.display = "none";
        //secondRound.style.display = "block";
        return false;
        
    }
    if(count == 2){
        console.log("Approached Level 3 ");
        SpawnBigBoss();
        SpawnBigBoss();
        enemiesRemaining = 30;
        //secondRound.style.display = "none";
        //thirdRouand.style.display = "block";
        return true;
    }
    
}

const keysPressed = [];
const speed = 6.9;

window.addEventListener('keydown', function(e){
    keysPressed[e.key] = true;   
});

window.addEventListener('keyup', function(e){
    delete keysPressed[e.key];
});
//canvas width =1536
//canvas height = 711   
var isImmune = false;
var coolDown = 0;
const dash = 10;
// function getMousePosition(canvas, event){
//     var rect = canvas.getBoundingClientRect();
//     return{
//         x: event.clientX - rect.left,
//         y: event.clientY - rect.top

//     };

// }
// function isInside(pos, rect){
//     return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
// }
// var rect = {
//     x: 250,
//     y: 350,
//     width: 200,
//     height: 100
// };

//Player Movement
function movement(){
   if(keysPressed['w'] && player.y * 2 > 100){
        player.y = player.y - speed;
    }
    if(keysPressed['a'] && player.x * 2 > 100){
        player.x = player.x - speed;
    }
    if(keysPressed['s'] && player.y < canvas.height - 69){
        player.y = player.y + speed;
    }
    if(keysPressed['d'] && player.x < canvas.width - 69){
        player.x = player.x + speed;
    }
    if (keysPressed['w'] && keysPressed['Shift'] && player.y * 2 > 100) {
        player.y= player.y - speed - dash;
    }
    if (keysPressed['a'] && keysPressed['Shift'] && player.x * 2 > 100) {
        player.x = player.x - speed - dash;
    }
    if (keysPressed['s'] && keysPressed['Shift'] && player.y < canvas.height - 69) {
        player.y = player.y + dash;
    }
    if (keysPressed['d'] && keysPressed['Shift']  && player.x < canvas.width - 69) {
        player.x = player.x + speed + dash;
    }
}

function resetImmune() {
    isImmune = false;
    coolDown = 10;
    for (var d = 0; d < 10; d++) {
    setInterval(coolingDown, 100);
    
    }
}
function immunity(){
         if (keysPressed['i']) {
            isImmune = true;
            setInterval(resetImmune, 1500);
            //coolDownTimer();
        }
}

function go(){
    var txtEndTitle = document.getElementById('txtEndFile');
    var txtEndMessages = document.getElementById('txtEndMessage');
}
function replay(){
    document.getElementById('endscreen').style.display = 'none';
}

function coolingDown() {
    coolDown--;
}


restartBtn.addEventListener('click', () =>{
    tommyInIt();
    animate(enemiesRemaining);
    SpawnEnemies();
    wipebutton.style.display = 'none'
    
})