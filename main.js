
const width = innerWidth
const height = innerHeight
const x = width / 2
const y = height / 2
const projectiles = []
const enemies = []

function setup(){
    createCanvas(width, height)

}

function draw(){
  
   clear()
    player.style()

    projectiles.forEach(projectile => { //calls the class method update for every projectile in the array
        projectile.update()
    })

    enemies.forEach(enemy => { // calls the class method update for evey projectile in the array
        enemy.update()
        collitions(enemy)
    })
    
}


class Player{
    constructor(x, y, radius, color){
        this.x = x
        this.y = y
        this.radius = radius * 2
        this.color = color
    
    }

    style(){
        noStroke()
        fill(this.color)
        circle(this.x, this.y, this.radius)
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius * 2
        this.color = color
        this.velocity = velocity
    }

    style(){
        noStroke()
        fill(this.color)
        circle(this.x, this.y, this.radius)
    }

    update(){
        this.style()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius * 2
        this.color = color
        this.velocity = velocity
    }

    style(){                 //method for styling
        noStroke()
        fill(this.color)
        circle(this.x, this.y, this.radius)
    }

    update(){
        this.style()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}



const player = new Player(x, y, 30, 'blue')
//event listener for all the window expecting a click event
// (no need for window.addEvent... because its implicit)

function shootProjectile(event){
    
    const angle = Math.atan2(event.clientY - height/ 2, event.clientX - width/2)
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    // console.log(angle)
    const projectile = new Projectile(width/ 2, height/2, 5, 'red', velocity)
    projectiles.push(projectile)
   
}

addEventListener('click', shootProjectile)

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
    
    const color = 'green'
    const angle = Math.atan2(height/2 - y, width/2 - x)    //gets the angle of the player to chace him
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    enemies.push(new Enemy(x, y, radius, color, velocity)) 
    }, 1000)
    
}

function collitions(enemy){                                      // handles collitions
    projectiles.forEach( projectile => {
        const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y) //distance between projectile and enemy
        if(dist - enemy.radius - projectile.radius < 1){
            console.log('remove')
        }
    })
}

spawnEnemies()