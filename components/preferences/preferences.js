// Reference: https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

// Create button elements for each category.
const CATEGORIES = ["Industry", "Geography & Land Use", "Amenities", "Demographic", "Climate", "Economic", "Politics", "Crime", "Healthcare"];
const categoryButtons = createCategoryButtons(CATEGORIES);

const preferencesTemplateContent = `
    <link rel="stylesheet" type="text/css" href="assets/fontawesome-6.5.2/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="css/global.css">
    <link rel="stylesheet" type="text/css" href="components/preferences/preferences.css">

    <div class="preferences-container">
      <h1>Preferences</h1>

      <div id="preferences-categories-container">
        <h2>Please answer the following questions to assist in finding the perfect city for you!</h2>
        <div class="container">`+
          categoryButtons
        +`</div>
      </div>
        
      <div id="preferences-rating-container">
        <!-- *** Add Subheader (i.e., <h2>) Here *** -->
        <div class="preferences-rating-labels">
          <!-- *** Add Rating Labels Here *** -->
        </div>
        <!-- *** Add Rating Row (i.e., <fieldset>) Here *** -->
      </div>

      <div class="preferences-buttons">
        <button onclick="myFunction()" class="primary">Find City</button>
        <button href= "https://jovanyoshioka.github.io/CityFinder/" class="secondary">Back</button>
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
  doc.getElementById("back").style.display = "block";
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
    // task 2 insert -- may be placed incorrectly
    handleRatingChange(value) {
  this.selectedRating = value;
  alert(this.selectedRating); // for verification?
}

    // task 5 has no JS needs


  connectedCallback() {
    const preferencesTemplate = document.createElement('template');
    preferencesTemplate.innerHTML = preferencesTemplateContent;
    
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(preferencesTemplate.content);
  }
}

customElements.define('preferences-component', Preferences);
