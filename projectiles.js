class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.diameter = radius * 2
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    style(){
        noStroke()
        fill(this.color)
        circle(this.x, this.y, this.diameter)
    }

    update(){
        this.style()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}






