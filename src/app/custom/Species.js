import EventEmitter from "eventemitter3";

export default class Species extends EventEmitter {
  static get events() {
    return { SPECIES_CREATED: "species_created" };
  }

  constructor() {
    super();
    this.name = null;
    this.classification = null;
  }

  async init(url) {
    const currentSpeciesRaw = await fetch(url);
    const currentSpeciesResolved = await currentSpeciesRaw.json();
    this.name = currentSpeciesResolved.name;
    this.classification = currentSpeciesResolved.classification;
    this.emit(this.constructor.events.SPECIES_CREATED);
  }
}
