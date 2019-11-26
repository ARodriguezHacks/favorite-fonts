const head = document.getElementById('head');
const typeSomethingInput = document.getElementById('input2');
const selectEl = document.getElementById('menuBtn');
const options = document.getElementsByTagName('option');
const main = document.getElementById('main');
const results = document.getElementById('results');

let newStyleSheet = document.createElement('link');

let fonts;

const fetchFonts = async () => {
  fonts = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBiNqE7_QsxXhi_RbzPWaQ7nHycNK30u2w').then(
  res => res.json()
  );
}

const showFonts = async function() {
  //getting the data
  await fetchFonts();
  let fontsUrl = 'https://fonts.googleapis.com/css?family=';
  let fontUrlEnding = '&display=swap';
  const fontsArray = [];
  
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

      fontText.classList.add('fontPara');
      fontText.contentEditable = "true";
      fontText.textContent = "Then came the night of the first falling star.";
      fontText.style.fontFamily = font.family;
      fontText.addEventListener('blur', () => {
        if (fontText.textContent == '') {
          fontText.textContent = "Then came the night of the first falling star.";
        };
      });

      fontText.style.fontSize = options[0].value;

      fontButton.textContent = "+";
      fontButton.style.borderRadius = "50%";
      fontButton.classList.add('fontBtn');

      fontCard.appendChild(fontButton);
      fontCard.appendChild(fontName);
      fontCard.appendChild(fontAuthor);
      fontCard.appendChild(fontText);

      results.appendChild(fontCard);
  });

    const output = fontsArray.join('|');
    let newLink = fontsUrl + output + fontUrlEnding;

    newStyleSheet.href = newLink;
    newStyleSheet.rel = "stylesheet";

    head.appendChild(newStyleSheet);

    main.appendChild(results);
}

showFonts();

function changeSize(font) {
  var children = document.getElementsByClassName('fontPara');
  var arr = Array.prototype.slice.call(children);
  arr.forEach( item => {
    item.style.fontSize = font.value;
  });
}

typeSomethingInput.addEventListener('input', e => {
  var children = document.getElementsByClassName('fontPara');
  var arr = Array.prototype.slice.call(children);
  arr.forEach( item => {
    item.textContent = e.target.value;
  });
});

typeSomethingInput.addEventListener('blur', () => {
  var children = document.getElementsByClassName('fontPara');
  var arr = Array.prototype.slice.call(children);
  if ( typeSomethingInput.value == '') {
    arr.forEach( item => {
      item.textContent = "Then came the night of the first falling star.";
    });
  }
});

function reset() {
  typeSomethingInput.value = '';
  selectEl[0].selected = "selected";
  var children = document.getElementsByClassName('fontPara');
  var arr = Array.prototype.slice.call(children);
    arr.forEach( item => {
      item.style.fontSize = selectEl[0].value;
      item.textContent = "Then came the night of the first falling star.";
    });
}
