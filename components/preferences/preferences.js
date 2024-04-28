// Reference: https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

// Dictionary to keep dynamically updated ratings.
// Note: Initialize every feature as default rating "3" for suggestion algorithm.
const ratings = getDefaultRatings();

// Create button elements for each category.
const categoryButtons = createCategoryButtons(FEATURE_CATEGORIES);

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
        <h2>Please answer these questions to help us find the perfect city for you!</h2>
        <div class="response-row header">
          <div class="text"></div>
          <div class="right-side-labels">
            <p class="preferences-label">Not Important</p>
            <p class="preferences-label">Very Important</p>
          </div>
        </div>
        <div id="response-rows">
          <!-- Populated by addQuestions() -->
        </div>
      </div>

      <div class="preferences-buttons">
        <button onclick="showCategories()" id="back" class="primary"><i class="fa-solid fa-chevron-left"></i> Back</button>
        <button onclick="myFunction()" class="primary">Find City</button>
      </div>
    </div>
`;

function getDefaultRatings() {
  // Initialize each feature as default rating "3".
  const featureRatings = {};
  for (const [key, value] of Object.entries(FEATURES_CATEGORIZED)) {
    featureRatings[key] = "3";
  }
  return featureRatings;
}

function rateFeature(inputNode) {
  const feature = inputNode.name;
  const rating = inputNode.value;

  ratings[feature] = rating;
}

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

function addQuestions(category) {
  // Retrieve all features in passed category.
  const features = [];
  for (const [key, value] of Object.entries(FEATURES_CATEGORIZED)) {
    if (value == category) {
      features.push(key);
    }
  }

  // Create a "response-row" element for each of the features.
  var elements = ``;
  features.forEach((feature) => {
    // Retrieve question prompt based on norm/inv_norm/goldilocks type.
    const type = FEATURE_TYPES[feature];
    const question = FEATURE_TYPE_QUESTIONS[type];

    // Retrieve user-facing name for feature.
    // Note: display names capitalized like a title, so convert to lowercase for question sentence.
    const displayName = FEATURE_NAMES[feature].toLowerCase();

    // Determine which rating button to check based on feature's current rating.
    // Note: rating corresponds to index of "checked" array, which will add the "checked" attribute to respective radio button.
    const checked = ["", "", "", "", ""];
    checked[parseInt(ratings[feature])-1] = "checked";

    // Create HTML element with appropriate data.
    elements += `
      <div class="response-row">
        <div class="text">
          <p>`+ question +` `+ displayName +`?</p>
        </div>
        <div class="right-side-buttons">
          <input type="radio" name="`+ feature +`" value="1" onchange="rateFeature(this)" `+ checked[0] +`>
          <input type="radio" name="`+ feature +`" value="2" onchange="rateFeature(this)" `+ checked[1] +`>
          <input type="radio" name="`+ feature +`" value="3" onchange="rateFeature(this)" `+ checked[2] +`>
          <input type="radio" name="`+ feature +`" value="4" onchange="rateFeature(this)" `+ checked[3] +`>
          <input type="radio" name="`+ feature +`" value="5" onchange="rateFeature(this)" `+ checked[4] +`>
        </div>
      </div>
    `;
  });

  // Add elements to the DOM.
  const doc = getDocNode();
  doc.getElementById("response-rows").innerHTML = elements;
}

function selectCategory(category) {
  const doc = getDocNode();

  // Hide category selection interface.
  doc.getElementById("preferences-categories-container").style.display = "none";

  // Add the passed category's questions to the rating interface.
  addQuestions(category);

  // Show rating interface (with category's questions added from above).
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
