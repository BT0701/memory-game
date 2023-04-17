
var imgs = ["imgs/clown.png", "imgs/drum.png", "imgs/ice-cream.png", "imgs/magic-hat.png", "imgs/pretzel.png", "imgs/tent.png"];

//duble and mix the imgs randomly
function shuffle(imgs) {

    var dubleImgs = imgs.concat(imgs);
    var cards = document.querySelectorAll(".card");

    for (var i = 0; i < cards.length; i++) {
        var randomIndex = Math.floor(Math.random() * dubleImgs.length);
        var randomImg = dubleImgs[randomIndex];
        var img = document.createElement("img");
        img.src = randomImg;
        cards[i].appendChild(img);
        cards[i].addEventListener("click", function () {
            show(this);
        });

        //remove the current img from the array
        dubleImgs.splice(randomIndex, 1);
    };
}

//add a visible class to the current img
function show(clickedCard) {

    var clickedImg = clickedCard.firstElementChild;
    var clickedImgs = document.getElementsByClassName("visible");

    if (clickedImgs.length < 2) {
        clickedImg.classList.add("visible");
    }

    setTimeout(function () {

        if (clickedImgs.length === 2) {

            if (clickedImgs[0].src === clickedImgs[1].src) {

                var correct = new Audio("sounds/correct.wav");
                correct.play();

                clickedImgs[1].parentElement.classList.remove("flipped");
                clickedImgs[1].parentElement.classList.add("hidden");
                clickedImgs[1].classList.remove("visible");

                clickedImgs[0].parentElement.classList.remove("flipped");
                clickedImgs[0].parentElement.classList.add("hidden");
                clickedImgs[0].classList.remove("visible");
            } else {

                var notCorrect = new Audio("sounds/not-correct.wav")
                notCorrect.play();

                clickedImgs[1].classList.remove("visible");
                clickedImgs[0].classList.remove("visible");
            }
            //check if game is over
            gameOver();
        }
    }
        , 1500);

}

function gameOver() {
    //check if all cards turned hidden
    var cards = document.querySelectorAll(".card");
    var hiddenCards = document.querySelectorAll(".hidden");
    if (cards.length === hiddenCards.length) {

        var gameOver = new Audio("sounds/game-over.wav");
        gameOver.play();

        //catch the h1 and add a wining msg
        var heading = document.querySelector(".heading");
        var winMsg = document.createElement("h1");
        var text = document.createTextNode(" Well done 😃 ");
        winMsg.appendChild(text);
        heading.appendChild(winMsg);
    }
}