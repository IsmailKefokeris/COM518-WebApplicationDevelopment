const map = L.map ("map1");

const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";


L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib } ).addTo(map);

// latitude(North(+)/South(-)), longitude(East(+)/West(-)).
map.setView([39.2477, 21.1614], 2);

function setNewMarker(lat, lon, popup) {
    console.log("Marker set");

    const marker = L.circle([lat, lon], { 
        radius:100, 
        fillColor: 'red', 
        color: 'blue', 
        opacity: 0.5 }).addTo(map);
    
    marker.bindPopup(`${popup}`);

}



function findArtist(artistName) {
    const response = fetch(`http://localhost:3000/hometown/${artistName}`)
                     .then( response => response.json() )
                     .then( artistInfo => {
                         artistInfo.forEach(artist => {

                            // alert(`Artist: ${artist} = Lat: ${artst.lat} Long: ${artst.lon} and hometown: ${artst.hometown}`);

                            const artistTown = L.circle([artist.lat, artist.lon], { 
                                radius:100, 
                                fillColor: 'red', 
                                color: 'blue', 
                                opacity: 0.5 }).addTo(map);

                            artistTown.bindPopup(`${artist.hometown}`);

                            map.panTo([artist.lat, artist.lon]);
                         })
                        
                     })
}

document.getElementById('FindHome').addEventListener('click', ()=> {
    // Read the product type from a text field
    const artistName = document.getElementById('artist').value;
    findArtist(artistName);
});



const village = L.circle([39.2477, 21.1614], { 
    radius:100, 
    fillColor: 'red', 
    color: 'blue', 
    opacity: 0.5 }).addTo(map);

village.bindPopup("Village from Greece");

map.on("click", e=> {
    const newMarker = L.circle([e.latlng.lat, e.latlng.lng], { 
        radius:100, 
        fillColor: 'red', 
        color: 'blue', 
        opacity: 0.5 }).addTo(map);
})
