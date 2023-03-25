const express = require('express');
const router = express.Router();

const pokemonDb = [
  {
    name: 'pikachu',
    color: 'yellow',
    health: 100,
  },
  {
    name: 'charizard',
    color: 'red',
    health: 200,
  },
  {
    name: 'squirtle',
    color: 'yellow',
    health: 150,
  },
];

// request.body should include name, color and health

router.post('/', function (request, response) {
  const newPokemon = request.body;

  if (!newPokemon.color || !newPokemon.name || !newPokemon.health) {
    return response.status(422).send('Missing argument to create new pokemon');
  }

  pokemonDb.push(newPokemon);

  response
    .status(200)
    .send('Pokemon ' + newPokemon.name + ' was created successfully');
});

// http://localhost:8000/api/pokemon/pikachu
/*

    request.params = {
        name: pikachu
    }

*/
router.get('/:name', function (request, response) {
  const pokemonName = request.params.name;

  for (let i = 0; i < pokemonDb.length; i++) {
    const pokemon = pokemonDb[i];
    if (pokemon.name === pokemonName) {
      return response.send(pokemon);
    }
  }

  response.status(404).send('No pokemon with name ' + pokemonName + ' found.');
});

//http://localhost:8000/api/pokemon/find?color=yellow&size=large
/*
    req.query = {
        color: 'yellow',
        size: 'large',
    }
*/
router.get('/find', function (req, res) {
  const color = req.query.color;

  // if the color is not provided, it returns all the pokemon in the database
  if (!color) {
    return res.send(pokemonDb);
  }

  const output = [];
  // if the color is found, it loops through each pokemon in the array to check if its color matches the requested color
  for (let pokemon of pokemonDb) {
    if (pokemon.color === color) {
      output.push(pokemon);
    }
  }

  res.send(output);
});

// http://localhost:8000 + /api/pokemon + /
router.get('/pikachu', function (req, res) {
  res.send('This is the pikachu');
});

router.get('/', function (req, res) {
  res.send('This is the the base pokemon route');
});

// Update pokemon by name
router.put('/:name', function (req, res) {
  const pokemonName = req.params.name;
  // find the index of the pokemon using findIndex method
  const pokemonIndex = pokemonDb.findIndex(
    (pokemon) => pokemon.name === pokemonName
  );
  if (pokemonIndex < 0) {
    return res
      .status(404)
      .send('No pokemon with name' + pokemonName + 'found.');
  }
  const updatedPokemon = req.body;
  if (updatedPokemon.name !== pokemonName) {
    return res
      .status(422)
      .send('Cannot update pokemon name. Please update only color or health.');
  }
  pokemonDb[pokemonIndex] = updatedPokemon;
  res.send('Pokemon' + pokemonName + 'was updated successfully.');
});

// Delete pokemon by name
router.delete('/:name', function (req, res) {
  const pokemonName = req.params.name;
  const pokemonIndex = pokemonDb.findIndex(
    (pokemon) => pokemon.name === pokemonName
  );

  // if the pokemon was not found, return 404 error message
  if (pokemonIndex < 0) {
    return res
      .status(404)
      .send('No pokemon with name' + pokemonName + 'found.');
  }
  // removes only 1 pokemon object from the array at the pokemonIndex position
  pokemonDb.splice(pokemonIndex, 1);

  res.send('Pokemon' + pokemonName + 'was deleted.');
});

router.post('/', function (req, res) {
  res.send("This is how you'll create new pokemon");
});

module.exports = router;
