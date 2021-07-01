const downChevron = document.querySelector("#openContainer i");
const hamburgerBtn = document.querySelector("#navBar i");
const subNavContainer = document.querySelector("#subNav .container");
const navBar = document.getElementById("navBar");
const subNav = document.getElementById("subNav");
const openContainer = document.getElementById("openContainer");
const allNavBar = document.getElementById("allNavBar");
const aboutSection = document.getElementById("aboutSection");
const projectSection = document.getElementById("projectSection");
const abilitiesSection = document.getElementById("abilitiesSection");
const contactSection = document.getElementById("contactSection");
const upArrow = document.getElementById("upArrow");

const navItems = [];
const subNavItems = [];

navBar.querySelectorAll("li").forEach(ele => {
    navItems.push(ele);
});

subNav.querySelectorAll("li").forEach(ele => {
    subNavItems.push(ele);
});

//Add event listener for nav items; so that we go to the relevant section on a click
function addNavEventListener(num, sect){
    navItems[num].addEventListener("click", () => {
        sect.scrollIntoView({behavior: "smooth", block: "start"});
    });
    subNavItems[num].addEventListener("click", () => {
        sect.scrollIntoView({behavior: "smooth", block: "start"});
    });
}

//Unselect all navItems but one
function selectNavItems(selectItem){
    if(navItems[selectItem].style.color !== "#B91C5F"){
    for(let i = 0; i < navItems.length; i++){
        if(i === selectItem){
            navItems[i].style.color = "#B91C5F";
            subNavItems[i].style.color = "#B91C5F";
            continue;
        }
        navItems[i].style.color = "white";
        subNavItems[i].style.color = "white";
    }
}
}


//Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

//Take user to main page when they click on the down chevron
downChevron.onclick = () => {
    aboutSection.scrollIntoView({behavior: "smooth", block: "start"});
}

//Open the subNav when they click on hamburger
let openSubNav = false;

hamburgerBtn.onclick = () => {
    openSubNav = !openSubNav;
    if(openSubNav){
        subNavContainer.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    }else{
        subNavContainer.style.clipPath = "polygon(0 0, 100% 0, 100% 0, 0 0)";
    }
}

//Deal with window scroll

let hasNavAnimated = false;

window.addEventListener("scroll", function() {
    //Scrolled onto about
    if(window.pageYOffset > openContainer.offsetTop + openContainer.clientHeight &&
        window.pageYOffset < aboutSection.offsetTop + aboutSection.clientHeight - 60){
        selectNavItems(1);

        //Scrolled back to opening screen
    }else if(window.pageYOffset < openContainer.offsetTop + openContainer.clientHeight){
        allNavBar.style.position = "static";
        selectNavItems(0);
        hasNavAnimated = false;
        allNavBar.style.transition = "none";
    }else if(window.pageYOffset > projectSection.offsetTop - 60 &&
        window.pageYOffset < projectSection.offsetTop + projectSection.clientHeight - 60){
        selectNavItems(2);
    }else if(window.pageYOffset > abilitiesSection.offsetTop - 60 &&
        window.pageYOffset < abilitiesSection.offsetTop + abilitiesSection.clientHeight - 60){
        selectNavItems(3);
    }else if(window.pageYOffset > contactSection.offsetTop - 60 &&
        window.pageYOffset < contactSection.offsetTop + contactSection.clientHeight - 60){
            selectNavItems(4);
        }

    if(window.pageYOffset > openContainer.offsetTop + openContainer.clientHeight){
        if(!hasNavAnimated && this.innerHeight > 800){
            allNavBar.style.position = "sticky";
            allNavBar.style.top = "-65px";
            this.setTimeout(() => {
                allNavBar.style.transition = "top 0.5s";
                allNavBar.style.top = "0";
            }, 50);
        }
        hasNavAnimated = true;
    }
});

//GSAP Animations
const aboutAnimations = gsap.timeline({defaults: {duration: 0.5}});
aboutAnimations
    .from("#aboutSection > h1 + .underline", 
    {transform: "translateX(-300%)", opacity: 0})
    .from("#aboutSection > h1", {transform: "translateX(-250px)", opacity: 0})
    .from("#aboutSection > p", {opacity: 0})
    .from("#aboutSection > hr", {opacity: 0}, "<0s")
    .from("#aboutSection .grid", {transform: "scale(0)", ease: "bounce"});

ScrollTrigger.create({
    trigger: aboutSection,
    start: "top center",
    animation: aboutAnimations,
});

const projectsAnimation = gsap.timeline({defaults: {duration: 0.5}});
projectsAnimation
    .from("#projectSection > h1 + .underline", {transform: "translateX(300%)", opacity: 0})
    .from("#projectSection > h1", {transform: "translateX(250px)", opacity: 0})
    .from("#projectSection #galleryHeader", {opacity: 0})
    .from("#projectSection #galleryContainer", {opacity: 0}, "<0s");

ScrollTrigger.create({
    trigger: projectSection,
    start: "top center",
    animation: projectsAnimation,
});

const abilitiesAnimation = gsap.timeline({defaults: {duration: 0.5}});
abilitiesAnimation
    .from("#abilitiesSection > h1 + .underline", {transform: "translateX(-300%)", opacity: 0})
    .from("#abilitiesSection > h1", {transform: "translateX(-250px)", opacity: 0})
    .from("#abilitiesSection .barContainer", {opacity: 0});

ScrollTrigger.create({
    trigger: abilitiesSection,
    start: "top center",
    animation: abilitiesAnimation,
});

const contactAnimation = gsap.timeline({defaults: {duration: 0.5}});
contactAnimation
    .from("#contactSection > h1 + .underline", {transform: "translateX(300%)", opacity: 0})
    .from("#contactSection > h1", {transform: "translateX(250px)", opacity: 0})
    .from("#contactSection form", {transform: "scale(0)", ease: "bounce"})
    .from("#contactSection .formTitle", {transform: "scale(0)", ease: "bounce"}, "<0s");

    ScrollTrigger.create({
        trigger: contactSection,
        start: "top center",
        animation: contactAnimation,
    });

addNavEventListener(0, openContainer);
addNavEventListener(1, aboutSection);
addNavEventListener(2, projectSection);
addNavEventListener(3, abilitiesSection);
addNavEventListener(4, contactSection);

upArrow.onclick = () => {
    openContainer.scrollIntoView({behavior: "smooth", block: "start"});
}

//IMAGE GALLERY TIME

let currentSelect = 0;
let prevWindowSize = window.innerWidth;

const galleryHeader = document.getElementById("galleryHeader");
const gHAll = galleryHeader.querySelector("#all");
const gHReact = galleryHeader.querySelector("#react");
const gHFrontend = galleryHeader.querySelector("#frontend");
const gHBackend = galleryHeader.querySelector("#backend");
const selector = galleryHeader.querySelector(".selector");


if(window.matchMedia('(max-width: 616px)').matches){
    selector.style.left = "26px";
    selector.style.width = "50px";
}


let currentGallery = "ALL";


gHReact.onclick = () => {

    if(this.innerWidth > 616){
        gsap.to(selector, {left: "122px", width: "120px",
        duration: 1});
    }else{
        gsap.to(selector, {left: "82px", width: "65px",
        duration: 1});
    }

    configureItemsAnim(true);

    configureGalleryItems("react");

     galleryMenuColour(1);
}
gHAll.onclick = () => {
    if(this.innerWidth > 616){
        gsap.to(selector, {left: "13px", width: "100px",
        duration: 1});
    }else{
        gsap.to(selector, {left: "26px", width: "50px",
        duration: 1});
    }

    configureItemsAnim(true);

    configureGalleryItems("ALL");

    currentGallery = "ALL";
    
     galleryMenuColour(0);


}
gHFrontend.onclick = () => {
    if(this.innerWidth > 616){
        gsap.to(selector, {left: "260px", width: "150px",
        duration: 1});
    }else{
        gsap.to(selector, {left: "157px", width: "90px",
        duration: 1});
    }

    configureItemsAnim(true);

    configureGalleryItems("frontend");

    currentGallery = "frontend";
    
     galleryMenuColour(2);

}
gHBackend.onclick = () => {
    if(this.innerWidth > 616){
        gsap.to(selector, {left: "437px", width: "130px",
        duration: 1});
    }else{
        gsap.to(selector, {left: "258px", width: "80px",
        duration: 1});
    }

    configureItemsAnim(true);

    configureGalleryItems("backend");

    currentGallery = "backend";
    
     galleryMenuColour(3);
}

//Configure colour of gallery menu
function galleryMenuColour(num){
    currentSelect = num;
    let gHItems = galleryHeader.querySelectorAll("li");
    for(let i = 0; i < gHItems.length; i++){
        if(i === num){
            gHItems[i].style.color = "white";
            continue;
        }
        gHItems[i].style.color = "black";
    }
}



const galleryContainer = document.getElementById("galleryContainer");

const galleryItems = document.getElementById("galleryContainer").querySelectorAll(".item");

function configureGalleryItems(selection){
    if(window.matchMedia('(min-width: 1301px)').matches){
    if(selection === "react"){
        moveItems([{num: 2, top: "0", left: "0"}, {num: 5, top: "0", left: "33.33%"},
        {num: 6, top: "0", left: "66.66%"}]);
        projectSection.style.height = "calc(300px + 320px)";
    }else if(selection === "ALL" ){
        moveItems([{num: 0, top: "0", left: "0"}, {num: 1, top: "0", left: "33.33%"},
        {num: 2, top: "0", left: "66.66%"},{num: 3, top: "33.33%", left: "0"},
        {num: 4, top: "33.33%", left: "33.33%"},{num: 5, top: "33.33%", left: "66.66%"},
        {num: 6, top: "66.66%", left: "0"},{num: 7, top: "66.66%", left: "33.33%"},
        {num: 8, top: "66.66%", left: "66.66%"}]);
        projectSection.style.height = "calc(900px + 320px)";
    }else if(selection === "frontend" ){
        moveItems([{num: 1, top: "0", left: "0"}, {num: 3, top: "0", left: "33.33%"},
        {num: 5, top: "0", left: "66.66%"},{num: 8, top: "33.33%", left: "0"}]);
        projectSection.style.height = "calc(600px + 320px)";
    }else if(selection === "backend"){
        moveItems([{num: 2, top: "0", left: "0"}, {num: 6, top: "0", left: "33.33%"},
        {num: 7, top: "0", left: "66.66%"}]);
        projectSection.style.height = "calc(300px + 320px)";
    }
}if(window.matchMedia('(max-width: 1300px)').matches){
    if(selection === "react"){
        moveItems([{num: 2, top: "0", left: "0"}, {num: 5, top: "0", left: "50%"},
        {num: 6, top: "20%", left: "0"}]);
        projectSection.style.height = "calc(600px + 320px)";
    }else if(selection === "ALL" ){
        moveItems([{num: 0, top: "0", left: "0"}, {num: 1, top: "0", left: "50%"},
        {num: 2, top: "20%", left: "0"},{num: 3, top: "20%", left: "50%"},
        {num: 4, top: "40%", left: "0"},{num: 5, top: "40%", left: "50%"},
        {num: 6, top: "60%", left: "0"},{num: 7, top: "60%", left: "50%"},
        {num: 8, top: "80", left: "0"}]);
        projectSection.style.height = "calc(1500px + 320px)";
    }else if(selection === "frontend" ){
        moveItems([{num: 1, top: "0", left: "0"}, {num: 3, top: "0", left: "50%"},
        {num: 5, top: "20%", left: "0"},{num: 8, top: "20%", left: "50%"}]);
        projectSection.style.height = "calc(600px + 320px)";
    }else if(selection === "backend"){
        moveItems([{num: 2, top: "0", left: "0"}, {num: 6, top: "0", left: "50%"},
        {num: 7, top: "20%", left: "0"}]);
        projectSection.style.height = "calc(600px + 320px)";
    }
}if(window.matchMedia('(max-width: 957px)').matches){
    if(selection === "react"){
        moveItems([{num: 2, top: "0", left: "0"}, {num: 5, top: "11.11%", left: "0"},
        {num: 6, top: "22.22%", left: "0"}]);
        projectSection.style.height = "calc(900px + 320px)";
    }else if(selection === "ALL" ){
        moveItems([{num: 0, top: "0", left: "0"}, {num: 1, top: "11.11%", left: "0"},
        {num: 2, top: "22.22%", left: "0"},{num: 3, top: "33.33%", left: "0"},
        {num: 4, top: "44.44%", left: "0"},{num: 5, top: "55.55%", left: "0"},
        {num: 6, top: "66.66%", left: "0"},{num: 7, top: "77.77%", left: "0"},
        {num: 8, top: "88.88%", left: "0"}]);
        projectSection.style.height = "calc(2700px + 320px)";
    }else if(selection === "frontend" ){
        moveItems([{num: 1, top: "0", left: "0"}, {num: 3, top: "11.11%", left: "0"},
        {num: 5, top: "22.22%", left: "0"},{num: 8, top: "33.33%", left: "0"}]);
        projectSection.style.height = "calc(1200px + 320px)";
    }else if(selection === "backend"){
        moveItems([{num: 2, top: "0", left: "0"}, {num: 6, top: "11.11%", left: "0"},
        {num: 7, top: "22.22%", left: "0"}]);
        projectSection.style.height = "calc(900px + 320px)";
    }
}

}

function moveItems(items){
    let nums = items.map(item => item.num);
    for(let i = 0; i < galleryItems.length; i++){
        let ele = galleryItems[i];
        if(nums.indexOf(i) !== -1){
            const item = items.find(item => item.num === i);
            ele = galleryItems[i];
            if(ele.style.opacity === '0'){
                ele.style.transform = 'scale(1)';
                ele.style.opacity = '1';
            }
            ele.style.top = item.top;
            ele.style.left = item.left;
            continue;
        }
        ele.style.transform = 'scale(0)';
        ele.style.opacity = '0';
    }
}

function configureItemsAnim(anim){
    for(let i = 0; i < galleryItems.length; i++){
        let ele = galleryItems[i];
        ele.style.transition = 'none';
        if(anim){
            ele.style.transition = 'top 1s, left 1s, height 1s, transform 1s, opacity 1s';
        }
    }
}


function addItemClass(selectedClass, ele){
    let classes = ele.classList;
    for(let i = 0; i < classes.length; i++){
        if(classes[i] !== "item"){
            ele.classList.remove(classes[i]);
        }
    }
    ele.classList.add(selectedClass);
}



const galleryBtns = [];
const imageLinks = [];

const galleryInformation = [
    {
        title: "La Stalla At Stables",
        img: '<img src="https://i2.lensdump.com/i/Zg3aqZ.jpg" alt="Zg3aqZ.jpg" border="0" />',
        a: "https://la-stalla-at-stables.vercel.app/",
        text: "Commissioned website for an Italian Restaurant. Made with Next JS to allow for server-side hosting and SPA functionality. Includes an animated Nav bar, Image gallery, Google map and interactive menu."
    },
    {
        title: "Tank Battle Game",
        a: 'https://lukechopper.github.io/Luke-Courtney-s-Tank-Battle/',
        img: '<img src="https://i3.lensdump.com/i/Zg3hMP.png" alt="Zg3hMP.png" border="0" />',
        text: "Based on the eminent online arcade game, Tank Trouble. This inspired game, features all of the core mechanics of the real one. The defining feature of this one, is that it was created in pure JavaScript and HTML5 canvas, so no JavaScript frameworks or anything of that nature was used. This game really was built from the ground up. Which makes its smooth gameplay and comprehensive collision detection all the more commendable. "
    },
    {
        title: "Ersatz Amazon Sidebar",
        a: "https://www.youtube.com/watch?v=luJlfKc4etw&t=90s",
        img: '<img src="https://i1.lensdump.com/i/Zg41YT.jpg" alt="Zg41YT.jpg" border="0" />',
        text: "Replica of the Amazon Sidebar that was in use as of the project’s creation. Was designed to look and feel like the real version as much as possible. All functionality has been recreated; everything from animations, to content. All can be found here, and the full process, from start to finish, can be found on my YouTube channel. "
    },
    {
        title: "Ersatz BBC Website",
        a: "https://www.youtube.com/watch?v=F8ss3kjCp4I&t=526s",
        img: '<img src="https://i1.lensdump.com/i/Zg4ACi.jpg" alt="Zg4ACi.jpg" border="0" />',
        text: "As a fun challenge, and to push my front-end skills to the limit, I decided to recreate the homepage design of the BBC website that was currently in use as of the project’s creation. Stand out features are the responsive elements of the website, like the Navbar and the connected dropdown menu which work beautifully in tandem with each other. This website is more then equipped to deal with the cumbersome demands that the multitudes of different screen sizes bring to web dev in the modern age."
    },
    {
        title: "Circus Game",
        a: "https://lukechopper.github.io/Circus-Canvas-Game/",
        img: '<img src="https://i2.lensdump.com/i/Zg4Wzo.jpg" alt="Zg4Wzo.jpg" border="0" />',
        text: "Based on the 1971 game of the same name by Exidy. This version differs from the fact that it is web compatible as it was made in plain JavaScript and HTML5 canvas. A fun little project that pushed my JavaScript skills to the limit. I have no doubt that I finished this project a significantly better programmer as compared to when I started it. "
    },
    {
        title: "Live Extreme Weather Tracker",
        a: "https://www.youtube.com/watch?v=uMSGnZFW-h8&t=13s",
        img: '<img src="https://i3.lensdump.com/i/Zg4iw9.jpg" alt="Zg4iw9.jpg" border="0" />',
        text: "A real time extreme weather tracker, made in React js with the Google Maps Api. This is not some subsistence project. Features include; a real time search bar which allows for filtering based on the event type; clustering, so that the user doesn’t get overwhelmed with the number of markers that are in near vicinity to each other and an information box that gives the user information on the event that they want to look into."
    },
    {
        title: "YouTube Style Comments System",
        a: "https://www.youtube.com/watch?v=F_8QqP6GgxE&t=242s",
        img: '<img src="https://i.lensdump.com/i/Zg4012.jpg" alt="Zg4012.jpg" border="0" />',
        text: "This project does a fine job at demonstrating my twofold skills of both front-end and back-end development. On the front-end side, we have a visually appealing comments system which mirrors the highly professional one employed by YouTube. This mirror image even extends to the more technical parts of the design, like the infinitely scrolling comments for example, which is also replicated in this project. On the back-end side, we have everything begin stored and managed with Node js and MongoDB which have relationships to handle replies, etc."
    },
    {
        title: "Typing Test Game",
        a: "https://www.youtube.com/watch?v=oYf_u040C60&t=23s",
        img: '<img src="https://i1.lensdump.com/i/Zg4IKv.jpg" alt="Zg4IKv.jpg" border="0" />',
        text: "Put your typing skills to the test with this fun, addicting typing game. Comments are randomly selected from a list of the 1,000 most common words in the English language. The player will then have 1 minute to correctly type out as many of these words as they can. When the time is up, they will get receive their calculated words per minute score based on the test that they just completed."
    },
    {
        title: "Cisco Animated Image Display",
        a: "https://www.youtube.com/watch?v=Fegl4X2HdTM&t=72s",
        img: '<img src="https://i.lensdump.com/i/Zg4tqz.jpg" alt="Zg4tqz.jpg" border="0" />',
        text: "A complex way of displaying 3 images with the basic front-end technologies. The user can hover their mouse over any of the images to expand it outwards along with the associated text that gets animated in at the same time."
    }
]

for(let i = 0; i < galleryItems.length; i++){
    const btn = galleryItems[i].querySelector(".galleryBtn");
    galleryBtns.push(btn);
    const image = galleryItems[i].querySelector("img");
    imageLinks.push(image);
}

galleryBtns.forEach(btn => {
    btn.onclick = () => {
        generateOverlay(btn);
    }
});

function generateOverlay(btn){
    let btnIndex = galleryBtns.indexOf(btn);
    let information = galleryInformation[btnIndex];
    document.body.insertAdjacentHTML('afterbegin', `<div id="overlay">
    <div class="card">
        <a href="${information.a}" target="_blank">
        ${information.img}
        </a>
        <div class="text">
            <h1>${information.title}</h1>
            <p>${information.text}</p>
            <i class="fas fa-times" onclick="closeCard()"></i>
        </div>
    </div>
</div>`);
}

function closeCard(){
    const overlay = document.getElementById("overlay");
    const card = overlay.querySelector(".card");
    card.style.opacity = "0";
    setTimeout(() => {
        overlay.remove();
        card.remove();
    }, 300);
}

window.addEventListener("resize", e => {

    configureItemsAnim(false);

    configureGalleryItems(currentGallery);

    const mediaQuery = window.matchMedia('(max-width: 616px)');

    if(mediaQuery.matches){
        switch(currentSelect){
            case 0:
                selector.style.left = "26px";
                selector.style.width = "50px";
                break;
            case 1:
                selector.style.left = "82px";
                selector.style.width = "65px";
                break;
            case 2:
                selector.style.left = "157px";
                selector.style.width = "90px";
                break;
            case 3:
                selector.style.left = "258px";
                selector.style.width = "80px";
        }
    }else if(!mediaQuery.matches){
        switch(currentSelect){
            case 0:
                selector.style.left = "13px";
                selector.style.width = "100px";
                break;
            case 1:
                selector.style.left = "122px";
                selector.style.width = "120px";
                break;
            case 2:
                selector.style.left = "260px";
                selector.style.width = "150px";
                break;
            case 3:
                selector.style.left = "437px";
                selector.style.width = "130px";
        }
    }

    const headerStick = window.matchMedia('(max-width: 600px)');

});

//CONTACT FORM
const contactForm = document.getElementById('contact-form');

contactForm.onsubmit = (event => {
    event.preventDefault();
    fetch('sendMail.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'same-origin',
        credentials: 'same-origin',
        body: JSON.stringify({
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            text: contactForm.querySelector('textarea').value
        })
    }).then(res => res.json()).then(data => {
        if(data === 'true'){
            contactSection.querySelector('.formTitle').insertAdjacentHTML('afterend', '<p>Email has successfully been sent!</p>');
        }else{
            contactSection.querySelector('.formTitle').insertAdjacentHTML('afterend', '<p style="color: red;">Sorry. An error occured.</p>');
        }
        contactForm.reset();
    }).catch(err => {console.log(err)});
});
