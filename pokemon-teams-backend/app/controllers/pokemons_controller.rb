class PokemonsController < ApplicationController
    def new 
        trainer = Trainer.find(params[:trainer_id])
        if trainer.pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
            trainer.pokemons << pokemon
            render json: TrainerSerializer.new(trainer)
        else
            render json: {message:'You already have 6 Pokemon!!'}
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:pokemon_id])
        name = pokemon.nickname
        Pokemon.delete(pokemon)
        render json: {message: "#{name} has been released"}
    end
end
