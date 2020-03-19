todoInputTemplate = document.createElement("template");

todoInputTemplate.innerHTML = `
  <form>
    <input placeholder="Add TO-DO" type="text">
  </form>

  <style>
    input {
      width: 98%;
    }
  </style>
`;

class TodoInput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(todoInputTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.$form = this.shadowRoot.querySelector("form");
    this.$input = this.shadowRoot.querySelector("input");

    this.$form.addEventListener("submit", e => {
      e.preventDefault();

      this.dispatchEvent(
        new CustomEvent("onSubmit", { detail: this.$input.value })
      );
      this.$input.value = "";
    });
  }

  disconnectedCallback() {}
}

window.customElements.define("todo-input", TodoInput);
