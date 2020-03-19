const todoListTemplate = document.createElement("template");

todoListTemplate.innerHTML = `
  <div>
    <h3>SGN TO-DO WC</h3>
    <todo-input></todo-input>
    <ul>
    </ul>
  </div>

  <style>
    h3 {
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      margin: 24px 0 48px 0;
    }
    ul {
      padding-left: 0;
      list-style: none;
    }
    div {
      max-width: 800px;
      max-width: 60%;
      margin: auto;
    }
  </style>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();

    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    this.todos = todos;
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(todoListTemplate.content.cloneNode(true));

    this.$inputBox = this.shadowRoot.querySelector("todo-input");
    this.$listContainer = this.shadowRoot.querySelector("ul");

    this.$inputBox.addEventListener("onSubmit", this.addTodo.bind(this));

    this.renderList();
  }

  disconnectedCallback() {}

  storeInLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  addTodo(e) {
    const newTodo = {
      id: new Date().getMilliseconds(),
      text: e.detail,
      checked: false
    };

    const newTodos = [...this.todos, newTodo];

    this.todos = newTodos;
    this.storeInLocalStorage(newTodos);

    this.renderList();
  }

  removeItem(e) {
    const id = e.detail;

    const newTodos = this.todos.filter(todo => todo.id !== id);
    this.todos = newTodos;

    this.storeInLocalStorage(newTodos);

    this.renderList();
  }

  toggleItem(e) {
    const id = e.detail;

    const newTodos = this.todos.map(todo => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        ...todo,
        checked: !todo.checked
      };
    });

    this.todos = newTodos;

    this.storeInLocalStorage(newTodos);

    this.renderList();
  }

  renderList() {
    if (!this.$listContainer) return;

    this.$listContainer.innerHTML = "";

    this.todos.forEach((item, index) => {
      const { id, text, checked } = item;

      const $todoItem = document.createElement("todo-item");

      $todoItem.id = id;
      $todoItem.text = text;
      $todoItem.checked = checked;

      $todoItem.addEventListener("onRemove", this.removeItem.bind(this));
      $todoItem.addEventListener("onToggle", this.toggleItem.bind(this));

      this.$listContainer.appendChild($todoItem);
    });
  }
}

window.customElements.define("todo-list", TodoList);
