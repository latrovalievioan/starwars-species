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
    this.species.push(species);
  }

  createSpecies() {
    for (let i = 1; i < 23; i++) {
      const species = new Species();
      species.init(`https://swapi.booost.bg/api/species/${i}/`);
      species.on("SPECIES_CREATED", () => this._onSpeciesCreated(species));
    }
  }
  async init() {
    this.createSpecies();
  }

  get speciesCount() {
    return this.species.length;
  }
}
