// Reference: https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

// Create button elements for each category.
const CATEGORIES = ["Industry", "Geography &<br>Land Use", "Amenities", "Demographic", "Climate", "Economic", "Politics", "Crime", "Healthcare"];
const categoryButtons = createCategoryButtons(CATEGORIES);

const preferencesTemplateContent = `
    <link rel="stylesheet" type="text/css" href="assets/fontawesome-6.5.2/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="css/global.css">
    <link rel="stylesheet" type="text/css" href="components/preferences/preferences.css">

    <div class="preferences-container">
      <h1>Preferences</h1>

      <div id="preferences-categories-container">
        <h2>Choose a category to select your home city preferences!</h2>
        <div class="container">`+
          categoryButtons
        +`</div>
      </div>
        
      <div id="preferences-rating-container">
        <h2>How much do you care about each of the following in your next home city?</h2>
        <div class="response-row">
          <div class="text"></div>
          <div class="right-side-labels">
            <p class="preferences-label">Not Important</p>
            <p class="preferences-label">Very Important</p>
          </div>
        </div>
        
        <div class="response-row">
          <div class="text">Feature</div>
          <div class="right-side-buttons">
            <input type="radio" name="preference" value="1">
            <input type="radio" name="preference" value="2">
            <input type="radio" name="preference" value="3">
            <input type="radio" name="preference" value="4">
            <input type="radio" name="preference" value="5">
          </div>
        </div>
      </div>

      <div class="preferences-buttons">
        <button onclick="showCategories()" id="back" class="primary"><i class="fa-solid fa-chevron-left"></i> Back</button>
        <button onclick="myFunction()" class="primary">Find City</button>
      </div>
    </div>
`;

function myFunction() {
  alert("I am an alert box!");
}

function getDocNode() {
  return document.getElementsByTagName("tools-component")[0].shadowRoot.querySelector("preferences-component").shadowRoot;
}

function createCategoryButtons(categories) {
  var buttonsHTML = ``;
  for (var i = 0; i < categories.length; i++) {
    buttonsHTML += `<button class="preferences-category" onclick="selectCategory('` + categories[i] + `')">` + categories[i] + `</button>`;
  }
  return buttonsHTML;
}

function selectCategory(category) {
  // Hide category selection interface, show rating interface.
  const doc = getDocNode();
  doc.getElementById("preferences-categories-container").style.display = "none";
  doc.getElementById("preferences-rating-container").style.display = "block";
  doc.getElementById("back").style.display = "inline-block";
}

function showCategories() {
  const doc = getDocNode();
  doc.getElementById("preferences-categories-container").style.display = "block";
  doc.getElementById("preferences-rating-container").style.display = "none";
  doc.getElementById("back").style.display = "none";
}

class Preferences extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const preferencesTemplate = document.createElement('template');
    preferencesTemplate.innerHTML = preferencesTemplateContent;
    
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(preferencesTemplate.content);
  }
}

customElements.define('preferences-component', Preferences);
