"use strict";
const prices={tent:5000,backpack:3000,sleeping:2000};
const names={tent:"Camping Tent",backpack:"Hiking Backpack",sleeping:"Sleeping Bag"};
const menuButton=document.querySelector(".menu-toggle"),menu=document.querySelector(".nav-links");
menuButton.addEventListener("click",()=>{const open=menu.classList.toggle("is-open");menuButton.setAttribute("aria-expanded",String(open));});
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("is-open");menuButton.setAttribute("aria-expanded","false");}));
const gearSelect=document.querySelector("#gear-select");
function selectGear(item){gearSelect.value=item;document.querySelectorAll(".gear-card").forEach(c=>c.classList.toggle("selected",c.dataset.item===item));}
document.querySelectorAll(".choose-gear").forEach(b=>b.addEventListener("click",()=>{selectGear(b.dataset.item);document.querySelector("#rental").scrollIntoView({behavior:"smooth"});}));
document.querySelectorAll(".gear-card").forEach(c=>c.addEventListener("keydown",e=>{if(e.key==="Enter"){selectGear(c.dataset.item);document.querySelector("#rental").scrollIntoView({behavior:"smooth"});}}));
gearSelect.addEventListener("change",()=>selectGear(gearSelect.value));
const today=new Date(),localDate=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
document.querySelector("#issue-date").min=localDate;document.querySelector("#return-date").min=localDate;
document.querySelector("#issue-date").addEventListener("change",e=>{document.querySelector("#return-date").min=e.target.value||localDate;});
document.querySelector("#rental-form").addEventListener("submit",e=>{e.preventDefault();const issue=document.querySelector("#issue-date").value,ret=document.querySelector("#return-date").value,days=Math.round((Date.parse(ret+"T00:00:00")-Date.parse(issue+"T00:00:00"))/86400000),message=document.querySelector("#form-message");if(!Number.isFinite(days)||days<1){message.textContent="Return Date must be after Issue Date.";document.querySelector("#total-value").textContent="0 ₸";return;}document.querySelector("#total-value").textContent=new Intl.NumberFormat("ru-RU").format(days*prices[gearSelect.value])+" ₸";document.querySelector("#total-detail").textContent=names[gearSelect.value]+" · "+days+" day(s)";message.textContent="Rental cost calculated successfully.";});
document.querySelector("#theme-select").addEventListener("change",e=>document.body.dataset.theme=e.target.value);

document.querySelectorAll('.nav-links a[href="#terms"],.nav-links a[href="#prices"]').forEach(a=>a.addEventListener("click",()=>{document.querySelector(a.getAttribute("href")).classList.add("is-visible");}));
