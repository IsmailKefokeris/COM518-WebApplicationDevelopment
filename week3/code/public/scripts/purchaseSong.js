import { searchArtist } from './searchArtist.js';

function purchaseSong(songID, artist) {
	const response = fetch(`https://classcontainer-mpmyd.run-eu-central1.goorm.io/songs/buy/${songID}`, {method: "POST"})
	.then( response => response.json() )
	.then( message => {
		let html = ""
		
		html += message.message;
		
		document.getElementById("process").innerHTML = html;
		
		
    	searchArtist(artist)
		
	} )
}


document.onclick = (event)=> {
	
	if (event===undefined) event= window.event;
	
	const songID = event.target.name;
	const purchase = event.target.id;
	const artist = document.getElementById("artist").value
	
	
	if (purchase == "purchase") {
		purchaseSong(songID, artist)
	}
};