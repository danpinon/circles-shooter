
class Enemy {
    constructor(x, y, radius, color, velocity, color2) {
        this.x = x
        this.y = y
        this.diameter = radius * 2
        this.radius = radius
        this.color = color
        this.color2 = color2
        this.velocity = velocity
    }

    style(){                 //method for styling
        noStroke()
        // fill(this.color2)
        // circle(this.x, this.y, this.radius * 2.15)
        alpha(100)
        fill(this.color)
        circle(this.x, this.y, this.radius * 2)
    }

    update(){
        this.style()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
    
    explotion(){
        const burst = new mojs.Burst({
            radius: { 0: 160 },
            count:6,
            x: -(width/2) + this.x + 5,
            y: -(height/2) + this.y + 5,
            children : {
            shape: 'circle',
            fill: this.color,
            opacity: {1: 0},
            radius: {20: 0},
            duration: 500
          }
          }).play()
    }
}
