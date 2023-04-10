async function get_info(id, x) {
    console.clear();
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
            method: 'POST', headers: {
                'content-type': 'application/json'
            }, body: JSON.stringify({
                plantId: parsed, plantName: plantName.value, status: status.value
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
        method: 'DELETE', headers: {
            'content-type': 'application/json'
        }, body: JSON.stringify({
            plantId: id
        })
    };
    const response = await fetch(url, options);
    if (response.ok) {
        location.reload();
    }
}

async function water(id) {

    console.log("Plant ID to water: " + id);
    const today = new Date().toLocaleDateString();

    const url = 'http://localhost:3001/api/plants:id';
    const options = {
        method: 'PUT', headers: {
            'content-type': 'application/json'
        }, body: JSON.stringify({
            plantId: id, plantName: today
        })
    };
    const response = await fetch(url, options);
    if (response.ok) {
        location.reload();
    }

}


async function test_loader(x) {
    console.log("loader id :" + x);
    var myVar;
    myVar = setTimeout(showInfo, 1000);
    document.querySelector(`[loader= "${x}"]`).style.display = "block";
}


async function filter(x) {

    console.log(x)


    if (x === 'asc') {
        const selector = element => element.querySelector('#plant-name').innerText;

        const ascendingOrder = true;

        const isNumeric = false;

        const elements = [...document.querySelectorAll('.col')];

        const parentElement = elements[0].parentNode;

        const collator = new Intl.Collator(undefined, {numeric: isNumeric, sensitivity: 'base'});

        elements
            .sort((elementA, elementB) => {
                const [firstElement, secondElement] = ascendingOrder ? [elementA, elementB] : [elementB, elementA];
                const textOfFirstElement = selector(firstElement);
                const textOfSecondElement = selector(secondElement);
                return collator.compare(textOfFirstElement, textOfSecondElement)
            })
            .forEach(element => parentElement.appendChild(element));
        console.log('Sorted A-Z')
    } else if (x === 'desc') {
        const selector = element => element.querySelector('#plant-name').innerText;

        const ascendingOrder = false;

        const isNumeric = false;

        const elements = [...document.querySelectorAll('.col')];

        const parentElement = elements[0].parentNode;

        const collator = new Intl.Collator(undefined, {numeric: isNumeric, sensitivity: 'base'});

        elements
            .sort((elementA, elementB) => {
                const [firstElement, secondElement] = ascendingOrder ? [elementA, elementB] : [elementB, elementA];
                const textOfFirstElement = selector(firstElement);
                const textOfSecondElement = selector(secondElement);
                return collator.compare(textOfFirstElement, textOfSecondElement)
            })
            .forEach(element => parentElement.appendChild(element));
        console.log('Sorted Z-A')
    }
}

async function check_water() {
    // alert('checking last waters...');
    console.log('loaded script');

    const url = 'http://localhost:3001/api/plants';
    const options = {
        method: 'GET'
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        console.log(response.status);
    }
    const json = await response.json();

    console.log(json);

    const today = new Date().toISOString().slice(0, 10);


    for (let i = 0; i < json.length; i++) {

        // console.log("loop: " + json[i][3]);
        console.log(json[i][0]);

        if (json[i][3] === today) {
            // console.log('you watered today!');
            // document.querySelector(`[water-time= "${json[i][0]}"]`).innerText = 'You watered today!';



            console.log("if today: " + json[i][0]);
            document.querySelector(`[water-alert= "${json[i][0]}"]`).classList.add('alert-primary');
            document.querySelector(`[water-alert= "${json[i][0]}"]`).prepend('Watered Today!')
            document.querySelector(`[water-last= "${json[i][0]}"]`).style.display = "block";

        }

        else if(json[i][3] === null){
            // document.querySelector(`[water-time= "${json[i][0]}"]`).innerText = 'Never watered!';
            // console.log("if null: " + json[i][0]);


            // document.querySelector(`[water-alert= "${json[i][0]}"]`).classList.add('alert-secondary');
            // document.querySelector(`[water-last= "${json[i][0]}"]`).style.display = "block";

        }

        else {
            var date1 = new Date(json[i][3]);
            var date2 = new Date(today);
            var Difference_In_Time = date2.getTime() - date1.getTime();
            // To calculate the no. of days between two dates
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
            //To display the final no. of days (result)
            console.log("Total number of days between dates"
                + date1 + "and"
                + date2 + "is:"
                + Difference_In_Days);


            document.querySelector(`[water-time= "${json[i][0]}"]`).innerText = "It has been " + Difference_In_Time + "days since last water";

            document.querySelector(`[water-alert= "${json[i][0]}"]`).classList.add('alert-danger');

            document.querySelector(`[water-last= "${json[i][0]}"]`).style.display = "block";

        }
    }

}






