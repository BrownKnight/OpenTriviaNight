import { useContext, useEffect, useState } from "react";
import LabeledTextInput from "../../LabeledTextInput";
import { GameContext } from "../../GameContext";
import { Button, HR } from "flowbite-react";
import CreateGame from "./CreateGame";
import About from "../../About";
import useApiClient from "../../useApiClient";
import { PlayerRole } from "../../Models";

export default function CreateJoinGame() {
  const { username, setUsername, setRole, setGame, gameId, setGameId } = useContext(GameContext);
  const [type, setType] = useState<"join" | "create">("join");
  // False to begin with show that we only show an error after first interaction
  const [gameIdErrorMessage, setGameIdErrorMessage] = useState("");
  const apiClient = useApiClient();

  useEffect(() => {
    // Clear out the error message if the Game ID is cleared
    if (!gameId) {
      setGameIdErrorMessage("");
    }
  }, [gameId, setGameIdErrorMessage]);

  const joinGame = (role: PlayerRole) => {
    setGameIdErrorMessage("");
    if (!gameId) {
      setGameIdErrorMessage("Please provide a valid Game ID");
      return;
    }

    if (!gameId.match(/[A-Z,a-z]{4}/)) {
      setGameIdErrorMessage("Game IDs may only contain 4 characters A-Z");
      return;
    }

    if (!username) {
      return;
    }

    setRole(role);

    apiClient.getGame(gameId)?.then((res) => setGame(res));
  };

  if (type === "join") {
    return (
      <div className="flex flex-col gap-2 p-4 max-w-screen-lg mx-auto">
        <form className="flex flex-col gap-2 max-w-screen-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
          <h1 className="font-bold text-2xl">Join Game</h1>
          <LabeledTextInput
            label="Game ID"
            name="gameId"
            type="text"
            placeholder="ABCD"
            minLength={4}
            maxLength={4}
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            errorMessage={gameIdErrorMessage}
          />
          <LabeledTextInput
            label="Your Name"
            name="username"
            type="text"
            placeholder="John"
            minLength={1}
            maxLength={20}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Button type="submit" color="success" onClick={() => joinGame("Contestant")}>
            Join
          </Button>
          <Button type="submit" color="gray" onClick={() => joinGame("Spectator")}>
            Join as Spectator
          </Button>

          <HR.Text text="or" />

          <Button color="success" outline onClick={() => setType("create")}>
            Create a Game
          </Button>
        </form>

        <About />
      </div>
    );
  } else {
    return (
      <div className="m-4">
        <div className="flex flex-row justify-between">
          <h1 className="font-bold text-2xl">Create Game</h1>
          <Button outline onClick={() => setType("join")}>
            Join Game
          </Button>
        </div>

        <CreateGame />
      </div>
    );
  }
}
