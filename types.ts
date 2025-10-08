
export enum GameStatus {
  START,
  PLAYING,
  LOADING,
  END,
  ERROR
}

export interface GameState {
  scene: string;
  choices: string[];
}
