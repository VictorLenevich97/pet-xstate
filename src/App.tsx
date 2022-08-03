import { useMachine } from "@xstate/react";
import { usersMachine } from "./machines/usersMachine";

function App() {
  const [
    {
      context: { users },
    },
  ] = useMachine(usersMachine);

  console.log("users", users);

  return (
    <div className="App">
      <ul>
        {users.map(({ phone_number, username, first_name, last_name }) => (
          <li key={phone_number}>
            <h3>{username}</h3>
            <p>{first_name}</p>
            <p>{last_name}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
