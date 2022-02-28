// https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html
// shrtcode API
// https://shrtco.de/



document.querySelector(".shorten-btn").addEventListener("click", () => {
  const shortenInput = document.querySelector(".shortening-input");
  const originalInput = shortenInput.value;
  const shortenAPI = `https://api.shrtco.de/v2/shorten?url=${originalInput}`;
  const error = document.querySelector(".error");

  fetch(shortenAPI)
    .then(res => res.json())
    .then(res2 => {
      const result = res2.result.full_short_link;

      addLinkItem(originalInput, result);

      shortenInput.style.border = "none";
      error.style.display = "none";
    }).catch(err => {

      if (err) {
        shortenInput.style.border = "3px solid #eb5858";
        error.style.display = "inline-block";
      } else {

      }
    });

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

  enteredLink.textContent = String(original);
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
  });

}