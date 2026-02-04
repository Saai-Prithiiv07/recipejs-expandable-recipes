const RecipeApp = (function () {

  // ---------------- DATA ----------------
  const recipes = [
    {
      id: 1,
      name: "Pasta",
      ingredients: ["Pasta", "Salt", "Oil"],
      steps: [
        "Boil water",
        {
          text: "Prepare sauce",
          substeps: [
            "Heat oil",
            "Add garlic",
            {
              text: "Add tomatoes",
              substeps: ["Chop tomatoes", "Cook for 10 minutes"]
            }
          ]
        },
        "Mix pasta with sauce"
      ]
    },
    {
      id: 2,
      name: "Sandwich",
      ingredients: ["Bread", "Butter", "Vegetables"],
      steps: [
        "Slice vegetables",
        {
          text: "Assemble sandwich",
          substeps: [
            "Apply butter",
            "Add vegetables"
          ]
        }
      ]
    }
  ];

  // ---------------- RECURSION ----------------
  const renderSteps = (steps) => {
    const ul = document.createElement("ul");

    steps.forEach(step => {
      const li = document.createElement("li");

      if (typeof step === "string") {
        li.textContent = step;
      } else {
        li.textContent = step.text;
        li.appendChild(renderSteps(step.substeps));
      }

      ul.appendChild(li);
    });

    return ul;
  };

  // ---------------- RENDER ----------------
  const renderRecipes = () => {
    const container = document.getElementById("recipe-container");
    container.innerHTML = "";

    recipes.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "recipe-card";

      card.innerHTML = `
        <h3>${recipe.name}</h3>

        <button data-type="steps" data-id="${recipe.id}">Show Steps</button>
        <button data-type="ingredients" data-id="${recipe.id}">Show Ingredients</button>

        <div class="steps hidden" id="steps-${recipe.id}"></div>
        <div class="ingredients hidden" id="ingredients-${recipe.id}">
          <ul>
            ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
          </ul>
        </div>
      `;

      container.appendChild(card);
    });
  };

  // ---------------- EVENTS ----------------
  const handleClick = (e) => {
    const type = e.target.dataset.type;
    if (!type) return;

    const id = e.target.dataset.id;
    const recipe = recipes.find(r => r.id == id);

    if (type === "steps") {
      const stepDiv = document.getElementById(`steps-${id}`);
      stepDiv.classList.toggle("hidden");
      stepDiv.innerHTML = "";
      stepDiv.appendChild(renderSteps(recipe.steps));
    }

    if (type === "ingredients") {
      document
        .getElementById(`ingredients-${id}`)
        .classList.toggle("hidden");
    }
  };

  // ---------------- INIT ----------------
  const init = () => {
    renderRecipes();
    document
      .getElementById("recipe-container")
      .addEventListener("click", handleClick);
  };

  return { init };

})();

RecipeApp.init();
