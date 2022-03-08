import * as React from "react";
// https://docs.amplify.aws/lib/graphqlapi/mutate-data/q/platform/js/
import { Amplify } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-react';

import { listTodos } from './graphql/queries';
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations';
import { onCreateTodo } from './graphql/subscriptions';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

I18n.putVocabularies(translations);
I18n.setLanguage('ja');


// /* create a todo */
// await API.graphql(graphqlOperation(createTodo, {input: todo}));

// /* update a todo */
// await API.graphql(graphqlOperation(updateTodo, { input: { id: todoId, name: "Updated todo info" }}));

// /* delete a todo */
// await API.graphql(graphqlOperation(deleteTodo, { input: { id: todoId }}));

// const todos = await API.graphql(graphqlOperation(listTodos));

// // Subscribe to creation of Todo
// const subscription = API.graphql(
//   graphqlOperation(onCreateTodo)
// ).subscribe({
//   next: (todoData) => {
//     console.log(todoData);
//     // Do something with the data
//   }
// });

// // Stop receiving data updates from the subscription
// subscription.unsubscribe();

class TodoForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {name: '', description:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.name, event.target.value);
    this.setState({[event.target.name]: event.target.value});
  }

  async CreateTodo(todo) {
    // const newTodo = await API.graphql(graphqlOperation({ query: createTodo, variables: {input: todo}}));
    const newTodo = await API.graphql({ query: createTodo, variables: {input: todo}});
  }

  handleSubmit(event) {
    const todo = { name: this.state.name, description: this.state.description };
    this.CreateTodo(todo)
    alert('A name was submitted: ' + this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Description:
          <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function App() {

  

  return (
    <Authenticator
      hideSignUp={true}
    >
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <TodoForm></TodoForm>
        </main>
      )}
    </Authenticator>
  );
}

export default App;

// export default function App() {
//   return (
//     <Authenticator
//       // formFields={formFields}
//       // components={components}
//       hideSignUp={true}
//     >
//       {({ signOut, user }) => (
//         <main>
//           <h1>Hello {user.username}</h1>
//           <button onClick={signOut}>Sign out</button>


          
//         </main>
//       )}
//     </Authenticator>
//   );
// }

