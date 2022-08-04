import { createMachine } from "xstate";

interface User<T = string> {
  email: T;
  gender: T;
  phone_number: T;
  birthdate: number;
  location: {
    street: T;
    city: T;
    state: T;
    postcode: number;
  };
  username: T;
  password: T;
  first_name: T;
  last_name: T;
  title: T;
  picture: T;
}

interface Context {
  users: User[];
  selectedUserId: string | null;
  selectedUser: User | null;
}

const usersViewer = {
  id: "Users",
  initial: "getUsersList",
  states: {
    getUsersList: {
      invoke: {
        src: "fetchUsers",
        onDone: [
          {
            actions: "saveUsers",
            target: "showUsers",
          },
        ],
        onError: [
          {
            target: "showError",
          },
        ],
      },
    },
    showUsers: {
      on: {
        setSelectedUserId: {
          actions: "saveSelectedUserId",
          target: "getUser",
        },
      },
    },
    showError: {},
    getUser: {
      invoke: {
        src: "fetchSelectedUser",
        onDone: [
          {
            actions: "saveUser",
            target: "showUser",
          },
        ],
        onError: [
          {
            target: "showError",
          },
        ],
      },
    },
    showUser: {
      on: {
        setSelectedUserId: {
          actions: "saveSelectedUserId",
          target: "getUser",
        },
      },
    },
  },
};

export const usersMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFVZgE6wHQwC6o1gBkBLWXAYggHsA7MLE2gN2oGsGDMcx81NS5BE1YBjAIa4SdANoAGALqJQAB2qwSUuspAAPRAGYsAVgBspg6YCMVgwBYAnACYA7AYcAOADQgAnogBaKzsrLAdjOVM5aOM7CysnAF9Eny5sPDTBSgx0anQsFQAbSQAzPIBbLDSePkIs4RZqCS1aeSUkEDUNFp19BANjLAsDJ1HTJztjDwc5Yx9-BHGsDycDA0j1uIMrTztklJBaagg4HWqM-mIyXB0uzWlaXsCrDzll4xt7F+3guQN554OIYucwOAweKzmRyeFzJVKXLCwAAW1AA7mlbup7toOn0nFYXGFrOCHFY-nInFEnACEEE3qYQS5Ii4wSsXnIPHCQNVkWi0gBRdC5dCY7oPJ4IfGEhzE6Zk9aUik04yEkZrOR2DyOCYrSZcjEdO49XGBJwa96fEIeH52P40gL4ozhSJmiYMhIy-aJIA */
  createMachine<Context>(
    {
      ...usersViewer,
      context: {
        users: [],
        selectedUserId: null,
        selectedUser: null,
      },
    },
    {
      actions: {
        saveUsers: (context, event) => {
          context.users = event.data;
        },
        saveSelectedUserId: (context, event) => {
          context.selectedUserId = event.id;
        },
        saveUser: (context, event) => {
          context.selectedUser = event.data;
        },
      },
      services: {
        fetchUsers: () => fetch("/users").then((res) => res.json()),
        fetchSelectedUser: ({ selectedUserId }) =>
          fetch(`/users/${selectedUserId}`).then((res) => res.json()),
      },
    }
  );
