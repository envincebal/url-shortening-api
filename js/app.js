(function () {

  let modalToggle = false;
  const mobileModalContainer = document.querySelector(".mobile-modal-container");
  const mobileModal = document.querySelector(".mobile-modal");

  window.onresize = function () {

    if (!modalToggle || window.innerWidth > 768) {
      mobileModalContainer.style.display = "none";
      mobileModal.style.display = "none";
    }
    if (modalToggle && window.innerWidth < 768) {
      mobileModalContainer.style.display = "block";
      mobileModal.style.display = "block";
    }
  };

  document.querySelector(".mobile-menu-icon").addEventListener("click", () => {

    if (!modalToggle) {
      modalToggle = true;
      mobileModalContainer.style.display = "block";
      mobileModal.style.display = "block";

    } else {
      modalToggle = false;
      mobileModalContainer.style.display = "none";
      mobileModal.style.display = "none";
    }
  });

  document.querySelector(".shorten-btn").addEventListener("click", async () => {
    const shortenInput = document.querySelector(".shortening-input");
    const originalInput = shortenInput.value;
    const shortenAPI = `https://api.shrtco.de/v2/shorten?url=${originalInput}`;
    const error = document.querySelector(".error");

    try {
      const res = await fetch(shortenAPI)
      const shortenLink = await res.json();
      const result = shortenLink.result.full_short_link;

      addLinkItem(originalInput, result);

      shortenInput.style.border = "none";
      error.style.display = "none";

      shortenInput.value = "";
    } catch (err) {
  
        shortenInput.style.border = "3px solid #eb5858";
        error.style.display = "inline-block";
      
    }
  });

  function addLinkItem(original, shorten) {

    const shortenList = document.querySelector(".shorten-list");
    const listItem = document.createElement("li");
    const enteredLink = document.createElement("p");
    const copyDiv = document.createElement("div");
    const shortenLink = document.createElement("a");
    const copyBtn = document.createElement("button");

    listItem.classList.add("list-item");
    enteredLink.classList.add("entered-link");
    copyDiv.classList.add("copy-div");
    shortenLink.classList.add("shorten-link");
    copyBtn.classList.add("copy-btn");

    if (original.length > 65) {
      enteredLink.textContent = String(original).substring(0, 65) + "...";
    } else {
      enteredLink.textContent = String(original)
    }
    shortenLink.textContent = shorten;
    copyBtn.textContent = "Copy";
    shortenLink.setAttribute("href", original);

    shortenList.appendChild(listItem);
    listItem.appendChild(enteredLink);
    listItem.appendChild(copyDiv);
    copyDiv.appendChild(shortenLink);
    copyDiv.appendChild(copyBtn);

    copyBtn.addEventListener("click", (e) => {
      const copiedLink = e.target.previousElementSibling.textContent;

      navigator.clipboard.writeText(copiedLink);

      e.target.style.backgroundColor = "#4b3f6b";
      e.target.textContent = "Copied!";

      setTimeout(() => {
        e.target.style.backgroundColor = "#2acfcf";
        e.target.textContent = "Copy";
      }, 2000);
    });
  }
})()