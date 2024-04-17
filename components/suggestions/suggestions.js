// Reference: https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

const suggestionsTemplate = document.createElement('template');

suggestionsTemplate.innerHTML = `
  <link rel="stylesheet" type="text/css" href="assets/fontawesome-6.5.2/css/all.min.css">
  <link rel="stylesheet" type="text/css" href="css/global.css">
  <link rel="stylesheet" type="text/css" href="components/suggestions/suggestions.css">

  <div class="suggestions-container">
    <section class="suggestions-highlight">
      <div class="suggestions-highlight-content">
        <h1>Atlanta, Georgia</h1>
        <h2>#1</h2>
        <p>
          Atlanta, GA, boasts a vibrant and diverse culture that reflects its rich history 
          and dynamic present as the city embraces a blend of traditional Southern hospitality 
          and contemporary urban energy. Residents contribute to a thriving arts scene, 
          celebrated music traditions, and a booming film industry.
        </p>
        
        <p>You might like Atlanta because...</p>
        <ul>
          <li><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span></li>
          <li><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span></li>
          <li><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span></li>
        </ul>
        
        <p>You might not like Atlanta because...</p>
        <ul>
          <li><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span></li>
          <li><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span></li>
          <li><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span></li>
        </ul>
      </div>
      <div class="suggestions-highlight-image">
        <img src="assets/atlanta.JPG" />
      </div>
    </section>
    <section class="suggestions-results">
      <div class="result">
        <img src="assets/atlanta.JPG" />
        <div class="tint"></div>
        <h1>Atlanta</h1>
        <h2>1</h2>
      </div><div class="result">
        <img src="assets/knoxville.JPG" />
        <div class="tint"></div>
        <h1>Knoxville</h1>
        <h2>2</h2>
      </div><div class="result">
        <img src="assets/seattle.jpg" />
        <div class="tint"></div>
        <h1>Seattle</h1>
        <h2>3</h2>
      </div><div class="result">
        <img src="assets/nyc.jpg" />
        <div class="tint"></div>
        <h1>New York City</h1>
        <h2>4</h2>
      </div><div class="result">
        <img src="assets/florida.jpg" />
        <div class="tint"></div>
        <h1>Florida</h1>
        <h2>5</h2>
      </div>
    </section>
  </div>
`;

class Suggestions extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(suggestionsTemplate.content);
  }
}

customElements.define('suggestions-component', Suggestions);