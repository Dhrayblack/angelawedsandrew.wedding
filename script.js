let heroImages = [
"assets/images/hero/hero-1.jpg",
"assets/images/hero/hero-2.jpg",
"assets/images/hero/hero-3.jpg",
"assets/images/hero/hero-4.jpg",
"assets/images/hero/hero-5.jpg"
];

let current = 0;

setInterval(() => {
current++;
if(current >= heroImages.length) current = 0;
document.querySelector(".hero").style.backgroundImage = `url('${heroImages[current]}')`;
}, 10000);

// Countdown
let weddingDate = new Date("July 11, 2026 00:00:00").getTime();

setInterval(() => {
let now = new Date().getTime();
let distance = weddingDate - now;

document.getElementById("days").innerHTML = Math.floor(distance / (1000*60*60*24));
document.getElementById("hours").innerHTML = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
document.getElementById("minutes").innerHTML = Math.floor((distance % (1000*60*60))/(1000*60));
document.getElementById("seconds").innerHTML = Math.floor((distance % (1000*60))/1000);
}, 1000);

function toggleGallery(){
let gallery = document.getElementById("gallery");
gallery.style.display = gallery.style.display === "block" ? "none" : "block";
}

function openRSVP(){
document.getElementById("rsvpModal").style.display="flex";
}

function closeRSVP(){
document.getElementById("rsvpModal").style.display="none";
}