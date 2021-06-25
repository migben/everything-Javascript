const width = 28
const grid = document.querySelector(".grid")
const scoreDisplay = document.getElementById("score")
let squares = []
let score = 0


//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

// creating a board
function createBoard() {
    //for loop 
    for (let i = 0; i < layout.length; i++) {
        //create a square 
        const square = document.createElement('div')
        //put square in grid 
        grid.appendChild(square)
        //put square in squares array
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
        
    }
}
createBoard()


/*
✌
WASD = Up, left, down & right
87 65 83 68
Arrows- up, left, down and right
39 38 37 40
*/ 


// Initial position for my Pacman

let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add('pacman')

function control(e){
    squares[pacmanCurrentIndex].classList.remove('pacman')
    if(e.keyCode === 40 || e.keyCode === 83){
        // down
        if(!squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') && 
            !squares[pacmanCurrentIndex + width].classList.contains('wall') && 
            pacmanCurrentIndex + width < width * width){
            pacmanCurrentIndex += width
        }
    } else if(e.keyCode === 37 || e.keyCode === 65){
        // left
        if(!squares[pacmanCurrentIndex -1].classList.contains('ghost-lair') && 
            !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
            pacmanCurrentIndex % width !== 0){
            pacmanCurrentIndex -= 1
            if(pacmanCurrentIndex === 364){
                pacmanCurrentIndex = 391
            }
        }
    } else if(e.keyCode === 38 || e.keyCode === 87) {
        // up
        if(!squares[pacmanCurrentIndex -width].classList.contains('ghost-lair') && 
            !squares[pacmanCurrentIndex - width].classList.contains('wall') && 
            pacmanCurrentIndex - width >= 0 ){
            pacmanCurrentIndex -= width
        }
    } else if(e.keyCode === 39 || e.keyCode === 68){
        // right
        if(!squares[pacmanCurrentIndex +1].classList.contains('ghost-lair') && 
            !squares[pacmanCurrentIndex +1].classList.contains('wall') && 
            pacmanCurrentIndex % width < width - 1){
            pacmanCurrentIndex += 1
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            } 
        }
    }

    squares[pacmanCurrentIndex].classList.add('pacman')
    pacDotEaten()
}

document.addEventListener('keyup', control)

function pacDotEaten(){
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score += 10
        scoreDisplay.innerHTML = score
    }
}

class Ghost {
    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

// drawing my ghosts

ghosts.forEach(ghost => squares[ghost.startIndex].classList.add(ghost.className))