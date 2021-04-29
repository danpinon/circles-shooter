
const width = innerWidth
const height = innerHeight
const x = width / 2
const y = height / 2
let player = new Player(x, y, 30, 'white')
let projectiles = []
let enemies =     []
let particles =   []
const scoreEl = document.querySelector('#score-el')
const start = document.querySelector('.start')
const startBtnSelec = document.querySelector('#start-btn')
let score = 0
let mouseDown = false
let count = 0
let startGameBtn = false
let ambient = new Audio('./sfx/empty_ambient.mp3')

function init(){
    player = new Player(x, y, 30, 'white')
    projectiles = []
    enemies =     []
    particles =   []
    ambient = new Audio('./sfx/empty_ambient.mp3')
}

function startGame(){
    startBtnSelec.addEventListener('click', startBtn)
    
}

function ambienAudio(){
    ambient.loop = true
    ambient.volume = .70;
    ambient.play()
}

function startBtn(){
    document.querySelector('.container-1').style.display = 'none'
    console.log('go')
    let start = new Audio('./sfx/start-03.mp3')
    start.volume = 0.4
    start.play()
loop()
}

function setup(){
    noLoop()
    startGame()
    startBtnSelec.addEventListener('click', start)
    createCanvas(width, height)
    spawnEnemies()
    
    
}

function draw(){
    ambienAudio()
    background(0, 0, 20, 10)
    player.style()
    
    projectiles.forEach((projectile, index) => { //calls the class method update for every projectile in the array
        projectile.update()
        
        //delete from array lost projectiles from edges of screen
        deleteLostProjectiles(projectile, index)
        
    })

    enemies.forEach((enemy, index)=> { // calls the class method update for evey projectile in the array
        
        enemy.update()
        collitions(enemy, index)
        playerHit(enemy)
    })

    particles.forEach(particle => {
        particle.update()
    })

}
console.log(document)


//event listener for all the window expecting a click event
// (no need for window.addEvent... because its implicit)

addEventListener('mousedown', shootProjectile)
addEventListener('mouseup', mouseUp)


function mouseUp(){
    mouseDown = false
    console.log('up')
}
function shootProjectile(event){
    
    mouseDown = true
    console.log('down')

    const angle = Math.atan2(event.clientY - height/ 2, event.clientX - width/2)
    const velocity = {
        x: Math.cos(angle) * 10,
        y: Math.sin(angle) * 10
    }
    // console.log(angle)
        const projectile = new Projectile(width/ 2, height/2, 10, 'white', velocity)
        let laser = new Audio('./sfx/laser.mp3');
        laser.volume = .30;
        laser.play();

    
    projectiles.push(projectile)
   
}


function spawnEnemies(){
    setInterval(()=>{
    const radius = random(20, 40)

    let x;
    let y;

    if(random() < 0.5) {                                  //needs a 50/50 % chance to spawn an enemy 
        x = random() < 0.5 ? 0 - radius : width + radius  // 50/50 for right or left spawn
        y = random(height)                                // random Y spawn
        
    } else {                                              //the other posibility
        x = random(width)                                 // random X spawn
        y = random() < 0.5 ? 0 - radius : height + radius // 50/50 for top or bottom spawn
    }
    let rand = floor(random(360))
    const color = `hsl(${rand}, 50%, 50%)`
    const color2 = `hsl(${rand+30}, 50%, 40%)`
    const angle = Math.atan2(height/2 - y, width/2 - x)    //gets the angle of the player to chace him
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle) 
    }

    enemies.push(new Enemy(x, y, radius, color, velocity, color2)) 
    }, 1000)
    
}

function collitions(enemy, index){                                      // handles collitions
    
    projectiles.forEach( (projectile, projectileIndex) => {
       
        const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y) //distance between projectile and enemy
        

        //when projectiles touh enemy
        if(dist - enemy.radius - projectile.radius < 1){

            //particles when enemy got shot
            // handleParticles(enemy, projectile)

        //shrink size when enemies recieve a shot
        if(enemy.radius - 10 > 10){
            //increase score
            addScore(50)
            //shrink enemy
            let shrink = lerp(enemy.radius, enemy.radius -= 10, 1)
            enemy.explotion()

            let hit = new Audio('./sfx/hit.mp3')
            hit.volume = 0.4
            hit.play()
            
            setTimeout(()=>{

                projectiles.splice(projectileIndex, 1)
            
            }, 0)
        } else {
            //big points score
            addScore(250)
            //set timeout trick for deleting flickering 

            let explotion = new Audio('./sfx/explotion.mp3')
            explotion.volume = 0.4
            explotion.play()

            setTimeout(()=>{
                enemy.explotion()
                enemies.splice(index, 1)
                projectiles.splice(projectileIndex, 1)
            
            }, 0)
        }
            
        }
    })
}

function handleParticles(enemy, projectile){
    for(let i = 0; i < 8 ; i++){
        particles.push(new Particle(
            projectile.x,
            projectile.y, 
            enemy.color, 
            {
                x: random(-0.5, 0.5), 
                y: random(-0.5, 0.5)
            }))
    }
}

function playerHit(enemy){
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

    if(dist - enemy.radius - player.radius < 1){
        noLoop()
        restartBtn()
        ambient.muted = true
        let loose = new Audio('./sfx/loose.mp3')
        loose.volume = 0.1;
        loose.play()
        init()
    }
}
function restartBtn(){
    document.querySelector('.container-1').style.display = ''
    startBtnSelec.innerHTML = 'restart'
    document.querySelector('#big-score').innerHTML = `${score}`
    console.log('end game')
}
function deleteLostProjectiles(projectile, index){ //delete from array lost projectiles from edges of screen
    
    if(
        projectile.x + projectile.radius < 0     ||
        projectile.x - projectile.radius > width ||
        projectile.y + projectile.radius < 0     ||
        projectile.y - projectile.radius > height
        ) {
        setTimeout(()=>{

            projectiles.splice(index, 1)
        
        }, 0)
    }

}

function addScore(points){
    score += points
    scoreEl.innerHTML = ` ${score}`
}

function degreeToHours(angle){
    let degreeToHours = angle/30
    let hour = Math.floor(degreeToHours)
    let decExtract = degreeToHours - hour
    // let decFix = decExtract.toFixed(2)
    let decClean = Number(decExtract) * 100
    let degreeToMins = decClean/1.66
    let min = Math.round(degreeToMins)
    if(hour === 0){
        hour = 12
      }
    if(angle === 0){
        min = 0
    }
    if(hour < 10){
      hour = `0${hour}`
    }
    if(min < 10){
      min = `0${min}`
    }
    console.log(min)
    return(`${hour}:${min}`)
    
  }


