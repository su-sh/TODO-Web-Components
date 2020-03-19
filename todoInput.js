todoInputTemplate = document.createElement("template");

todoInputTemplate.innerHTML = `
  <style>
    input {
      width: 98%;
    }
  </style>
  <form>
    <input placeholder="Add TO-DO" type="text">
  </form>
`;

class TodoInput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(todoInputTemplate.content.cloneNode(true));

    this.$form = this.shadowRoot.querySelector("form");
    this.$input = this.shadowRoot.querySelector("input");
  }

  handleFormSubmit(e) {
    e.preventDefault();

    if (!this.$input.value) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent("onSubmit", { detail: this.$input.value })
    );
    this.$input.value = "";
  }

  connectedCallback() {
    this.$form.addEventListener("submit", this.handleFormSubmit.bind(this));
  }

  disconnectedCallback() {}
}

window.customElements.define("todo-input", TodoInput);
