const head = document.getElementById('head');
const typeSomethingInput = document.getElementById('input2');
const selectEl = document.getElementById('menuBtn');
const options = document.getElementsByTagName('option');
const results = document.getElementById('results');

let newStyleSheet = document.createElement('link');

let fonts;
let fontsArray = [];
let fontsUrl = 'https://fonts.googleapis.com/css?family=';
let fontUrlEnding = '&display=swap';

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

async function fetchFonts() {
  fonts = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBiNqE7_QsxXhi_RbzPWaQ7nHycNK30u2w');
  const data = await fonts.json();
  return data;
}

 function createFontsArray(prom1) {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            prom1.items.forEach(font => {
                fontsArray.push(font.family);
            });
            if (prom1) {
                resolve(fontsArray);
            }
            else {
                reject("Unable to generate fonts...");
            }
        }, 500);
    });
}

 function createStyleSheet(prom2) {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            const items = prom2.join('|');
            let newLink = fontsUrl + items + fontUrlEnding;
            newStyleSheet.href = newLink;
            newStyleSheet.rel = "stylesheet";
            head.appendChild(newStyleSheet);
            if (newStyleSheet.href.length != 0) {
                resolve(newStyleSheet);
            }
            else {
                reject("Stylesheet couldn't be loaded.")
            }
        }, 500);
    });
}

function loadFontCards(stylesheet) {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            const finalArray = [];
            fontsArray.forEach( font => {
                const fontCard = document.createElement('div');
                const fontName = document.createElement('h3');
                const fontAuthor = document.createElement('h5');
                const fontText = document.createElement('p');
                const fontButton = document.createElement('button');
                
                fontCard.classList.add('font-family');
                fontCard.setAttribute('data-delay', '0.5s');
                fontCard.style.display = "block";

                fontName.textContent = font;
                fontName.style.fontFamily = font;

                fontAuthor.textContent = "Designer";

                fontText.classList.add('fontPara');
                fontText.contentEditable = "true";
                fontText.textContent = "Then came the night of the first falling star.";
                fontText.style.fontFamily = font;
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
                finalArray.push(fontCard);
            });
            if (stylesheet) {
                resolve(finalArray);
            }
            else {
                reject("Error!");
            }
        }, 1000);
    });
}


async function updateDom() {
    let grabFonts = await fetchFonts();
    let grabFontArray = await createFontsArray(grabFonts);
    let grabStyles = await createStyleSheet(grabFontArray);
    let grabCards = await loadFontCards(grabStyles);
    grabCards.forEach( item => {
        results.appendChild(item);
    });
    
    const fontCards = document.querySelectorAll('.font-family');
    
    let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `font-family 1s ${entry.target.dataset.delay} forwards ease-out`;
                self.unobserve(entry.target);
            }
            else {
                entry.target.style.animation = 'none';
            }
        });
    });

    fontCards.forEach(card => {
        observer.observe(card);
    });
}

updateDom();
