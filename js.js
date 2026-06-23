const log = console.log;


// USER

const user = {
    level: 3,
    money: 3,
    prestige: 0,
    loadout: 0,
}

const shop = {
    cost: 0,
    buyButton: document.querySelector("#finalPrice"),
}

const base = {
    name: ["flashlight","D.O.T.S projector","EMF reader","ghost writing book","spirit box","thermometer","uv light","video camera","tripod","crucifix","firelight","incense","igniter","headgear","motion sensor","parabolic microphone","salt","sanity medication","sound sensor"],
    loadout: [
        {name: "flashlight", ammount: 0, tiers: []}, 
        {name: "D.O.T.S projector", ammount: 0, tiers: []},
        {name: "EMF reader", ammount: 0, tiers: []},
        {name: "ghost writing book", ammount: 0, tiers: []},
        {name: "spirit box", ammount: 0, tiers: []},
        {name: "thermometer", ammount: 0, tiers: []},
        {name: "uv light", ammount: 0, tiers: []},
        {name: "video camera", ammount: 0, tiers: []},
        {name: "tripod", ammount: 0, tiers: []},
        {name: "crucifix", ammount: 0, tiers: []},
        {name: "firelight", ammount: 0, tiers: []},
        {name: "incense", ammount: 0, tiers: []},
        {name: "igniter", ammount: 0, tiers: []},
        {name: "headgear", ammount: 0, tiers: []},
        {name: "motion sensor", ammount: 0, tiers: []},
        {name: "parabolic microphone", ammount: 0, tiers: []},
        {name: "salt", ammount: 0, tiers: []},
        {name: "sanity medication", ammount: 0, tiers: []},
        {name: "sound sensor", ammount: 0, tiers: []}
    ],
}

function priceMultiplier(level, basePrice, tier, moneyMultiplier, prestige){
    if(tier == 1) return basePrice;
    return Math.floor((basePrice * (moneyMultiplier * tier) * 100) / Math.round(level * (moneyMultiplier / 2) * ((prestige * 0.2 ) + 1)) / 100) * 100;
}

function check(i){
    let btn = document.querySelectorAll("#sideButtons button")[i + 1];
    btn.classList.toggle("checked");
    btn.classList.toggle("unchecked");

}

// Bottom section buttons

const bottomBTN = document.querySelectorAll("#bottom button");

bottomBTN.forEach((e, id) => {
    e.addEventListener("click", () => {
        bottomBTN.forEach((el) => {
            if(el == e) return;
            el.classList.remove("selected");
        })
        bottomBTN[id].classList.toggle("selected");
        if(!bottomBTN[id].classList.contains("selected")){
            user.loadout = 0;
            return
        }
        user.loadout = id + 1;

    })
})

const loadouts = [
    base.loadout,
    base.loadout,
    base.loadout
]

function updateLoadout(id, state, tier){
    if(user.loadout == 0) return;
    if(state == "add"){
        loadouts[user.loadout - 1][id].ammount += 1;
        loadouts[user.loadout - 1][id].tiers.push(tier);
    }
    if(state == "remove"){
        loadouts[user.loadout - 1][id].ammount -= 1;
        loadouts[user.loadout - 1][id].tiers.pop();
    }
}