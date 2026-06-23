const cells = document.querySelectorAll(".cell");


for(let i = 0; i < items.length; i++){

    cells[i].innerHTML = 
    `
        <div class="cell" id="${items[i].name}"> 
            <h3>${items[i].name}<br> <span class="price">( ${items[i].price} zł ) </span></h3>
            <img src="items img/${items[i].name}/${items[i].name} tier${items[i].tier}.webp" alt="${items[i].name}">
            <button class="locked">-</button>
            <button class="unlocked">+</button>
            <div class="tierBox"><img src="img/tier1.png"></div>
            
        </div>
    `
}

/* TIER CHANGE */

const tierButtons = document.querySelectorAll(".tierBox");

for(let i = 0; i < tierButtons.length; i++){
    tierButtons[i].addEventListener("click", () => {
        let cell = cells[i];
        let img = cell.querySelector("img");
        let tierimg = cell.querySelector(".tierBox img");
        if(items[i].tier == 1){
            items[i].tier = 2;
        } else if (items[i].tier == 2){
            items[i].tier = 3;
        } else {
            items[i].tier = 1;
        }

        img.src = `items img/${items[i].name}/${items[i].name} tier${items[i].tier}.webp`;
        tierimg.src = `img/tier${items[i].tier}.png`;
        priceUpdate(i, items[i].tier);
    })
}