// Reference: https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

const suggestionsTemplate = document.createElement('template');

suggestionsTemplate.innerHTML = `
  <link rel="stylesheet" type="text/css" href="assets/fontawesome-6.5.2/css/all.min.css">
  <link rel="stylesheet" type="text/css" href="css/global.css">
  <link rel="stylesheet" type="text/css" href="components/suggestions/suggestions.css">

  <div id="suggestions-container">
    <div id="loading-screen">
      <img src="assets/loading_icon.gif" />
    </div>

    <section class="suggestions-highlight">
      <div class="suggestions-highlight-content">
        <div id="highlight" class="container">
          <!-- Populated by displayHighlight() -->
        </div>
      </div>
      <div class="suggestions-highlight-image">
        <img src="assets/knoxville.JPG" />
      </div>
    </section>
    <section class="suggestions-results">
      <div class="result-group left"></div>
      <div class="result-group right"></div>
      <div class="result-group middle">
        <!-- Populated by displayResults() -->
      </div>
      
      <button class="previous" onclick="showResults(false)">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button class="next" onclick="showResults(true)">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </section>
  </div>
`;

function displayHighlight(location, rank) {
  const element = `
    <h1>`+ location +`</h1>
    <h2>#`+ rank +`</h2>
    
    <p>You might like `+ location +` because...</p>
    <ul>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
    </ul>

    <p>You might not like `+ location +` because...</p>
    <ul>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
    </ul>
  `;

  const doc = document.getElementsByTagName("suggestions-component")[0].shadowRoot;
  doc.getElementById("highlight").innerHTML = element;
}

function displayResults(results) {
  let elements = ``;
  results.forEach((result) => {
    // Note: String cannot have spaces before/after div tags b/c it will cause unwanted padding.
    elements += 
      `<div class="result">
        <img src="assets/knoxville.JPG" />
        <div class="tint"></div>
        <h1>`+ result[0] +`</h1>
        <h2>`+ result[1] +`</h2>
      </div>`;
  });
  const doc = document.getElementsByTagName("suggestions-component")[0].shadowRoot;
  doc.querySelector("div.result-group.middle").innerHTML = elements;
}


/**
 * Helper function to replace class.
 * @param node Element node to replace classes.
 * @param oldClass Class that will be replaced.
 * @param newClass Class that will be replacing.
 */
function replaceClass(node, oldClass, newClass) {
  node.classList.remove(oldClass);
  node.classList.add(newClass);
}

/**
 * Animates transitioning to next or previous results.
 * @param next If true, show next results; false, show previous results.
 */
function showResults(next) {
  const doc = document.getElementsByTagName("suggestions-component")[0].shadowRoot;

  // Disable the transition button.
  var buttonNodes = doc.querySelectorAll("section.suggestions-results button");
  buttonNodes.forEach((node) => {
    node.disabled = true;
  });

  const left = doc.querySelector(".result-group.left");
  const right = doc.querySelector(".result-group.right");
  const middle = doc.querySelector(".result-group.middle");

  // Note: CSS attribute adds transition delay to below translation.
  if (next) {
    // Slide middle to left, right to middle, and move left to right.
    middle.style.transform = "translateX(-100%)";
    right.style.transform = "translateX(0)";
    left.style.opacity = "0.0";
    left.style.transform = "translateX(100%)";
  } else {
    // Slide middle to right, left to middle, and move right to left.
    middle.style.transform = "translateX(100%)";
    left.style.transform = "translateX(0)";
    right.style.opacity = "0.0";
    right.style.transform = "translateX(-100%)";
  }
  
  setTimeout(() => {
    // Update classes to reflect new positions.
    if (next) {
      replaceClass(middle, "middle", "left");
      replaceClass(right, "right", "middle");
      replaceClass(left, "left", "right");

      left.style.opacity = "1.0";
    } else {
      replaceClass(middle, "middle", "right");
      replaceClass(left, "left", "middle");
      replaceClass(right, "right", "left");

      right.style.opacity = "1.0";
    }

    // Re-enable the transition button.
    buttonNodes.forEach((node) => {
      node.disabled = false;
    });
  }, 750);
}

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