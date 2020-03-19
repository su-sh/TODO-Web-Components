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
        cursor: pointer;
    }
  </style>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(todoItemTemplate.content.cloneNode(true));

    this.$content = this.shadowRoot.querySelector("span");
    this.$checkBox = this.shadowRoot.querySelector("input");
    this.$removeButton = this.shadowRoot.querySelector("button");
    this.$todoItemContainer = this.shadowRoot.querySelector("li");

    this.id = null;
    this.text = "";
    this.checked = false;
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
    this.$todoItemContainer.addEventListener(
      "click",
      this.handleToggle.bind(this)
    );

    this.$checkBox.addEventListener("click", this.handleToggle.bind(this));

    this.$removeButton.addEventListener("click", this.handleRemove.bind(this));

    this.render();
  }

  disconnectedCallback() {}

  handleToggle(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("onToggle", { detail: this.id }));
  }

  handleRemove(e){
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent("onRemove", { detail: this.id }));
  }

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
