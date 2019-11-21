//import { changeToInput } from './modules/textInput.mjs';

const results = document.getElementById('results');
const head = document.getElementById('head');
let newStyleSheet = document.createElement('link');

let fonts;

const fetchFonts = async () => {
  fonts = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBiNqE7_QsxXhi_RbzPWaQ7nHycNK30u2w').then(
  res => res.json()
  );
}

const showFonts = async function() {
  results.innerHTML = '';
  
  //getting the data
  await fetchFonts();
  let fontsUrl = 'https://fonts.googleapis.com/css?family=';
  let fontUrlEnding = '&display=swap';
  const fontsArray = [];
  let offset = 0;
  //creating the structure
  const main = document.createElement('main');
  main.classList.add('fonts');
  
  fonts.items.forEach(font => {
      const fontCard = document.createElement('div');
      const fontName = document.createElement('h3');
      const fontAuthor = document.createElement('h5');
      const fontText = document.createElement('p');
      const fontButton = document.createElement('button');

      fontCard.classList.add('font-family');
      fontCard.style.display = "block";
      fontCard.style.animation = "cardfade 1s";

      fontName.textContent = font.family;
      fontsArray.push(font.family);

      fontName.style.fontFamily = font.family;

      fontAuthor.textContent = "Designer";

      fontText.textContent = "Then came the night of the first falling star.";
      //fontText.onclick = changeToInput();

      fontButton.textContent = "+";
      fontButton.style.borderRadius = "50%";

      fontCard.appendChild(fontName);
      fontCard.appendChild(fontAuthor);
      fontCard.appendChild(fontText);
      fontCard.appendChild(fontButton);

      //main.appendChild(fontCard);

      window.setTimeout( () => {
        main.appendChild(fontCard);
      }, 1000 + offset);
      offset += 1000;

    });

    const output = fontsArray.join('|');
    let newLink = fontsUrl + output + fontUrlEnding;

    newStyleSheet.href = newLink;
    newStyleSheet.rel = "stylesheet";

    head.appendChild(newStyleSheet);

    results.appendChild(main);
}


window.onload = showFonts;
