
/*
function findArtist(artistName) {
    const response = fetch(`http://localhost:3000/hometown/${artistName}`)
                     .then( response => response.json() )
                     .then( artistInfo => {
                         artistInfo.forEach(artist => {

                            // alert(`Artist: ${artist} = Lat: ${artst.lat} Long: ${artst.lon} and hometown: ${artst.hometown}`);
                            const map = L.map("map1");

                            const artistTown = L.circle([artist.lat, artist.lon], { 
                                radius:100, 
                                fillColor: 'red', 
                                color: 'blue', 
                                opacity: 0.5 }).addTo(map);

                            artistTown.bindPopup(`${artist.hometown}`);
                         })
                        
                     })
}

document.getElementById('FindHome').addEventListener('click', ()=> {
    // Read the product type from a text field
    const artistName = document.getElementById('artist').value;
    findArtist(artistName);
});
*/