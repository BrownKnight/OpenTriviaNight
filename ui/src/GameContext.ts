import { createContext, Dispatch, SetStateAction } from "react";
import { Game } from "./Models";

export type Errors = { [key: string]: string };

export const GameContext = createContext<{
  game: Game | undefined;
  setGame: Dispatch<SetStateAction<Game | undefined>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  role: "Host" | "Contestant" | "Spectator" | undefined;
  setRole: Dispatch<SetStateAction<"Host" | "Contestant" | "Spectator" | undefined>>;
  errors: Errors;
  addError: (error: string) => void;
  sendWsMessage: (msg: string) => void;
}>({
  game: undefined,
  setGame: () => {},
  username: "",
  setUsername: () => {},
  role: undefined,
  setRole: () => {},
  errors: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addError: (_) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendWsMessage: (_) => {},
});
