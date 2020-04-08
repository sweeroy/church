var gameData = {
	lines: 0,
	linesPerClick: 1,
	linesPerTick: 0,
	paragraphs: 00,
	paragraphSize: 5,
	articles: 0,
	articleSize: 10,
	articleValue: 10,
	money: 100,
	paragraphSellMultiplier: 1,
	lineWriterMultiplier: 1,
	lineWriter: 0,
	lineWriterPrice: 10,
	writerCost: 100,
	siteCost: 50
}

function writeLine() {
	gameData.lines += gameData.linesPerClick
	document.getElementById("linesWritten").innerHTML = prettify(gameData.lines) + " lines written"

}

function prettify(input){
    var output = Math.round(input * 100)/100;
	return output;
}

function makeParagraph() {
	if (gameData.lines >= gameData.paragraphSize) {
		gameData.lines -= gameData.paragraphSize
		gameData.paragraphs += 1
		}
		document.getElementById("linesWritten").innerHTML = prettify(gameData.lines) + " lines written"
		document.getElementById("paragraphNumber").innerHTML = prettify(gameData.paragraphs) + " paragraphs written"
}

function sellArticle() {
	if (gameData.paragraphs >= 10) {
		var price = Math.floor((Math.random() * 10) + 1)
		price *= gameData.paragraphSellMultiplier
		gameData.paragraphs -= gameData.articleSize
		gameData.money += price
		document.getElementById("money").innerHTML = "You have $" + prettify(gameData.money)
		document.getElementById("paragraphNumber").innerHTML = prettify(gameData.paragraphs) + " paragraphs written"
	}
}

function sellAllArticles() {
	while (gameData.paragraphs >= gameData.articleSize) {
		sellArticle()
	}
}

function buyAllParagraphs() {
        while (gameData.lines >= gameData.paragraphSize) {
                gameData.lines -= gameData.paragraphSize
                gameData.paragraphs += 1
	}
        document.getElementById("linesWritten").innerHTML = prettify(gameData.lines) + " lines written"
	document.getElementById("paragraphNumber").innerHTML = prettify(gameData.paragraphs) + " paragraphs written"
}

function buyWriter() {
	if (gameData.money >= gameData.lineWriterPrice){
		gameData.money -= gameData.lineWriterPrice
		gameData.lineWriter += 1
		gameData.lineWriterPrice *= 1.3
		document.getElementById("writers").innerHTML = prettify(gameData.lineWriter) + " writer/s doing your job for you. Buy another for $" + prettify(gameData.lineWriterPrice)
		document.getElementById("money").innerHTML = "You have $" + prettify(gameData.money)
	}
}

function tickLine() {
	gameData.lines += gameData.linesPerTick
	gameData.lines += gameData.lineWriter * gameData.lineWriterMultiplier
        document.getElementById("linesWritten").innerHTML = prettify(gameData.lines) + " lines written"
	document.getElementById("paragraphNumber").innerHTML = prettify(gameData.paragraphs) + " paragraphs written"
	document.getElementById("money").innerHTML = "You have $" + prettify(gameData.money)
}

function newSite() {
	if (gameData.money >= gameData.siteCost) {
		gameData.money -= gameData.siteCost
		gameData.paragraphSellMultiplier *= 2
		gameData.siteCost *= 15
		document.getElementById("newSiteDescription").innerHTML = "You can buy access to another site for $" + prettify(gameData.siteCost)
	}
}

function upgradeWriters() {
	if (gameData.money >= gameData.writerCost) {
		gameData.money -= gameData.writerCost
		gameData.lineWriterMultiplier *= 2
		gameData.writerCost *= 10
		document.getElementById("writerUpgradeDescription").innerHTML = "Upgrade the software that lets you spy on your writers, allowing you to do so even more effectively. $" + prettify(gameData.writerCost)
	}
}

var mainGameLoop = window.setInterval(function() {
	tickLine()
}, 1000)
