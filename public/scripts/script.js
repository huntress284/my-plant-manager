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

// Water plant
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

async function add_note(x, y) {

    console.log("id of button: " + x)
    console.log("note for specific: " + y)



    const note = document.querySelector(`[data-noteID= "${x}"]`).value;
    // // note
    console.log("should be: " + note);

    const url = 'http://localhost:3001/api/plants/notes';
    const options = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            plantId: x,
            note: note
        })
    };
    const response = await fetch(url, options);
    if (response.ok) {
        location.reload();
    }



    // console.log(document.querySelector(`[data-notemodal= "${x}"]`).innerHTML)
    // document.querySelector(`[data-notemodal= "${x}"]`).innerHTML = "inner";


    // console.log(document.querySelector(`[data-notemodal= "${x}"]`))
    // const text = document.querySelector(`[data-notemodal= "${x}"]`);
    // console.log(text.getAttribute('value'))
    //
    // const inner = text.getAttribute('value')
    // document.querySelector(`[data-notemodal= "${x}"]`).innerHTML = note;


}

// Loader function
async function test_loader(x) {
    console.log("loader id :" + x);
    var myVar;
    myVar = setTimeout(showInfo, 1000);
    document.querySelector(`[loader= "${x}"]`).style.display = "block";
}

// Plant filter
async function filter(x) {

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


// TODO: message only shows once? not every reload?
//  disappears after amount of seconds?

async function check_water() {
    // alert('checking last waters...');
    // console.log('loaded script');

    const url = 'http://localhost:3001/api/plants';
    const options = {
        method: 'GET'
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        console.log(response.status);
    }
    const json = await response.json();

    // console.log(json);

    var date = new Date();
    var year = date.toLocaleString("default", {year: "numeric"});
    var month = date.toLocaleString("default", {month: "2-digit"});
    var day = date.toLocaleString("default", {day: "2-digit"});
    var today = year + "-" + month + "-" + day;
    // console.log("Today's date: " + today);  // Prints: 2022-05-04

    for (let i = 0; i < json.length; i++) {

        if (json[i][3] === today) {


            // console.log('you watered today!');
            // document.querySelector(`[water-time= "${json[i][0]}"]`).innerText = 'You watered today!';


            console.log("if today: " + json[i][0]);
            document.querySelector(`[water-alert= "${json[i][0]}"]`).classList.add('alert-primary');
            document.querySelector(`[water-alert= "${json[i][0]}"]`).prepend('Watered Today!')
            document.querySelector(`[water-last= "${json[i][0]}"]`).style.display = "block";

        } else if (json[i][3] === null) {
            // document.querySelector(`[water-time= "${json[i][0]}"]`).innerText = 'Never watered!';
            // console.log("if null: " + json[i][0]);


            // document.querySelector(`[water-alert= "${json[i][0]}"]`).classList.add('alert-secondary');
            // document.querySelector(`[water-last= "${json[i][0]}"]`).style.display = "block";

        } else {
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

            if (Difference_In_Days >= 7) {
                // document.querySelector(`[water-time= "${json[i][0]}"]`).innerText = "It has been " + Difference_In_Days + "days since last water";

                document.querySelector(`[water-alert= "${json[i][0]}"]`).classList.add('alert-danger');
                document.querySelector(`[water-alert= "${json[i][0]}"]`).prepend("It has been " + Difference_In_Days + " days since last water");
                document.querySelector(`[water-last= "${json[i][0]}"]`).style.display = "block";
            }
        }
    }

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




