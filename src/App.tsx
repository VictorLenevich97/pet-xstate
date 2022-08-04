import { useMachine } from "@xstate/react";
import { usersMachine } from "./machines/usersMachine";

function App() {
  const [
    {
      context: { users, selectedUser },
    },
    send,
  ] = useMachine(usersMachine);

  console.log("selectedUser", selectedUser);

  return (
    <div className="App">
      <ul>
        {users.map(({ phone_number, username, first_name, last_name }) => (
          <li key={phone_number}>
            <h3
              style={{ cursor: "pointer" }}
              onClick={() => send({ type: "setSelectedUserId", id: username })}
            >
              {username}
            </h3>
            {selectedUser && selectedUser.username === username && (
              <div>
                <p>{selectedUser.first_name}</p>
                <p>{selectedUser?.last_name}</p>
              </div>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
