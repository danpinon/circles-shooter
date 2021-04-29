class Player{
    constructor(x, y, radius, color){
        this.x = x
        this.y = y
        this.diameter = radius * 2
        this.radius = radius
        this.color = color
    
    }

    style(){
        noStroke()
        fill(this.color)
        circle(this.x, this.y, this.diameter)
    }
}
