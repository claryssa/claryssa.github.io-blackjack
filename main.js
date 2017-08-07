
var deck = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

var cards = ["images/cards/ace.svg", "images/cards/2.svg", "images/cards/3.svg", "images/cards/4.svg", "images/cards/5.svg", "images/cards/6.svg", "images/cards/7.svg", "images/cards/8.svg", "images/cards/9.svg", "images/cards/10.svg", "images/cards/jack.svg", "images/cards/queen.svg", "images/cards/king.svg"];

var earnings = 0;

function deal(){
	var index = Math.floor(Math.random()*deck.length)
	var card = deck[index];
	var cardImg = cards[index]
	return [card, cardImg];
}

function evaluate(array){
	var total = 0;
	for(var i = 0; i < array.length; i++){
		if(array[i] == "J" || array[i] == "Q" || array[i] == "K"){
			total += 10;
		}
		else if(array[i] == "A"){
			if(total + 11 > 21){
				total += 1;
			}
			else{
				total += 11;
			}
		}
		else{
			total += parseInt(array[i]);
		}
	}
	return total;
}

var dealer = [];
var player = [];

var dcards = [];
var pcards = [];

function displayCard(src) {
    var img = document.createElement("img");
    img.src = src;

    //img.width = width;
    //img.height = height;

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);


}

function start(){
	document.getElementById("pusheen").src = "images/fancy.png";

	document.getElementById("pcard3").src = " ";
	document.getElementById("status").innerHTML = " ";
	dealer = [];
	player = [];

	var card = deal();
	dealer.push(card[0]);
	document.getElementById("dcard1").src = card[1];


	card = deal();
	dealer.push(card[0]);
	document.getElementById("dcard2").src = card[1];

	card = deal();
	player.push(card[0]);
	document.getElementById("pcard1").src = card[1];

	card = deal();
	player.push(card[0]);
	document.getElementById("pcard2").src = card[1];


	var dscore = evaluate(dealer);
	var pscore = evaluate(player);

	document.getElementById("dScore").innerHTML = "Dealer Score: " + dscore;
	document.getElementById("pScore").innerHTML = "My Score: " + pscore;

	//Start: win with automatic 21
	if(pscore == 21){
		document.getElementById("status").innerHTML = "You win!";
		var bet = document.getElementById("bet").value;
		earnings += parseInt(bet);
		document.getElementById("earnings").innerHTML = "Total Earnings: $ " + parseInt(earnings)
		document.getElementById("pusheen").src = "images/meGusta.gif";

	}

	else if(dscore == 21){
		document.getElementById("status").innerHTML = "You lose!";
		var bet = document.getElementById("bet").value;
		earnings -= parseInt(bet);
		document.getElementById("earnings").innerHTML = "Total Earnings: $ " + parseInt(earnings)
		document.getElementById("pusheen").src = "images/sleeping.png";

	}
}

function hit(){
	var card = deal();
	player.push(card[0]);
	document.getElementById("pcard3").src = card[1];

	var pscore = evaluate(player);
	var dscore = evaluate(dealer);
	document.getElementById("dScore").innerHTML = "Dealer Score: " + dscore;
	document.getElementById("pScore").innerHTML = "My Score: " + pscore;
	
	//Hit: win with 21, lose if bust
	if(pscore > 21){
		document.getElementById("status").innerHTML = "Bust!";
		var bet = document.getElementById("bet").value;
		earnings -= parseInt(bet);
		document.getElementById("earnings").innerHTML = "Total Earnings: $ " + parseInt(earnings)
		document.getElementById("pusheen").src = "images/sleeping.png";

	}
	else if(pscore == 21){
		document.getElementById("status").innerHTML = "You win!";
		var bet = document.getElementById("bet").value;
		earnings += parseInt(bet);
		document.getElementById("earnings").innerHTML = "Total Earnings: $ " + parseInt(earnings)
		document.getElementById("pusheen").src = "images/boss.gif";

	}
}

function stay(){
	var dscore = evaluate(dealer);
	var pscore = evaluate(player);

	document.getElementById("dScore").innerHTML = "Dealer Score: " + dscore;
	document.getElementById("pScore").innerHTML = "My Score: " + pscore;
	
	//Stay: win with largest number
	if(pscore > dscore){
		document.getElementById("status").innerHTML = "You win!";
		var bet = document.getElementById("bet").value;
		earnings += parseInt(bet);
		document.getElementById("earnings").innerHTML = "Total Earnings: $ " + parseInt(earnings)
		document.getElementById("pusheen").src = "images/meGusta.gif";

	}
	else if(pscore == dscore){
		document.getElementById("status").innerHTML = "Draw!";
		document.getElementById("earnings").innerHTML = "Total Earnings: $ " + parseInt(earnings);
		document.getElementById("pusheen").src = "images/harry.gif";

	}
	else{
		document.getElementById("status").innerHTML = "You lose!";
		var bet = document.getElementById("bet").value;
		earnings -= parseInt(bet);
		document.getElementById("earnings").innerHTML = "Total Earnings: $ " + parseInt(earnings)
		document.getElementById("pusheen").src = "images/sleeping.png";

	}
}


function change(){
	if(document.getElementById("bread").check){
		document.getElementById("default").src = "images/bread.png";
		document.getElementById("pusheen").src = "images/bread.png";
	}
	else if(document.getElementById("leftright").check){
		document.getElementById("default").src = "images/leftright.gif";
		document.getElementById("pusheen").src = "images/leftright.gif";
	}
	else if(document.getElementById("pizza").check){
		document.getElementById("default").src = "images/pizza.png";
		document.getElementById("pusheen").src = "images/pizza.png";
	}
	else if(document.getElementById("computer").check){
		document.getElementById("default").src = "images/computer.gif";
		document.getElementById("pusheen").src = "images/computer.gif";
	}
	else if(document.getElementById("all").check){
		document.body.style.backgroundImage = "url('background2')";
	}
	else if(document.getElementById("all").check){
		document.body.style.backgroundImage = "url('background3')";
	}
}
