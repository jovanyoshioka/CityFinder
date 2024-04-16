// Reference: https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

const preferencesTemplateContent = `
    <link rel="stylesheet" type="text/css" href="assets/fontawesome-6.5.2/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="css/global.css">
    <link rel="stylesheet" type="text/css" href="components/preferences/preferences.css">

    <div class="preferences-container">
      <!-- *** Add Header (i.e., <h1>) Here *** -->
      <!-- *** Add Subheader (i.e., <h2>) Here *** -->
      <div class="preferences-rating">
        <div class="preferences-rating-labels">
          <!-- *** Add Rating Labels Here *** -->
        </div>
        <!-- *** Add Rating Row (i.e., <fieldset>) Here *** -->
      </div>
      <div class="preferences-buttons">
        <!-- *** Add "Find City" Button Here *** -->
      </div>
    </div>
`;

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