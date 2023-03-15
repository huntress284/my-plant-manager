async function get_info(x) {
    console.clear();
    x.toString();
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

    // Show element
    document.querySelector(`[blockID= "${x}"]`).style.display = "block";
    // Add details and show
    document.querySelector(`[commonName= "${x}"]`).append(common_name);
    document.querySelector(`[scientific= "${x}"]`).append(scientific_name);
    document.querySelector(`[sunlight= "${x}"]`).append(sunlight);
    document.querySelector(`[watering= "${x}"]`).append(watering);
    document.querySelector(`[propagation= "${x}"]`).append(propagation);
}

async function addPlant() {
    let plantID = document.getElementById("plantId");
    let plantName = document.getElementById("plantInput");
    let parsed = parseInt(plantID.value);

    // Alert box
    if (plantID.value == "" || plantName.value == "") {
        // alert("Ensure you input a value in both fields!");
    } else {
        console.log(
            `plantID : ${plantID.value}, name: ${plantName.value}`
        );


        // Adds plant to DB with ID and PlantName
        const url = 'http://localhost:3001/api/plants';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                plantId: parsed,
                plantName: plantName.value
            })
        };
        const response = await fetch(url, options);
        if (response.ok) {
            // Calls photo form
            // TODO: send plant name
            document.getElementById('form2').submit();
            location.reload();
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
