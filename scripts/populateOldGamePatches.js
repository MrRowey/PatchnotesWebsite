async function populate() {
  const requestURL = "../assets/data/oldgamepatches.json";

  try {
    const response = await fetch(requestURL, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const patches = await response.json();

    if (!patches || !patches.game) {
      throw new Error("Invalid data format: Missing game data");
    }

    renderPatchList(patches.game, ".gameList");
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function renderPatchList(patchList, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container with selector ${containerSelector} not found`);
    return;
  }

  const list = document.createElement("ul");

  patchList.forEach(({ patch, link, date }) => {
    const listItem = document.createElement("li");

    const linkElement = document.createElement("a");
    linkElement.textContent = patch;
    linkElement.href = link;
    linkElement.target = "_blank";

    const dateElement = document.createElement("span");
    dateElement.textContent = date;

    listItem.append(linkElement, dateElement);
    list.appendChild(listItem);
  });

  container.innerHTML = "";
  container.appendChild(list);
}
document.addEventListener("DOMContentLoaded", populate);
