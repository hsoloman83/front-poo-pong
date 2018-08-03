document.addEventListener("DOMContentLoaded", function() {

  //capturing new user information and sending it to the db to
  //create new user
  //getting information from the db and displaying it on the DOM

  let startGameButton = document.querySelector("#start-game")
  startGameButton.addEventListener('click', startGame)
  startGameButton.addEventListener('click', stopDaPoop)

  let playerOneButton = document.querySelector("#playerSubmitOne")
  playerOneButton.addEventListener('click', getUser("player1"))
  let playerTwoButton = document.querySelector("#playerSubmitTwo")
  playerTwoButton.addEventListener('click', getUser("player2"))
  //

  function startGame(){
    let script = document.createElement('script')
    script.src="p5.min.js"
    document.head.append(script)
  }

  function getUser(id){
    return function (e) {
    e.preventDefault()
    let userData = {
      username: e.target.parentNode.username.value
    }
    const url = 'http://localhost:3000/api/v1/users'
    fetch(url, {
      method: 'POST',
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      return response.json()
    })
    .then(json => {
      console.log(json)
      userIds[id] = json.id;
    })
    updateWithUserUsername(userData, id)
    }
  }


  function updateWithUserUsername(userData, id) {
    let playerSection = document.getElementById(id)
    playerSection.innerHTML = `Go for it, ${(Object.values(userData)).toString()}!`
  }

  // function makeItRain() {
  //   let script = document.createElement('script')
  //   script.src="poop.html"
  //   document.head.append(script)
  //   // rainingPoop()
  // }


  function stopDaPoop() {
    let poopCss = document.querySelector("#poop-stylesheet")
    // <link rel="stylesheet" href="poopfile.css" type="text/css"/ id="poop-stylesheet">
    poopCss.parentNode.removeChild(poopCss);
    // document.querySelector('head').innerHTML
    let pooPoo = document.querySelector("#poops")
    // pooPoo.visibility = "hidden";
    pooPoo.style = "visibility: hidden;"
  }

  // function findOrCreateByUsername(){
  //
  // }
  //

  // function getTopScores() {
  //   const url = 'http://localhost:3000/api/v1/games'
  //   fetch(url)
  //   .then(r => r.json())
  //   .then(data => {
  //     const validData = data.filter(item => item.user_one_id)
  //     console.log(validData);
  //     [...validData].sort((a, b) => Math.max(b.user_one_score, b.user_two_score) - Math.max(a.user_one_score, a.user_two_score)).slice(0, 5)
  //   })
  // }
  // getTopScores()

})
