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
      <div class="result-group left">
        <div class="result">
          <img src="assets/florida.jpg" />
          <div class="tint"></div>
          <h1>Placeholder</h1>
          <h2>#</h2>
        </div><div class="result">
          <img src="assets/knoxville.JPG" />
          <div class="tint"></div>
          <h1>Placeholder</h1>
          <h2>#</h2>
        </div><div class="result">
          <img src="assets/nyc.jpg" />
          <div class="tint"></div>
          <h1>Placeholder</h1>
          <h2>#</h2>
        </div><div class="result">
          <img src="assets/seattle.jpg" />
          <div class="tint"></div>
          <h1>Placeholder</h1>
          <h2>#</h2>
        </div><div class="result">
          <img src="assets/atlanta.JPG" />
          <div class="tint"></div>
          <h1>Placeholder</h1>
          <h2>#</h2>
        </div>
      </div>
      <div class="result-group right">
        <div class="result">
          <img src="assets/seattle.jpg" />
          <div class="tint"></div>
          <h1>Placeholder</h1>
          <h2>#</h2>
        </div><div class="result">
          <img src="assets/knoxville.JPG" />
          <div class="tint"></div>
          <h1>Placeholder</h1>
          <h2>#</h2>
        </div><div class="result">
          <img src="assets/atlanta.JPG" />
          <div class="tint"></div>
          <h1>Placeholder</h1>
          <h2>#</h2>
        </div><div class="result">
          <img src="assets/florida.jpg" />
          <div class="tint"></div>
          <h1>Placeholder</h1>
          <h2>#</h2>
        </div><div class="result">
          <img src="assets/nyc.jpg" />
          <div class="tint"></div>
          <h1>Placeholder</h1>
          <h2>#</h2>
        </div>
      </div>
      <div class="result-group middle">
        <div class="result">
          <img src="assets/knoxville.JPG" />
          <div class="tint"></div>
          <h1>Knoxville</h1>
          <h2>1</h2>
        </div><div class="result">
          <img src="assets/atlanta.JPG" />
          <div class="tint"></div>
          <h1>Atlanta</h1>
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
  var doc = document.getElementsByTagName("suggestions-component")[0].shadowRoot;

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