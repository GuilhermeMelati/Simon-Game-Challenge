square = [green, red, yellow, blue]
clicks = 0
score = []


$(document).keypress(() => {
    if ($("#level-title").text().includes("LEVEL") === false) {
        NewSquare()
    }
})

$(".recovery").click(() => {
    if ($("#level-title").text().includes("LEVEL") === false) {
        NewSquare()
    }
})

$("div[type='button']").click((event) => {
    try {
        clicks++

        $("#" + event.target.id).addClass("pressed")
        setTimeout(function () {
          $("#" + event.target.id).removeClass("pressed")
        }, 200)

        PlaySound(event.target.id)

        if (score[clicks - 1] === event.target.id && clicks === score.length) {
            clicks = 0
            setTimeout(() => {
                NewSquare()
            }, 800)
        }
        else if (score[clicks - 1] != event.target.id) {
            ErrorClick()
        }
    }
    catch (e) {
        alert("You must need press any key to start :(")
    }
})


function NewSquare() {
    clicks = 0
    $("#level-title").text("LEVEL " + (score.length + 1))
    option = Math.floor(Math.random() * 4)
    newSquare = $(square[option])
    score.push(newSquare.attr('id'))

    $(newSquare).fadeOut(400).fadeIn(400)
    PlaySound(newSquare.attr('id'))
    console.log(score)
}

function ErrorClick() {
    $("body").css({"background": "red"})
    setTimeout(() => {
        $("body").css({"background": "#011F3F"})
    }, 500);
    score = []
    $("#level-title").text("Game Over, Try Again!")
    $(".recovery").text("Try Again!")
    PlaySound("wrong")
}

function PlaySound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
  