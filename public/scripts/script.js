async function get_info(x) {
    console.clear();
    x.toString();
    const val = x;
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

    document.querySelector(`[commonName= "${x}"]`).innerText = "Common Name: " + common_name;
    document.querySelector(`[scientific= "${x}"]`).innerText = "Scientific Name: " + scientific_name;
    document.querySelector(`[sunlight= "${x}"]`).innerText = "Sunlight: " + sunlight;
    document.querySelector(`[watering= "${x}"]`).innerText = "Watering: " + watering;
    document.querySelector(`[propagation= "${x}"]`).innerText = "Propagation Methods: " + propagation;
}

async function addPlant() {

    let plantID = document.getElementById("plantId");
    let plantName = document.getElementById("plantInput");
    // plantName.toString();

    let parsed = parseInt(plantID.value);
    let nameParse = toString(plantName.value);
    //
    if (plantID.value == "" || plantName.value == "") {
        alert("Ensure you input a value in both fields!");
    } else {
        // alert("This form has been successfully submitted!");
        console.log(
            `plantID : ${plantID.value}, name: ${plantName.value}`
        );

        console.log(typeof nameParse);

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
                // console.log("succesful plant load");
                location.reload();
            }
    }
}

async function removePlant(id) {

    console.log("Plant ID to delete: " + id);
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
