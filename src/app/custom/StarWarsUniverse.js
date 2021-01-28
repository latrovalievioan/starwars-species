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
    this.i = 1;
  }

  _onSpeciesCreated(species) {
    this.species.push(species);
    this.on(this.constructor.events.SPECIES_CREATED, (e) => {
      console.log(this.i);
      if (this.i <= this._maxSpecies) {
        this.createSpecies();
      } else {
        this.emit(StarWarsUniverse.events.MAX_SPECIES_REACHED);
      }
    });
    this.emit(this.constructor.events.SPECIES_CREATED, {
      speciesCount: this.i,
    });
  }

  createSpecies() {
    const species = new Species();
    species.on(species.constructor.events.SPECIES_CREATED, () =>
      this._onSpeciesCreated(species)
    );
    species.init(`https://swapi.booost.bg/api/species/${this.i}/`);
    this.i++;
  }
  async init() {
    this.createSpecies();
  }

  get speciesCount() {
    return this.species.length;
  }
}
