

function searchArtist(artist) {
	const response = fetch(`https://classcontainer-mpmyd.run-eu-central1.goorm.io/songs/artist/${artist}`)
					 .then( response => response.json() )
					 .then( songs => {
						let html = "";
						 
						songs.forEach ( song => {
							/* Using DOM to create html
							html = document.createElement("tr");
							
							let songName = document.createElement("th");
							let songText = document.createTextNode(`${song.title}`);
							songName.appendChild(songText);
							html.appendChild(songName);
							
							let row = document.createElement("td");
							let rowText = document.createTextNode(`${song.artist}`);
							row.appendChild(rowText);
							html.appendChild(row);
							
							row = document.createElement("td");
							rowText = document.createTextNode(`${song.day}-${song.month}-${song.year}`);
							row.appendChild(rowText);
							html.appendChild(row);
							
							row = document.createElement("td");
							rowText = document.createTextNode(`${song.quantity}`);
							row.setAttribute("id", `${song.ID}`);
							row.appendChild(rowText);
							html.appendChild(row);
							
							row = document.createElement("td");
							let button = document.createElement("input");
							button.setAttribute("value", "Buy");
							button.setAttribute("type", "button");
							button.setAttribute("name", `${song.ID}`);
							button.setAttribute("id", "purchase");
							button.setAttribute("class", "btn btn-primary");
							
							row.appendChild(button);
							html.appendChild(row)
							
							document.getElementById('results').appendChild(html);
							*/
							/* Writing html code out */
							html += 
								`
								<tr>
								  <th scope="row">${song.title}</th>
								  <td>${song.artist}</td>
								  <td>${song.day}-${song.month}-${song.year}</td>
								  <td id="${song.ID}">${song.quantity}</td>
								  <td> <input type="number" id="quantityOf${song.ID}"> </td>
								  <td> <button type="button" id="purchase" name="${song.ID}" class="btn btn-primary">Buy</button></td>
								</tr>
								`
							
						});
						document.getElementById('results').innerHTML = html;
					});
}


document.getElementById('searchArtist').addEventListener('click', ()=> {
    // Read the product type from a text field
    const artistName = document.getElementById('artist').value;
    searchArtist(artistName);
});

export { searchArtist };