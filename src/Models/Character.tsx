class Character {
  id: number;
  dndBeyondName: string;
  avatarLink: string;
  displayName: string;
  name: string;
  nickname: string | null;
  race: string;
  subrace: string | null;
  classes: { class: string; level: number }[];
  startingLevel: number;
  sessionCount: number;
  nextSession: Date | null;

  constructor(character: {
    id: number;
    "player-dndbeyond-name": string;
    "avatar-link": string;
    name: string;
    nickname: string;
    race: string;
    classes: {
      class: string;
      level: number;
    }[];
    "starting-level": number;
    "session-count": number;
    "next-session": string;
    subrace?: undefined;
  }) {
    this.id = character.id;
    this.dndBeyondName = character["player-dndbeyond-name"];
    this.avatarLink = character["avatar-link"];
    this.displayName = character.nickname ?? character.name;
    this.name = character.name;
    this.nickname = character.nickname;
    this.race = character.race;
    this.classes = character.classes;
    this.startingLevel = character["starting-level"];
    this.sessionCount = character["session-count"];
    this.nextSession = character["next-session:"];
  }
}

export default Character;
