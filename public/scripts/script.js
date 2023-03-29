async function get_info(id, x) {
    console.clear();
    x.toString();

    console.log("Card ID: " + id);

    var myVar;
    myVar = setTimeout(showInfo, 1000);
    document.getElementById("loader").style.display = "block";



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

    async function showInfo() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("info").style.display = "block";
    }

}


async function addPlant() {
    let plantID = document.getElementById("plantId");
    let plantName = document.getElementById("plantInput");
    let status = document.getElementById("status");
    console.log(status.value);
    let parsed = parseInt(plantID.value);
    let nameParse = toString(plantName.value);
    let statusParse = toString(status.value);

    // Alert box
    if (plantID.value == "" || plantName.value == "") {
        alert("Ensure you input a value in both fields!");
    } else {
        console.log(
            `plantID : ${plantID.value}, name: ${plantName.value}`
        );
        console.log(typeof nameParse);
        // Adds plant to DB with ID and PlantName
        const url = 'http://localhost:3001/api/plants';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                plantId: parsed,
                plantName: plantName.value,
                status: status.value
            })
        };
        const response = await fetch(url, options);
        if (response.ok) {
            // Calls photo form
            document.getElementById('form2').submit();
        }
    }
}

async function removePlant() {
    id = document.querySelector('#toDelete').dataset.uuid;
    console.log("Plant ID to delete: " + document.querySelector('#toDelete').dataset.uuid);
    const url = 'http://localhost:3001/api/plants';
    const options = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            plantId: id
        })
    };
    const response = await fetch(url, options);
    if (response.ok) {
        location.reload();
    }
}

async function water() {
    const today = new Date().toLocaleDateString();
    // alert(today);

    id = document.querySelector('#toWater').dataset.water;
    console.log("Plant ID to water: " + document.querySelector('#toWater').dataset.water);

    const url = 'http://localhost:3001/api/plants:id';
    const options = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            plantId: id,
            plantName: today
        })
    };
    const response = await fetch(url, options);
    if (response.ok) {
        location.reload();
    }

}


async function test_loader(){
    const x = document.querySelector('#loader').dataset.loader;

    console.log("ugh :" + x);
    var myVar;
    myVar = setTimeout(showInfo, 1000);
    document.getElementById("loader").style.display = "block";

    async function showInfo() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("info").style.display = "block";
    }
}

