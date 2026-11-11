const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resultEl = document.getElementById('game-result');
const playerRevealEl = document.getElementById('player-reveal');
const computerRevealEl = document.getElementById('computer-reveal');
const countdownNumEl = document.getElementById('countdown-number');
const vsTextEl = document.getElementById('vs-text');
const buttons = document.querySelectorAll('.choice-btn');

let playerScore = 0;
let computerScore = 0;

const choices = ['rock', 'paper', 'scissors'];
const emojiMap = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.getAttribute('data-choice');
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        buttons.forEach(btn => btn.disabled = true);
        playerRevealEl.classList.remove('shakePlayer', 'pop');
        computerRevealEl.classList.remove('shakeComputer', 'pop');
        void playerRevealEl.offsetWidth;
        void computerRevealEl.offsetWidth;
        playerRevealEl.textContent = '✊';
        computerRevealEl.textContent = '✊';
        resultEl.textContent = "Get ready...";
        resultEl.style.color = '#fff';

        playerRevealEl.classList.add('shakePlayer');
        computerRevealEl.classList.add('shakeComputer');
        vsTextEl.style.opacity = '0';

        let count = 3;
        runCountdown();

        function runCountdown() {
            if (count > 0) {
                countdownNumEl.textContent = count;
                
                countdownNumEl.classList.remove('animate-number');
                void countdownNumEl.offsetWidth; 
                countdownNumEl.classList.add('animate-number');
                
                count--;
                setTimeout(runCountdown, 1000);
            } else {
                executeResolution();
            }
        }

        function executeResolution() {
            playerRevealEl.classList.remove('shakePlayer');
            computerRevealEl.classList.remove('shakeComputer');
            vsTextEl.style.opacity = '1';
            playerRevealEl.textContent = emojiMap[playerChoice];
            computerRevealEl.textContent = emojiMap[computerChoice];
            playerRevealEl.classList.add('pop');
            computerRevealEl.classList.add('pop');

            let outcome = "";

            if (playerChoice === computerChoice) {
                outcome = `It's a tie! Both got ${playerChoice.toUpperCase()}.`;
                resultEl.style.color = '#e2e8f0';
            } else if (
                (playerChoice === 'rock' && computerChoice === 'scissors') ||
                (playerChoice === 'paper' && computerChoice === 'rock') ||
                (playerChoice === 'scissors' && computerChoice === 'paper')
            ) {
                playerScore++;
                outcome = `You Win! ${playerChoice.toUpperCase()} beats ${computerChoice.toUpperCase()}.`;
                resultEl.style.color = '#2ed573';
            } else {
                computerScore++;
                outcome = `Computer Wins! ${computerChoice.toUpperCase()} beats ${playerChoice.toUpperCase()}.`;
                resultEl.style.color = '#ff4757';
            }

            playerScoreEl.textContent = playerScore;
            computerScoreEl.textContent = computerScore;
            resultEl.textContent = outcome;

            buttons.forEach(btn => btn.disabled = false);
        }
    });
});
