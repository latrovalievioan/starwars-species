import EventEmitter from "eventemitter3";
import Species from "./Species";

export default class StarWarsUniverse extends EventEmitter {
  static get events() {
    return {
      MAX_SPECIES_REACHED: "max_species_reached",
      SPECIES_CREATED: "species_created",
    };
  }

  constructor(_maxSpecies) {
    super();
    this.species = [];
    this._maxSpecies = _maxSpecies;
  }

  _onSpeciesCreated(species) {
    this.on(StarWarsUniverse.events.SPECIES_CREATED, (e) => {
      if (e.speciesCount < this._maxSpecies) {
        this.species.push(species);
        this.createSpecies();
      } else {
        this.emit(StarWarsUniverse.events.MAX_SPECIES_REACHED);
        return;
      }
    });

    this.emit(StarWarsUniverse.events.SPECIES_CREATED, {
      speciesCount: this.speciesCount,
    });
  }

  createSpecies() {
    const species = new Species();
    species.on(Species.events.SPECIES_CREATED, () =>
      this._onSpeciesCreated(species)
    );
    console.log(this.speciesCount);
    species.init(
      `https://swapi.booost.bg/api/species/${this.speciesCount + 1}/`
    );
  }
  async init() {
    this.createSpecies();
  }

  get speciesCount() {
    return this.species.length;
  }
}
