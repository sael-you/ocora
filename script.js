document.addEventListener("DOMContentLoaded", () => {
  const languageSelection = document.getElementById("language-selection");
  const stepView = document.getElementById("step-view");
  const mainView = document.getElementById("main-view");
  const confirmLanguageBtn = document.getElementById("confirm-language");
  const skipBtn = document.getElementById("skip-btn");
  const nextBtn = document.getElementById("next-btn");
  const step1Btn = document.getElementById("step1-btn");
  const step2Btn = document.getElementById("step2-btn");
  const scrollableText1 = document.getElementById("scrollable-text1");
  const scrollableText2 = document.getElementById("scrollable-text2");
  const bottomNav = document.querySelector(".bottom-nav");
  const listContainer = document.getElementById("list-container");
  const infoContainer = document.getElementById("info-container");
  const infoTextContainer = document.querySelector(".info-text");
  const topButtons = document.querySelectorAll(".top-btn");

  // Function to switch views
  function switchView(hideView, showView) {
    hideView.classList.remove("active");
    hideView.classList.add("hidden");
    showView.classList.add("active");
    showView.classList.remove("hidden");
  }

  // Function to toggle panels
  function togglePanel(panelToToggle, panelToClose) {
    panelToClose.style.display = "none";
    panelToToggle.style.display =
      panelToToggle.style.display === "block" ? "none" : "block";
  }

  // Function to generate a random color
  function getRandomColor() {
    return `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, "0")}`;
  }

  // Function to populate list with items based on the selected top button
  function populateList(buttonId) {
    listContainer.innerHTML = "";
    let items;
    switch (buttonId) {
      case "top-btn1":
        items = ["Item 1.1", "Item 1.2", "Item 1.3"];
        break;
      case "top-btn2":
        items = ["Item 2.1", "Item 2.2", "Item 2.3"];
        break;
      case "top-btn3":
        items = ["Item 3.1", "Item 3.2", "Item 3.3"];
        break;
    }

    items.forEach((item) => {
      const listItem = document.createElement("button");
      listItem.className = "list-item";
      listItem.setAttribute("data-animation-name", `animation-${item}`);
      listItem.textContent = item;
      listContainer.appendChild(listItem);
    });

    // Select the first item by default
    if (listContainer.firstChild) {
      listContainer.firstChild.click();
    }
  }

  // Function to display the correct set of info buttons
  function displayInfoSet(topButtonId) {
    document
      .querySelectorAll(".info-set")
      .forEach((set) => set.classList.add("hidden"));

    let infoSetId = `info-set${topButtonId.replace("top-btn", "")}`;
    const infoSet = document.getElementById(infoSetId);
    if (infoSet) {
      infoSet.classList.remove("hidden");
      setDefaultActiveInfoButton();
    }
  }

  // Function to set the first info button as active by default
  function setDefaultActiveInfoButton() {
    const firstInfoSet = document.querySelector(".info-set:not(.hidden)");
    const firstInfoButton = firstInfoSet
      ? firstInfoSet.querySelector(".info-btn")
      : null;
    if (firstInfoButton) {
      firstInfoButton.click();
    }
  }

  // Function to update info text
  function updateInfoText(infoText) {
    infoTextContainer.textContent = infoText;
  }

  // Event Delegation for list and info items
  listContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("list-item")) {
      setActiveListItem(event.target);
      document.getElementById("main-action").textContent =
        event.target.textContent;
    }
  });

  infoContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("info-btn")) {
      setActiveInfoButton(event.target);
      updateInfoText(event.target.getAttribute("data-info"));
    }
  });

  // Function to set active list item
  function setActiveListItem(selectedItem) {
    document
      .querySelectorAll(".list-item")
      .forEach((item) => item.classList.remove("active"));
    selectedItem.classList.add("active");
  }

  // Function to set active info button
  function setActiveInfoButton(selectedButton) {
    document
      .querySelectorAll(".info-btn")
      .forEach((button) => button.classList.remove("active"));
    selectedButton.classList.add("active");
  }

  // Event listeners for top buttons
  topButtons.forEach((button) => {
    button.addEventListener("click", () => {
      bottomNav.style.backgroundColor = getRandomColor();
      populateList(button.id);
      displayInfoSet(button.id);
    });
  });

  // Event listeners for language selection and navigation buttons
  confirmLanguageBtn.addEventListener("click", () =>
    switchView(languageSelection, stepView)
  );
  skipBtn.addEventListener("click", () => switchView(stepView, mainView));
  nextBtn.addEventListener("click", () => switchView(stepView, mainView));

  step1Btn.addEventListener("click", () => {
    scrollableText2.classList.add("hidden");
    scrollableText1.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    skipBtn.classList.remove("hidden");
  });

  step2Btn.addEventListener("click", () => {
    scrollableText1.classList.add("hidden");
    scrollableText2.classList.remove("hidden");
    skipBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  });

  document
    .getElementById("list-toggle")
    .addEventListener("click", () => togglePanel(listContainer, infoContainer));
  document
    .getElementById("info-toggle")
    .addEventListener("click", () => togglePanel(infoContainer, listContainer));

  // Initialize default states
  function initializeDefaults() {
    populateList("top-btn1");
    displayInfoSet("top-btn1");
    setDefaultActiveInfoButton();
  }

  // Initialize with defaults
  initializeDefaults();
});
