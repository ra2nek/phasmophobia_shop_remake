/* BUTTONS */

const Addbuttons = document.querySelectorAll("#main button:nth-of-type(even)");
const Removebuttons = document.querySelectorAll("#main button:nth-of-type(odd)");

for(let i = 0; i < Addbuttons.length; i++){
    Addbuttons[i].addEventListener("click", () => {
        if(addItem(i)){
            Addbuttons[i].classList.remove("unlocked");
            Addbuttons[i].classList.add("locked");
        }
    });
    Removebuttons[i].addEventListener("click", () => {
        if(removeItem(i)){
            Removebuttons[i].classList.remove("unlocked");
            Removebuttons[i].classList.add("locked");
        }
    });
}

function addItem(id){
    let item = items[id];
    if(item.maxAmmount == item.added) return false;

    let row = document.querySelectorAll("#sideSection tbody tr td:last-child")[id];
    
    let diamonds = row.querySelectorAll("div");

    if(item.forced){
        if(item.tier > item.forcedTier){
            diamonds[0].classList.remove('diamondTier1')
            diamonds[0].classList.remove('diamondTier2')
            diamonds[0].classList.remove('diamondTier3')
            diamonds[0].classList.remove('forced')
            diamonds[0].classList.add(`diamondTier${item.tier}`)
            Removebuttons[id].classList.add("unlocked"); Removebuttons[id].classList.remove("locked")
            item.forcedTier = item.tier;
            
            return false;
        }
    }
    for(let i = 0; i <= item.maxAmmount; i++){
        if(diamonds[i].classList.contains("diamondNone")){

            // Loadout update

            updateLoadout(id,"add",item.tier)
            
            // shop price
            
            shop.cost += item.currentPrice;
            shop.buyButton.innerHTML = shop.cost + "$";
            
            // diamonds

            diamonds[i].classList.remove("diamondNone");
            diamonds[i].classList.add(`diamondTier${item.tier}`)
            diamonds[i].classList.add(`diamond`)
            diamonds[i].setAttribute("tier", `${item.tier}`)
            item.added++;
            if(item.added == 1) {Removebuttons[id].classList.add("unlocked"); Removebuttons[id].classList.remove("locked")}
            if(i == item.maxAmmount) return true;
            if(!item.forced) {
                if(item.maxAmmount == i + 1) return true;
            }
            return false;
        }
    }
}

function removeItem(id){
    let item = items[id];
    if(item.added == 0 && item.forcedTier == 1) return false;

    let row = document.querySelectorAll("#sideSection tbody tr td:last-child")[id];

    let diamonds = row.querySelectorAll("div");

    if(item.forcedTier > 1 && item.added == 0){
        diamonds[0].classList.remove('diamondTier2');
        diamonds[0].classList.remove('diamondTier3');
        diamonds[0].classList.add('forced');
        diamonds[0].classList.add(`diamondTier1`);
        item.forcedTier = 1;
        return true;
    }

    for(let i = diamonds.length - 1; i >= 0; i--){
        if(diamonds[i].classList.contains("diamondNone")) continue;
        if(diamonds[i].classList.contains("forced")) return false;
        if(diamonds[i].classList.contains("diamond")){
            diamonds[i].classList.remove("diamond");
            diamonds[i].classList.remove("diamondTier1");
            diamonds[i].classList.remove("diamondTier2");
            diamonds[i].classList.remove("diamondTier3");
            diamonds[i].classList.add("diamondNone");

            // shop price
            
            let tier = diamonds[i].getAttribute("tier");
            log(tier)
            tier = parseInt(tier);

            shop.cost -= priceMultiplier(user.level, item.price, tier, item.moneyMultiplier, user.prestige);
            shop.buyButton.innerHTML = shop.cost + "$";
            

            item.added--;
            Addbuttons[id].classList.add("unlocked"); Addbuttons[id].classList.remove("locked")
            if(item.added == 0 && item.forcedTier == 1) return true;
            return false;
    }
}
}

function priceUpdate(id, tier){
    let item = document.querySelectorAll('.price')[id];
    if(tier == 1){
        item.innerHTML = '( ' + items[id].price + ' zł )' ;
        return
    }
    items[id].currentPrice = priceMultiplier(user.level, items[id].price, tier, items[id].moneyMultiplier ,user.prestige)
    item.innerHTML = '( ' + items[id].currentPrice + ' zł )'
}

