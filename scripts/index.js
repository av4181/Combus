/*

function addFn() {
    const divEle = document.getElementById("inputFields");
    const wrapper = document.createElement("div");
    const iFeild = document.createElement("input");
    iFeild.setAttribute("type", "text");
    iFeild.setAttribute("placeholder", "Enter value");
    iFeild.classList.add("input-field");
    wrapper.appendChild(iFeild);
    divEle.appendChild(wrapper);
}

*/

function addFn() {
    const divEle = document.getElementById("inputFields");
    divEle.innerHTML += `
        <div>
          <input type="text" placeholder="Enter value" class="input-field">
          <input type="text" placeholder="Enter value" class="input-field">
        </div>
      `;
}
