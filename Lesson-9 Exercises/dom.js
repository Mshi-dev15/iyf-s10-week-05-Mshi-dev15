document.addEventListener("DOMContentLoaded", () => {
    // all your blocks go here
});

//----task 9.1-----
const header = document.getElementById("main-header");
console.log("getElementById:",header);

const contents = document.getElementsByClassName("content");
console.log("getElementsByClassName:", contents);

const paragraphs = document.getElementsByTagName("p");
console.log("getElementsByTagName:", paragraphs);

const firstlink = document.querySelector(".nav-link");
console.log("querySelector:", firstlink);

const alllinks = document.querySelectorAll(".nav-link");
console.log("querySelectorAll:", alllinks);

const hi = document.querySelector("hi");
console.log("querySelector:", hi);


const form = document.getElementById("contact-form");
console.log("getElementById:", form);

const email = document.getElementById("email");
console.log("getElementById:", email);

const lastparagraph = document.querySelector("p");
console.log("querySelector:", lastparagraph);

//-----task 9.2------
const nav =document.querySelector("nav");
console.log(nav.parentElement);
console.log(nav.children);
console.log(nav.firstElementChild);
console.log(nav.lastElementchild);

const article = document.querySelector("article");
console.log(article.nextElementSibling);
console.log(article.previousElementSibling);

const navlinks =nav.querySelectorAll("a");
console.log("querySelectorAll:", navlinks);

{
const header = document.getElementById("main-header");
const nav = header.querySelector("nav");

const firsNavtlink = document.querySelector(".nav-link");
const parentli = firsNavtlink.parentElement ;

const article = document.querySelector("article");
const nextsection = article.nextsection;

const ul = document.querySelector("ul");
const allli =ul.children;

const footer = document.querySelector("footer");
const body = footer.parentElement;
console.log(nav, parentli,nextsection,allli, body, );
}
{
// ---task 9.3-----
//exercise1: text content
const h1 = document.querySelector("h1");
console.log(h1.textcontent);
console.log(h1.innerText);
h1.textContent = "New Title";
//exercise 2:HTML content
const article = document.querySelector("article");
console.log(article.innerHTML);
article.innerHTML = `
<h2>Updated Article</h2>
<p>This is a new content.</p>
`;
const userInput ="<script>alert('hack!'')</script>";
article.textcontent = userInput;

//exercise 3: attributes
    
const link = document.querySelector(".nav-link");
console.log(link.getAttribute("href"));
console.log(link.href);

link.setAttribute("href","https://example.com");
link.href = "https://example.com";

console.log(link.hasAttribute("target"));

link.removeAttribute("target");

//const element = document.querySelector("[data-id]");
//console.log(element.dataset.id);
//console.log(element.dataset.category);
//element.dataset.newAttr = "value";

//exercise 4:styles
const container = document.querySelector(".container")
container.style.backgroundColor = "#f0f0f0";
container.style.padding = "30px";
container.style.boarderRadius = "8px";

Object.assign(container.style,{
    backgroundColor:"#333",
    colour: "white",
    padding: "20px",
});


}
{
//-----task 9.4----
const NewParagraph = document.createElement("p");
NewParagraph.textContent ="This is a new paragraph";
NewParagraph.className = "content highlight";

const article = document.querySelector("article");
article.appendChild(NewParagraph);

const firstparagraph =article.querySelector("p");
article.insertBefore(NewParagraph, firstparagraph);


article.prepend(NewParagraph);
article.append(NewParagraph);
firstparagraph.before(NewParagraph);
firstparagraph.after(NewParagraph);

const footer = document.querySelector("footer");
footer.remove();

const nav =document.querySelector("nav");
const lastlink = nav.querySelector("li:last-child");
lastlink.parentElement.removeChild(lastlink);

while (article.firstchild){
    article.removeChild(article.firstChild);
}

const navItem =document.querySelector(".nav-link").parentElement
const clone =navItem.cloneNode (true);
clone.querySelector("a").textContent = "New link";
document.querySelector(".nav-list").appendChild(clone);

function addNavItem(text, href){
    const li =document.createElement("li");
    const a= document.createElement("a");
    a.textContent = "Text";
    a.href =" ";
    a.className= "Nav link";
    li.appendChild(a);

    document.querySelector(".nav-list").appendChild(li);}
}

{
    //---task 10.1----
    const button = document.createElement("button");
    button.textcontent = "click me";
    document.body.appendChild(button);

    button.addEventListener("click",function(){console.log("button clicked");})
button.addEventListener("click", ()=>{
    console.log("clicked again!");
    });

    function handleclick(){
        console.log("handled");}
        button.addEventListener("click", handleclick);

        button.removeEventListener("click",handleclick);
        
   



}
{
//---task 10.2------
document.addEventListener("click",function(event){
console.log("Target",event.target);
console.log("Current Target",event.currentTarget);
console.log("Type",event.type);
console.log("position",event.clientX, event.clientY);
event.preventDefault();
event.stopPropagation();
})
document.addEventListener("keydown", function(event){
console.log("Key",event.key);
console.log("Code",event.code);
console.log("Shift",event.shiftkey);
console.log("Ctrl",event.ctrlKey);
console.log("Alt",event.altkey);
})

const form= document.getElementById("my-form");
const inputs= document.querySelectorAll("input");
document.addEventListener("keydown", function(event){
    if (event.ctrlKey && event.key.toLocaleLowerCase()=== "s"){
    event.preventDefault(); alert ("saved");
}
if(event.key==="Escape"){
    inputs.forEach(input =>input.value="");
}
if (event.ctrlKey && event.key ==="enter"){
    event.preventDefault();
    form.onsubmit();
}


})





}
{
//----task 10.4----
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

// Real-time validation
nameInput.addEventListener("input", function(event) {
    const value = event.target.value;
    
    if (value.length < 2) {
        showError(nameInput, "Name must be at least 2 characters");
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener("input", function(event) {
    const value = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        showError(emailInput, "Please enter a valid email");
    } else {
        clearError(emailInput);
    }
});

// Form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();  // Stop form from submitting
    
    // Get all form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log("Form data:", data);
    
    // Validate all fields
    if (isValid(data)) {
        // Submit via fetch or show success
        showSuccess("Form submitted successfully!");
        form.reset();
    }
});

function showError(input, message) {
    // Add error styling and message
    input.classList.add("error");
    // Create or update error message element
}

function clearError(input) {
    input.classList.remove("error");
    // Remove error message
}


}
