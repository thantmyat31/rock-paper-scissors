const signs = document.querySelectorAll('.js-btn-selection .far');
const rpsArray = ["rock", "paper", "scissors"];
let result = '';
let playerSelection = '';
let playerWin = 0;
let computerWin = 0;

// Get the value for player and start the game play
signs.forEach(function(item) {
    item.addEventListener('click', function(e) {
        playerSelection = e.target.dataset.sign.toLowerCase();
        playRound(playerSelection, computerPlay());
    });
});

// Generate a value for computer
function computerPlay() {
    const index = Math.floor(Math.random() * 3);
    return rpsArray[index];
}

function playRound(playerSelection, computerSelection) {

    // Re-styling the DOM and show hand signs
    document.querySelector('.compete.player .fas').className = 'fas fa-hand-' + playerSelection;
    document.querySelector('.compete.computer .fas').className = 'fas fa-hand-' + computerSelection;
    document.querySelectorAll('.compete .fas').forEach(function(item) {
        item.style.opacity = '1'
    });

    // Logic handling to get result
    if(playerSelection === computerSelection) {
        result = 'tie';
    } else {
        if(playerSelection === 'rock') {
            result = computerSelection === 'paper' ? 'lose' : 'win';
        } else if(playerSelection === 'paper') {
            result = computerSelection === 'rock' ? 'win' : 'lose';
        } else {
            result = computerSelection === 'rock' ? 'lose' : 'win';
        }
    }

    // Calculate and show the counting of winning result
    if(result === 'win') playerWin++;
    else if(result === 'lose') computerWin++;

    document.querySelector('.status.player span').innerHTML = playerWin;
    document.querySelector('.status.computer span').innerHTML = computerWin;
    
    // Show and re-styling the result
    document.querySelector('.result').innerHTML = result === 'tie' ? result.toUpperCase() : 'YOU ' + result.toUpperCase();
    document.querySelector('.result').style.opacity = '1';
    document.querySelector('.result').className = 'result ' + result;

    // Show win or lose
    if(playerWin === 5 || computerWin === 5) {
        document.querySelector('.wrapper').classList.add('active');
        document.querySelector('.modal-box').classList.add('active');
        
        document.querySelector('.modal-box .inner').className = playerWin === 5 ? 'inner win' : 'inner lose';
        document.querySelector('.modal-box .inner h3').innerHTML = playerWin === 5 ? 'YOU WIN' : 'YOU LOSE';
    }

    // Restart the game
    document.querySelector('.btn-restart').addEventListener('click', function() {
        result = '';
        playerSelection = '';
        playerWin = 0;
        computerWin = 0;

        document.querySelector('.wrapper').classList.remove('active');
        document.querySelector('.modal-box').classList.remove('active');

        document.querySelector('.result').innerHTML = '';
        document.querySelector('.result').style.opacity = '0';
        document.querySelector('.result').className = 'result';

        document.querySelectorAll('.compete .fas').forEach(function(item) {
            item.style.opacity = '0'
        });

        document.querySelector('.status.player span').innerHTML = 0;
        document.querySelector('.status.computer span').innerHTML = 0;
    });
}
