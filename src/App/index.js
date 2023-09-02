import React from 'react';
import { AppUI } from './AppUI';
import { useLocalStorage } from './useLocalStorage';

// const defaultTodos = [
//   { text: ' Tomar Agua ', completed: true },
//   { text: ' Tomar el Curso de React.js ', completed: false },
//   { text: ' Hacer Ejercicio' , completed: false },
//   { text: ' Montar en bicicleta ', completed: false },
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
// localStorage.removeItem('TODOS_V1');

function App() {
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(
    todo => !!todo.completed
  ).length;
  const totalTodos = todos.length;

  console.log('Log 1');

//Formas de utilizar el use efect

  // React.useEffect(() => {
  //   console.log('Loooooooog 2'); //podemos mandar solo un parametro como un console o alerta
  // });

  // React.useEffect(() => {
  //   console.log('Loooooooog 2'); // con dos parametros , el segundo parametro es vacio y se ejecuta solo una vez
  // }, []);

  React.useEffect(() => {
    console.log('Loooooooog 2');//le mandamos un array como parametro y se ejecuta de ultimas y cada vez que se necesite
  }, [totalTodos]);

  console.log('Log 3');

  const searchedTodos = todos.filter(
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    }
  );

  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };
  
  return (
    <AppUI
      completedTodos={completedTodos}
      totalTodos={totalTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
