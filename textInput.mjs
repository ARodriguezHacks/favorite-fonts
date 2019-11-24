//function changeText() {
  //  const textInput = document.createElement('input');
//}
export function changeToInput() {
    const main = document.getElementById('main');
    const textInput = document.createElement('input');
    textInput.type = "text";
    
    const submitBtn = document.createElement('button');
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";
    
    main.replaceChild(textInput, heading);
    main.appendChild(submitBtn);
    
    submitBtn.onclick = () => {
      heading.textContent = textInput.value;
      main.replaceChild(heading, textInput);
      main.removeChild(submitBtn);
    }
  
}

export { changeToInput };