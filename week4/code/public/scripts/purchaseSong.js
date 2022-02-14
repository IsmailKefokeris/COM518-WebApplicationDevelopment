import { searchArtist } from './searchArtist.js';

function purchaseSong(quantity, songID, artist) {
	if(quantity == 1){
		const response = fetch(`https://classcontainer-mpmyd.run-eu-central1.goorm.io/songs/buy/${songID}`, {method: "POST"})
		.then( response => response.json() )
		.then( message => {
			let html = ""

			if(response.status == 500) {
				document.getElementById("process").innerHTML = `Error with the process ${message.error}`;
			}
			document.getElementById(songID).innerHTML = message.quantity;

			html += message.message;

			document.getElementById("process").innerHTML = html;


		})
	}else if (quantity > 1){
		let quant = {"quantity": quantity};
		console.log(JSON.stringify(quant))

		const response = fetch(`https://classcontainer-mpmyd.run-eu-central1.goorm.io/songs/buy/multiple/${songID}`, {
			method: "POST",
			headers: {
			'Content-Type' : 'application/json'
			},
			body: JSON.stringify(quant)
		})
		.then( response => response.json() )
		.then( message => {
			
			let html = ""

			if(response.status == 500) {
				document.getElementById("process").innerHTML = `Error with the process ${message.error}`;
			}
			document.getElementById(songID).innerHTML = message.quantity;

			html += message.message;

			document.getElementById("process").innerHTML = html;
		
		})
	}
	
	
	
	
}


document.onclick = (event)=> {
	
	if (event===undefined) event= window.event;
	
	const songID = event.target.name;
	const purchase = event.target.id;
	const quantity = document.getElementById(`quantityOf${songID}`).value;
	
	const artist = document.getElementById("artist").value
	
	
	if (purchase == "purchase") {
		purchaseSong(quantity, songID, artist)
	}
};