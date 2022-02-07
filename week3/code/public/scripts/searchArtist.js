

function searchArtist(artist) {
	const response = fetch(`https://classcontainer-mpmyd.run-eu-central1.goorm.io/songs/artist/${artist}`)
					 .then( response => response.json() )
					 .then( songs => {
						let html = "";
						songs.forEach ( song => {
							html += 
								`
								<tr>
								  <th scope="row">${song.title}</th>
								  <td>${song.artist}</td>
								  <td>${song.day}-${song.month}-${song.year}</td>
								  <td>${song.quantity}</td>
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