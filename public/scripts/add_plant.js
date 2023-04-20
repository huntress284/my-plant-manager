// If plant does not have API ID
async function addNoAPI() {

    let plantName = document.getElementById("plantInput1");
    console.log("Plant Name " + plantName)
    let status = document.getElementById("status1");
    console.log(status.value);
    // let parsed = parseInt(plantID.value);
    let nameParse = toString(plantName.value);
    let statusParse = toString(status.value);

    // Alert box
    if (plantName.value == "") {
        alert("Ensure you input a value in both fields!");
    } else {
        console.log(`name: ${plantName.value}`);
        console.log(typeof nameParse);

        // Adds plant to DB with ID and PlantName
        const url = 'http://localhost:3001/api/plants';
        const options = {
            method: 'POST', headers: {
                'content-type': 'application/json'
            }, body: JSON.stringify({
                plantId: null,
                plantName: plantName.value,
                status: status.value
            })
        };
        const response = await fetch(url, options);
        if (response.ok) {
            // Calls photo form

            const replace = document.getElementById('replace');
            replace.setAttribute('value', plantName.value);
            // console.log(plantName.value)


            console.log(replace.getAttribute('value'))

            document.getElementById('form21').submit();
        }
    }
}

// Plant added with API ID
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
        console.log(`plantID : ${plantID.value}, name: ${plantName.value}`);
        console.log(typeof nameParse);
        // Adds plant to DB with ID and PlantName
        const url = 'http://localhost:3001/api/plants';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }, body: JSON.stringify({
                plantId: parsed,
                plantName: plantName.value,
                status: status.value
            })
        };
        const response = await fetch(url, options);
        if (response.ok) {
            // Calls photo form

            const replace = document.getElementById('plantAPI');
            replace.setAttribute('value', plantName.value);
            // console.log(plantName.value)


            console.log(replace.getAttribute('value'))

            setTimeout(2000)
            document.getElementById('form2').submit();
        }
    }
}