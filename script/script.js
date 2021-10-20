import '../css/app.css';
import '../css/master.css';
import {galleryInformation} from './projectsInformation.js';
import {addAndRemoveClasses} from './utilFunctions.js';

//OPENING SPLASHSCREEN
const downChevron = document.querySelector(".open-container__i");
const openContainer = document.querySelector(".open-container");
//NAVBAR
const allNavBar = document.querySelector(".all-nav-bar");
const navBar = document.querySelector(".all-nav-bar__nav-bar");
const subNavContainer = document.querySelector(".all-nav-bar__sub-nav-container");
const hamburgerBtn = document.querySelector(".all-nav-bar__icon");
const subNav = document.querySelector(".all-nav-bar__sub-nav");
const aboutSection = document.querySelector(".about-section");
const projectSection = document.querySelector(".project-section");
const abilitiesSection = document.querySelector(".abilities-section");
const contactSection = document.querySelector(".contact-section");
const upArrow = document.querySelector(".up-arrow");

//Will store the list items for both the mainNav and subNav (desktop/mobile)
const navItems = [];
const subNavItems = [];

//Fills out the 2 Arrays declared above
navBar.querySelectorAll("li").forEach(ele => {
    navItems.push(ele);
});

subNav.querySelectorAll("li").forEach(ele => {
    subNavItems.push(ele);
});
let autoScroolCoolDown = false;
//Add event listener for nav items; so that we go to the relevant section on a click
function addNavEventListener(num, sect){
    navItems[num].addEventListener("click", () => {
        autoScroolCoolDown = true;
        sect.scrollIntoView({behavior: "smooth", block: "start"});
        selectNavItems(num);
        setTimeout(() => {autoScroolCoolDown = false}, 500);
    });
    subNavItems[num].addEventListener("click", () => {
        autoScroolCoolDown = true;
        sect.scrollIntoView({behavior: "smooth", block: "start"});
        selectNavItems(num);
        setTimeout(() => {autoScroolCoolDown = false}, 500);
    });
};

addNavEventListener(0, openContainer);
addNavEventListener(1, aboutSection);
addNavEventListener(2, projectSection);
addNavEventListener(3, abilitiesSection);
addNavEventListener(4, contactSection);

let allNavBarClasses = {pink: 'all-nav-bar__item--pink', white: 'all-nav-bar__item-white'};

//Unselect all navItems but one
function selectNavItems(selectItem){
    if(!navItems[selectItem].classList.contains(allNavBarClasses.pink)){
    for(let i = 0; i < navItems.length; i++){
        if(i === selectItem){
            addAndRemoveClasses(navItems[i], [allNavBarClasses.pink],[allNavBarClasses.white]);
            addAndRemoveClasses(subNavItems[i], [allNavBarClasses.pink],[allNavBarClasses.white]);
            continue;
        }
        addAndRemoveClasses(navItems[i], [allNavBarClasses.white],[allNavBarClasses.pink]);
        addAndRemoveClasses(subNavItems[i], [allNavBarClasses.white],[allNavBarClasses.pink]);
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

//Used for navBar 'coming in' animation.
let hasNavAnimated = false;

//Stop navBar from interfering in overlay
let navBarOverlay = false;

//Animate NavBar either up or down
function animateNavBarUpOrDown(goingUp){
    if(navBarOverlay) return;
    if(goingUp){
        allNavBar.style.top = "-65px";
        setTimeout(() => {
            allNavBar.style.transition = "none";
            allNavBar.style.position = "static";
        }, 500);
        hasNavAnimated = false;
    }else{
        allNavBar.style.position = "sticky";
        allNavBar.style.top = "-65px";
        setTimeout(() => {
            allNavBar.style.transition = "top 0.5s";
            allNavBar.style.top = "0";
        }, 50);
        hasNavAnimated = true;
    }
}
//Highlight the different sections of the navBar based on where the user has positioned their scroll
window.addEventListener("scroll", function() {
    if(autoScroolCoolDown) return;
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
        window.pageYOffset < abilitiesSection.offsetTop + abilitiesSection.clientHeight - 200){
        selectNavItems(3);
    }else if(window.pageYOffset > contactSection.offsetTop - 200 &&
        window.pageYOffset < contactSection.offsetTop + contactSection.clientHeight - 60){
            selectNavItems(4);
        }

    if(window.pageYOffset > openContainer.offsetTop + openContainer.clientHeight){
        if(!hasNavAnimated && innerHeight > 800){
            animateNavBarUpOrDown(false);
        }
    }
});

//GSAP Animations
const aboutAnimations = gsap.timeline({defaults: {duration: 0.5}});
aboutAnimations
    .from(".about-section__underline", 
    {transform: "translateX(-300%)", opacity: 0})
    .from(".about-section__header", {transform: "translateX(-250px)", opacity: 0})
    .from(".about-section__paragraph", {opacity: 0})
    .from(".about-section__hr", {opacity: 0}, "<0s")
    .from(".about-section__grid", {transform: "scale(0)", ease: "bounce"});

ScrollTrigger.create({
    trigger: aboutSection,
    start: "top center",
    animation: aboutAnimations,
});

const projectsAnimation = gsap.timeline({defaults: {duration: 0.5}});
projectsAnimation
    .from(".project-section__underline", {transform: "translateX(300%)", opacity: 0})
    .from(".project-section__header", {transform: "translateX(250px)", opacity: 0})
    .from(".project-section__gallery-header", {opacity: 0})
    .from(".project-section__gallery-container", {opacity: 0}, "<0s");

ScrollTrigger.create({
    trigger: projectSection,
    start: "top center",
    animation: projectsAnimation,
});

const abilitiesAnimation = gsap.timeline({defaults: {duration: 0.5}});
abilitiesAnimation
    .from(".abilities-section__underline", {transform: "translateX(-300%)", opacity: 0})
    .from(".abilities-section__header", {transform: "translateX(-250px)", opacity: 0})
    .from(".abilities-section__bar-container", {opacity: 0});

ScrollTrigger.create({
    trigger: abilitiesSection,
    start: "top center",
    animation: abilitiesAnimation,
});

const contactAnimation = gsap.timeline({defaults: {duration: 0.5}});
contactAnimation
    .from(".contact-section__underline", {transform: "translateX(300%)", opacity: 0})
    .from(".contact-section__header", {transform: "translateX(250px)", opacity: 0})
    .from(".contact-section__form", {transform: "scale(0)", ease: "bounce"})
    .from(".contact-section__form-title", {transform: "scale(0)", ease: "bounce"}, "<0s");

    ScrollTrigger.create({
        trigger: contactSection,
        start: "top center",
        animation: contactAnimation,
    });



upArrow.onclick = () => {
    openContainer.scrollIntoView({behavior: "smooth", block: "start"});
}

//IMAGE GALLERY TIME

let currentSelect = 0;

const galleryHeader = document.querySelector(".project-section__gallery-header");
const gHAll = galleryHeader.querySelector("#all");
const gHReact = galleryHeader.querySelector("#react");
const gHFrontend = galleryHeader.querySelector("#frontend");
const gHBackend = galleryHeader.querySelector("#backend");
const selector = galleryHeader.querySelector(".project-section__selector");


if(window.innerWidth < 617){
    selector.style.left = "26px";
    selector.style.width = "50px";
}


let currentGallery = "ALL";


gHReact.onclick = () => {

    if(innerWidth > 616){
        gsap.to(selector, {left: "122px", width: "120px",
        duration: 1});
    }else{
        gsap.to(selector, {left: "82px", width: "65px",
        duration: 1});
    }

    configureItemsAnim(true);

    configureGalleryItems("react");

    currentGallery = "react";

     galleryMenuColour(1);
}
gHAll.onclick = () => {
    if(innerWidth > 616){
        gsap.to(selector, {left: "20px", width: "90px",
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
    if(innerWidth > 616){
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
    if(innerWidth > 616){
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
    let gHItems = document.querySelectorAll(".project-section__gallery-header-item");
    for(let i = 0; i < gHItems.length; i++){
        if(i === num){
            gHItems[i].style.color = "white";
            continue;
        }
        gHItems[i].style.color = "black";
    }
}


const galleryItems = document.querySelectorAll(".project-section__gallery-container-item");

function configureGalleryItems(selection){
    if(window.innerWidth < 958){
        if(selection === "react"){
            moveItems([{num: 0, top: "0", left: "0"}, {num: 5, top: "11.11%", left: "0"},
            {num: 6, top: "22.22%", left: "0"},{num: 8, top: "33.33%", left: "0"}]);
            projectSection.style.height = "calc(1200px + 320px)";
        }else if(selection === "ALL" ){
            moveItems([{num: 0, top: "0", left: "0"}, {num: 1, top: "11.11%", left: "0"},
            {num: 2, top: "22.22%", left: "0"},{num: 3, top: "33.33%", left: "0"},
            {num: 4, top: "44.44%", left: "0"},{num: 5, top: "55.55%", left: "0"},
            {num: 6, top: "66.66%", left: "0"},{num: 7, top: "77.77%", left: "0"},
            {num: 8, top: "88.88%", left: "0"}]);
            projectSection.style.height = "calc(2700px + 320px)";
        }else if(selection === "frontend" ){
            moveItems([{num: 0, top: "0", left: "0"}, {num: 1, top: "11.11%", left: "0"},
            {num: 3, top: "22.22%", left: "0"},{num: 4, top: "33.33%", left: "0"},
            {num: 5, top: "44.44%", left: "0"},{num: 8, top: "55.55%", left: "0"}]);
            projectSection.style.height = "calc(1800px + 320px)";
        }else if(selection === "backend"){
            moveItems([{num: 2, top: "0", left: "0"}, {num: 6, top: "11.11%", left: "0"},
            {num: 7, top: "22.22%", left: "0"}]);
            projectSection.style.height = "calc(900px + 320px)";
        }
        return;
    }

    if(window.innerWidth < 1301){
        if(selection === "react"){
            moveItems([{num: 0, top: "0", left: "0"}, {num: 5, top: "0", left: "50%"},
            {num: 6, top: "20%", left: "0"},{num: 8, top: "20%", left: "50%"}]);
            projectSection.style.height = "calc(600px + 320px)";
        }else if(selection === "ALL" ){
            moveItems([{num: 0, top: "0", left: "0"}, {num: 1, top: "0", left: "50%"},
            {num: 2, top: "20%", left: "0"},{num: 3, top: "20%", left: "50%"},
            {num: 4, top: "40%", left: "0"},{num: 5, top: "40%", left: "50%"},
            {num: 6, top: "60%", left: "0"},{num: 7, top: "60%", left: "50%"},
            {num: 8, top: "80", left: "0"}]);
            projectSection.style.height = "calc(1500px + 320px)";
        }else if(selection === "frontend" ){
            moveItems([{num: 0, top: "0", left: "0"}, {num: 1, top: "0", left: "50%"},
            {num: 3, top: "20%", left: "0"},{num: 4, top: "20%", left: "50%"},
            {num: 5, top: "40%", left: "0"},{num: 8, top: "40%", left: "50%"}]);
            projectSection.style.height = "calc(900px + 320px)";
        }else if(selection === "backend"){
            moveItems([{num: 2, top: "0", left: "0"}, {num: 6, top: "0", left: "50%"},
            {num: 7, top: "20%", left: "0"}]);
            projectSection.style.height = "calc(600px + 320px)";
        }
        return;
    }

    if(window.innerWidth > 1300){
    if(selection === "react"){
        moveItems([{num: 0, top: "0", left: "0"}, {num: 5, top: "0", left: "33.33%"},
        {num: 6, top: "33.33%", left: "0"},{num: 8, top: "0", left: "66.66%"}]);
        projectSection.style.height = "calc(600px + 320px)";
    }else if(selection === "ALL" ){
        moveItems([{num: 0, top: "0", left: "0"}, {num: 1, top: "0", left: "33.33%"},
        {num: 2, top: "0", left: "66.66%"},{num: 3, top: "33.33%", left: "0"},
        {num: 4, top: "33.33%", left: "33.33%"},{num: 5, top: "33.33%", left: "66.66%"},
        {num: 6, top: "66.66%", left: "0"},{num: 7, top: "66.66%", left: "33.33%"},
        {num: 8, top: "66.66%", left: "66.66%"}]);
        projectSection.style.height = "calc(900px + 320px)";
    }else if(selection === "frontend" ){
        moveItems([{num: 0, top: "0", left: "0"}, {num: 1, top: "0", left: "33.33%"},
        {num: 3, top: "0", left: "66.66%"},{num: 4, top: "33.33%", left: "0"},
        {num: 5, top: "33.33%", left: "33.33%"},{num: 8, top: "33.33%", left: "66.66%"}]);
        projectSection.style.height = "calc(600px + 320px)";
    }else if(selection === "backend"){
        moveItems([{num: 2, top: "0", left: "0"}, {num: 6, top: "0", left: "33.33%"},
        {num: 7, top: "0", left: "66.66%"}]);
        projectSection.style.height = "calc(300px + 320px)";
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
    if(anim){
        projectSection.style.transition = 'height 1s';
    }else{
        projectSection.style.transition = 'none';
    }
    for(let i = 0; i < galleryItems.length; i++){
        let ele = galleryItems[i];
        ele.style.transition = 'none';
        if(anim){
            ele.style.transition = 'top 1s, left 1s, height 1s, transform 1s, opacity 1s';
        }
    }
}


const galleryBtns = [];
const imageLinks = [];

for(let i = 0; i < galleryItems.length; i++){
    const btn = galleryItems[i].querySelector(".project-section__gallery-container-btn");
    galleryBtns.push(btn);
    const image = galleryItems[i].querySelector(".project-section__gallery-container-img");
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
    document.body.insertAdjacentHTML('afterbegin', `<div class="project-modal">
    <div class="project-modal__card">
        <a href="${information.a}" target="_blank" class="project-modal__img-link">
        ${information.img}
        </a>
        <div class="project-modal__text-container">
            <a href="${information.a}" class="project-modal__text-header-link" target="_blank">
            <h1 class="project-modal__text-header">${information.title}</h1>
            </a>
            <p>${information.text}</p>
            <i class="fas fa-times project-modal__x-icon"></i>
        </div>
    </div>
</div>`);
    const overlay = document.querySelector(".project-modal");
    const card = overlay.querySelector(".project-modal__card");
    gsap.from(overlay, {opacity: 0, duration: 0.2});
    gsap.fromTo(card, {scale: 0.8}, {scale: 1, duration: 0.2});
    //Add Event Listeners
    overlay.addEventListener('click', closeCard);
    card.querySelector('.project-modal__x-icon').addEventListener('click', closeCard);
    document.body.style.overflow = 'hidden';
    //Send NavBar Up
    if(hasNavAnimated && innerHeight > 800){
        animateNavBarUpOrDown(true);
        navBarOverlay = true;
    }
}

function closeCard(e){
    if(!(e.target.classList.contains('project-modal') || e.target.classList.contains('project-modal__x-icon'))){
        return;
    }
    const overlay = document.querySelector(".project-modal");
    const card = overlay.querySelector(".project-modal__card");
    document.body.style.overflow = '';
    gsap.to(overlay, {duration: 0.3, opacity: 0});
    setTimeout(() => {
        overlay.remove();
        card.remove();
    }, 300);
    navBarOverlay = false;
    //Nav bar come back down
    if(!hasNavAnimated && innerHeight > 800){
        animateNavBarUpOrDown(false);
    }
}

window.addEventListener("resize", e => {

    configureItemsAnim(false);

    configureGalleryItems(currentGallery);

    const mediaQuery = window.innerWidth < 617;

    const navBarMediaQuery = window.innerHeight < 801;

    if(mediaQuery){
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
    }else if(!mediaQuery){
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

    if(navBarMediaQuery){
        if(hasNavAnimated){
            animateNavBarUpOrDown(true);
        }
    }else if(!navBarMediaQuery){
        if(!hasNavAnimated){
            animateNavBarUpOrDown(false);
        }
    }
});

//CONTACT FORM
const contactForm = document.querySelector('.contact-section__form');

contactForm.onsubmit = (event => {
    event.preventDefault();
    fetch('sendMail.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'same-origin',
        credentials: 'same-origin',
        body: JSON.stringify({
            name: contactForm.querySelector('input[name="name"]').value,
            subject: contactForm.querySelector('input[name="subject"]').value,
            text: contactForm.querySelector('textarea').value
        })
    }).then(res => res.json()).then(data => {
        if(data === 'true'){
            contactSection.querySelector('.contact-section__msg-section').innerHTML = '<p class="contact-section__form-msg" >Email has successfully been sent!</p>';
        }else if(data === 'empty'){
            contactSection.querySelector('.contact-section__msg-section').innerHTML = '<p class="contact-section__form-msg" style="color: red;">Error. Inputs cannot be empty.</p>';
        }else{
            contactSection.querySelector('.contact-section__msg-section').innerHTML = '<p class="contact-section__form-msg" style="color: red;">Sorry. An error occured.</p>';
        }
        contactForm.reset();
    }).catch(err => {console.log(err)});
});
