async function get_info(id, x) {

    console.log(id, x);

    // If plant's ID is null (was not created with API ID)
    if (x === null) {

        document.querySelector(`[plantInformation= "${id}"]`).innerHTML = ' No information from API :( '

    } else {
        x.toString();
        console.log("Card ID: " + id);

        var myVar;
        myVar = setTimeout(showInfo, 1000);
        document.querySelector(`[loader= "${id}"]`).style.display = "block";

        // PLANT DETAILS
        const url = "https://perenual.com/api/species/details/" + x + "?key=sk-8k2463e99f604d8a438";
        const options = {
            method: 'GET'
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            console.log(response.status);
            document.getElementById("overlay").style.display = "block";
        }
        const json = await response.json();


        // TODO: array of elements
        const common_name = json.common_name;
        const scientific_name = json.scientific_name;
        const propagation = json.propagation;
        const watering = json.watering;
        const sunlight = json.sunlight;

        // Clear innerHTML if it is already there
        document.querySelector(`[commonName= "${id}"]`).innerHTML = '';
        document.querySelector(`[scientific= "${id}"]`).innerHTML = '';
        document.querySelector(`[sunlight= "${id}"]`).innerHTML = '';
        document.querySelector(`[watering= "${id}"]`).innerHTML = '';
        document.querySelector(`[propagation= "${id}"]`).innerHTML = '';
        //--------------------------------------------------------------------
        // Add details and show
        document.querySelector(`[commonName= "${id}"]`).append(common_name);
        document.querySelector(`[scientific= "${id}"]`).append(scientific_name);
        document.querySelector(`[sunlight= "${id}"]`).append(sunlight);
        document.querySelector(`[watering= "${id}"]`).append(watering);
        document.querySelector(`[propagation= "${id}"]`).append(propagation);

        document.querySelector(`[info= "${id}"]`).style.display = "block";

        async function showInfo() {
            document.querySelector(`[loader= "${id}"]`).style.display = "none";
            document.querySelector(`[info= "${id}"]`).style.display = "block";
        }
    }
}



// Delete Plant
async function removePlant(x) {
    console.log("Plant ID to delete: " + x);
    const url = 'http://localhost:3001/api/plants';
    const options = {
        method: 'DELETE', headers: {
            'content-type': 'application/json'
        }, body: JSON.stringify({
            plantId: x
        })
    };
    const response = await fetch(url, options);
    if (response.ok) {
        location.reload();
    }
}



// Loader function
async function test_loader(x) {
    console.log("loader id :" + x);
    var myVar;
    myVar = setTimeout(showInfo, 1000);
    document.querySelector(`[loader= "${x}"]`).style.display = "block";
}



// Function to close pop-ups
async function off(x, y) {

    // console.log("close id: " + x);
    // console.log('banner id: ' + y);
    if (y === 'banner') {
        document.querySelector(`[water-last= "${x}"]`).style.display = "none";
    }
    // document.querySelector(`[info= "${x}"]`).style.display = "none";
}

async function param(data){
    // alert('hello')

    location.search = new URLSearchParams(data);
}




