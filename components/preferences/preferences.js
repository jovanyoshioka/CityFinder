// Reference: https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

const preferencesTemplateContent = `
    <link rel="stylesheet" type="text/css" href="assets/fontawesome-6.5.2/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="css/global.css">
    <link rel="stylesheet" type="text/css" href="components/preferences/preferences.css">

    <div class="preferences-container">
        <h1>Preferences</h1>
        <h2>Please answer the following questions to assist in finding the perfect city for you!</h2>
      <div class="preferences-rating">
        <div class="preferences-rating-labels">
          <!-- *** Add Rating Labels Here *** -->
        </div>
        <!-- *** Add Rating Row (i.e., <fieldset>) Here *** -->
      </div>
      <div class="preferences-buttons">
        <!-- *** Add "Find City" Button Here Is it supposed to be class=preferences-buttons?*** -->
        <button onclick="myFunction()" class="primary">Find City</button>
        <button onclick="myFunction()" class="secondary">Back</button>
      </div>
    </div>
`;

        function myFunction() {
            alert("I am an alert box!");
        }
      
class Preferences extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const preferencesTemplate = document.createElement('template');
    preferencesTemplate.innerHTML = preferencesTemplateContent;
    
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(preferencesTemplate.content);
  }
}

customElements.define('preferences-component', Preferences);