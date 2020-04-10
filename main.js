// this holds the main data for the variables used by the game, and sets them to their default values
var gameData = {
	gold: 0,
	gameStage: 1,
	tithePercent: 0.1,
	displayTithePercent: 10
}

var churchData = {
	bricks: 50,
	HP: 49,
	state: "decrepit"
}

var villageData = {
	wood: 0,
	woodGetMultiplier: 1,
	lumberyards: 0,
	lumberyardWoodCost: 20,
	lumberyardGoldCost: 15,
	lumberyardProduction: 1,
	lumberyardRuns: 0,
	houses: 0,
	houseCost: 10,
	houseSize: 1,
	emptyHouses: 0,
	villagers: 0,
	stone: 0,
	stoneGetMultiplier: 1,
	tithe: 0
}
// this rounds numbers so that java doesn't make a bunch of pointlessly long decimal places
function prettify(input){
	var output = Math.round(input * 100)/100;
		return output;
}
function hideItems(){
	document.getElementById("openChurchButton").style.display = "none"
	document.getElementById("stage1.5").style.display = "none"
	document.getElementById("stage2").style.display = "none"
	document.getElementById("stage2right").style.display = "none"
}
// stage 1 of the game, repairing the church and giving the first bits of exposition
function churchCheck() {
	if (churchData.HP < 1) {
		churchData.state = "Slightly less decrepit"
		document.getElementById("churchStatus").innerHTML = "The church is: " + churchData.state
	} else if (churchData.HP < 11) {
		churchData.state = "dilapidated"
                document.getElementById("churchStatus").innerHTML = "The church is: " + churchData.state
	} else if (churchData.HP < 21) {
		churchData.state = "a handymans dream"
                document.getElementById("churchStatus").innerHTML = "The church is: " + churchData.state
	} else if (churchData.HP < 36) {
		churchData.state = "a real fixer-upper"
                document.getElementById("churchStatus").innerHTML = "The church is: " + churchData.state	
	} else if (churchData.HP < 50) {
		churchData.state = "liveable"
		document.getElementById("churchStatus").innerHTML = "The church is: " + churchData.state
	} else if (churchData.HP = 50) {
		churchData.state = "fully repaired"
		document.getElementById("churchStatus").innerHTML = "The church is: " + churchData.state
	} 
}
function repairChurch() {
	if (churchData.bricks > 0) {
		churchData.bricks -= 1
		churchData.HP += 1
	document.getElementById("totalBricks").innerHTML = churchData.bricks + " bricks"
	churchCheck()
	showOpen()
	}
}

function showOpen() {
	if (churchData.HP == 50) {
		document.getElementById("openChurchButton").style.display = "block"
	}
}
function openChurch() {
	document.getElementById("stage1").style.display = "none"
	document.getElementById("stage1.5").style.display = "block"
	gameData.gameStage += 0.5
}

function startStage2() {
	document.getElementById("stage1.5").style.display = "none"
	document.getElementById("stage2").style.display = "block"
	document.getElementById("stage2right").style.display = "block"
	gameData.gameStage += 0.5
}
// stage 2 of the game. moves to having a small town build up around the church
function getwood() {
	villageData.wood += villageData.woodGetMultiplier
	updateUI()
}

function getstone() {
	villageData.stone += villageData.stoneGetMultiplier
	updateUI()
}

function makeHouse() {
	if (villageData.wood >= villageData.houseCost){
		villageData.wood -= villageData.houseCost
		villageData.houses += 1
		villageData.emptyHouses += villageData.houseSize
		villageData.houseCost *= 1.43
		updateUI()		
	}
}

function buyLumberYard() {
	if (villageData.wood >= villageData.lumberyardWoodCost && gameData.gold >= villageData.lumberyardGoldCost) {
		villageData.wood -= villageData.lumberyardWoodCost
		villageData.gold -= villageData.lumberyardGoldCost
		villageData.lumberyards += 1
		villageData.lumberyardRuns += villageData.lumberyards * villageData.lumberyardProduction
		updateUI()
	}
}

// these are the functions that run every second
function villagerCheck() {
	var roll = Math.floor((Math.random() * 100) + 1);
	if (villageData.emptyHouses > 0 && roll >=75){
		villageData.emptyHouses -= 1
		villageData.villagers += 1
		updateUI()
	}
}

function updateUI(){
	document.getElementById("wood").innerHTML = `You have ${prettify(villageData.wood)} wood`
	document.getElementById("stone").innerHTML = `You have ${prettify(villageData.stone)} stone`
	document.getElementById("houses").innerHTML = `You have ${prettify(villageData.houses)} houses. Villagers will show up when they pass by and decide to stay, or if they hear about us. Given how small we are, it might take a while to fill a vacancy.`
	document.getElementById("villagers").innerHTML = `You have ${prettify(villageData.villagers)} villager/s in ${prettify(villageData.houses)} houses. The next house will cost ${prettify(villageData.houseCost)} wood`
	document.getElementById("homes").innerHTML = `You have room for ${prettify(villageData.emptyHouses)} more villagers`
	document.getElementById("totalGold").innerHTML = `You have ${prettify(gameData.gold)} gold`
	document.getElementById("openChurchState").innerHTML = `You have ${villageData.villagers} parishioners tithing ${gameData.displayTithePercent}% of their income`
	document.getElementById("lumberYards").innerHTML = `You have ${villageData.lumberyards} lumberyards, producing ${villageData.lumberyardRuns} wood a second. A new lumberyard would cost ${prettify(villageData.lumberyardGoldCost)} gold and ${prettify(villageData.lumberyardWoodCost)} wood`
}
	
function getTithe(){
	gameData.gold += gameData.tithePercent * villageData.villagers

}

function lumberyardRun(){
	villageData.wood += villageData.lumberyardRuns
}

// runs the core game loop. will execute whatever is contained within the curly braces once every second
var mainGameLoop = window.setInterval(function() {
	villagerCheck()
	updateUI()
	getTithe()
	lumberyardRun()
}, 1000)



