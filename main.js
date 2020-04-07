var gameData = {
	lines: 0,
	linesPerClick: 1,
	linesPerTick: 0,
	paragraphs: 00,
	paragraphSize: 5,
	articles: 0,
	articleSize: 10,
	articleValue: 10,
	money: 10,
	lineWriter: 0,
	lineWriterPrice: 10
}

function writeLine() {
	gameData.lines += gameData.linesPerClick
	document.getElementById("linesWritten").innerHTML = gameData.lines + " lines written"

}

function makeParagraph() {
	if (gameData.lines >= gameData.paragraphSize) {
		gameData.lines -= gameData.paragraphSize
		gameData.paragraphs += 1
		document.getElementById("linesWritten").innerHTML = gameData.lines + " lines written"
		document.getElementById("paragraphNumber").innerHTML = gameData.paragraphs + " paragraphs written"
	}
}

function sellArticle() {
	if (gameData.paragraphs >= 10) {
		var price = Math.floor((Math.random() * 10) + 1)
		gameData.paragraphs -= gameData.articleSize
		gameData.money += price
		document.getElementById("money").innerHTML = "You have $" + gameData.money
		document.getElementById("paragraphNumber").innerHTML = gameData.paragraphs + " paragraphs written"
	}
}

function buyWriter() {
	if (gameData.money >= gameData.lineWriterPrice){
		gameData.money -= gameData.lineWriterPrice
		gameData.lineWriter += 1
		gameData.lineWriterPrice *= 1.8
		document.getElementById("writers").innerHTML = gameData.lineWriter + " writer/s doing your job for you. Buy another for $" + gameData.lineWriterPrice
		document.getElementById("money").innerHTML = "You have $" + gameData.money
	}
}

function tickLine() {
	gameData.lines += gameData.linesPerTick
	gameData.lines += gameData.lineWriter
        document.getElementById("linesWritten").innerHTML = gameData.lines + " lines written"
	document.getElementById("paragraphNumber").innerHTML = gameData.paragraphs + " paragraphs written"
	document.getElementById("money").innerHTML = "You have $" + gameData.money
}


var mainGameLoop = window.setInterval(function() {
	tickLine()
}, 1000)
