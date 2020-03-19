const todoItemTemplate = document.createElement("template");

todoItemTemplate.innerHTML = `
  <li>
    <input type="checkbox">
    <span></span>
    <button>x</button>   
  </li>

  <style>
    .strike {
      text-decoration: line-through;
    }

    li {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        margin: 8px 0;
        background-color: #f8f9fc;
    }
  </style>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();

    this.id = null;
    this.checked = false;
    this.text = "";
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set checked(checked) {
    this._checked = checked;
  }

  get checked() {
    return this._checked;
  }

  set text(text) {
    this._text = text;
  }

  get text() {
    return this._text;
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(todoItemTemplate.content.cloneNode(true));
    this.$todoItemContainer = this.shadowRoot.querySelector("li");

    this.$checkBox = this.shadowRoot.querySelector("input");
    this.$content = this.shadowRoot.querySelector("span");
    this.$removeButton = this.shadowRoot.querySelector("button");

    this.$removeButton.addEventListener("click", e => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent("onRemove", { detail: this.id }));
    });

    this.$checkBox.addEventListener("click", e => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent("onToggle", { detail: this.id }));
    });

    this.render();
  }

  disconnectedCallback() {}

  render() {
    this.$content.innerHTML = this.text;

    if (this.checked) {
      this.$checkBox.setAttribute("checked", "");
      this.$content.classList.add("strike");
    } else {
      this.$checkBox.removeAttribute("checked");
      this.$content.classList.remove("strike");
    }
  }
}

window.customElements.define("todo-item", TodoItem);
