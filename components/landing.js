// Reference: https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

const landingTemplate = document.createElement('template');

landingTemplate.innerHTML = `
  <h1>Landing</h1>
`;

class Landing extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(landingTemplate.content);
  }
}

customElements.define('landing-component', Landing);