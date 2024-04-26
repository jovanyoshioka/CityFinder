// Reference: https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

// Create button elements for each category.
const CATEGORIES = ["Socioeconomic", "Education", "Crime", "Services", "Politics", "Agriculture", "Establishments", "Transit", "Climate", "Other"];
const categoryButtons = createCategoryButtons(CATEGORIES);

const preferencesTemplateContent = `
    <link rel="stylesheet" type="text/css" href="assets/fontawesome-6.5.2/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="css/global.css">
    <link rel="stylesheet" type="text/css" href="components/preferences/preferences.css">

    <div class="preferences-container">
      <!-- *** Add Header (i.e., <h1>) Here *** -->

      <div id="preferences-categories-container">
        <!-- *** Add Subheader (i.e., <h2>) Here *** -->
        <div class="container">`+
          categoryButtons
        +`</div>
      </div>
        
      <div id="preferences-rating-container">
      <!-- Optional Subheader -->
      <h2>How much do you care about each of the following in your next home city?</h2>
      <div class="preferences-rating-labels">
        <br>
        <div class="response-row">
          <div class="text"></div>
          <div class="right-side-buttons">
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
      <fieldset class="preferences-rating-row">
        
      </fieldset>
    </div>
    
    <div class="preferences-buttons">
      <!-- "Find City" Button Here -->
      <button id="find-city">Find City</button>
    </div>
    
`;

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
    this.selectedRating = null;
  }

  handleRatingChange(value) {
    this.selectedRating = value;
    alert(this.selectedRating); // For verification
  }

  connectedCallback() {
    const preferencesTemplate = document.createElement('template');
    preferencesTemplate.innerHTML = preferencesTemplateContent;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(preferencesTemplate.content);

    // Now let's append the ratingRowHTML to the container
    // const ratingRowHTML = `
    //   <fieldset class="preferences-rating-row">
    //     <p>FeatureName</p> <!-- Replace with actual preference text -->
    //     ${[1, 2, 3, 4, 5].map(value => `
    //       <input type="radio" name="preference" value="${value}">
    //     `).join('')}
    //   </fieldset>
    // `;

    // shadowRoot.getElementById('preferences-rating-container').innerHTML += ratingRowHTML;

    // Now add the event listeners programmatically
    const radioButtons = shadowRoot.querySelectorAll('input[type="radio"][name="preference"]');
    radioButtons.forEach(radioButton => {
      radioButton.addEventListener('change', () => this.handleRatingChange(radioButton.value));
    });
  }
}

customElements.define('preferences-component', Preferences);
