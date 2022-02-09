const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/characters');

window.addEventListener('load', () => {


  //GET ALL CHARACTERS
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then(response => {
        let text = ''
        response.data.forEach(eachCharacter => text += `<div class="character-info">
      <div class="name">name: ${eachCharacter.name}</div>
      <div class="occupation">Occupation: ${eachCharacter.occupation}</div>
      <div class="cartoon">Is a Cartoon?: ${eachCharacter.cartoon}</div>
      <div class="weapon">Character Weapon: ${eachCharacter.weapon}</div>
      </div>` )
        document.querySelector('.characters-container').innerHTML = text
      })
      .catch(err => next(err))
  });



  //GET ONE CHARACTER
  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const characterId = document.querySelectorAll('.operation input')

    charactersAPI
      .getOneRegister(characterId)
      .then(response => {
        const character = response.data
        console.log(character)
        let text = `<div class="character-info">
      <div class="name">name: ${character.name}</div>
      <div class="occupation">Occupation: ${character.occupation}</div>
      <div class="cartoon">Is a Cartoon?: ${character.cartoon}</div>
      <div class="weapon">Character Weapon: ${character.weapon}</div>
      </div>`

        document.querySelector('.characters-container').innerHTML = text
      })
      .catch(err => next(err))

  });


  // DELETE CHARACTER
  document.getElementById('delete-one').addEventListener('click', function (event) {

    const characterId = document.querySelectorAll('.operation delete input')

    charactersAPI
      .deleteOneRegister(characterId)
      .then(response => console.log(`${response.data} deleted`))
      .catch(err => next(err))

  });

  // CREATE NEW CHARACTER
  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const inputs = this.querySelectorAll('#new-character-form input')

    const characterData = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    charactersAPI
      .createOneRegister(characterData)
      .then(response => {
        console.log(response)
        // document.querySelector('#new-character-form').reset()
      })
      .catch(err => next(err))
  });


  // EDIT CHARACTER
  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    
    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')

    const characterId = inputs[0].value

    const characterData = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    }

    charactersAPI
      .updateOneRegister(characterId, characterData)
      .then(response => {
        document.querySelector('#edit-character-form').reset()
      })
      .catch(err => console.log(err))

  });

});
