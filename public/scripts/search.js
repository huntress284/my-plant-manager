async function searchPlant() {

    document.getElementById('demo').innerText = '';
    document.getElementById('noneReturned').innerText = '';

    var x = document.getElementById("mySearch").value;
    // console.log("search value: " + x);

    const url = "https://perenual.com/api/species-list?key=sk-8k2463e99f604d8a438&q=" + x;
    const options = {
        method: 'GET'
    };

    const response = await fetch(url, options);
    const json = await response.json();

    // console.log("Total plants returned: " + json.total);
    document.getElementById('total').innerHTML = "Plants: " + json.total;


    // TODO: logic for if the plant isn't listed
    if (json.total === 0) {

        console.log("Not in the API :(");
        const none = document.getElementById('noneReturned');
        none.innerText = "Plant isn't in API? add new here." + "\n";

        let noAPI = document.getElementById("noAPI").style.display = 'block';

        document.getElementById("noAPI").setAttribute('data-bs-toggle', 'modal');
        document.getElementById("noAPI").setAttribute('data-bs-target', '#exampleModal1');


        document.getElementById('plantId1').setAttribute('value', null);
        document.getElementById('plantId1').setAttribute('disabled', 'true');

    }

    // TODO: fix layout
    // link to plant to add id, name, etc
    let list = document.getElementById('demo');
    for (let i = 0; i < json.total; i++) {

        let li = document.createElement("li");
        let button = document.createElement("button");
        button.setAttribute('id', 'theButton');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#exampleModal');
        button.setAttribute('data-id', json.data[i].id);
        // button.setAttribute('data-name', json.data[i].common_name);

        li.innerText = " Plant Common Name: " + json.data[i].common_name;
        li.appendChild(button).innerHTML = "Add this plant!";
        list.appendChild(li);
        console.log(json.data[i].id);


        const buttons = document.getElementsByTagName('button');
        const result = document.getElementById('result');


        const buttonPressed = e => {

            console.log(e.target.dataset);

            document.getElementById('plantId').setAttribute('value', e.target.dataset.id);
            document.getElementById('plantId').setAttribute('disabled', 'true');
            // document.getElementById('plantInput').setAttribute('value', e.target.dataset.id);
        }

        for (let button of buttons) {
            button.addEventListener("click", buttonPressed);
        }
    }
}


async function searchy(id) {

    console.log("searchy id: " + id)

    const url = "https://perenual.com/api/species/details/" + id + "?key=sk-8k2463e99f604d8a438";
    const options = {
        method: 'GET'
    };
    const response = await fetch(url, options);

    if (!response.ok) {
        console.log(response.status);

        document.getElementById('commonName1').innerText = 'N/A';
        document.getElementById('scientific1').innerText = 'N/A';
        document.getElementById('sunlight1').innerText = 'N/A';
        document.getElementById('watering1').innerText = 'N/A';
        document.getElementById('propagation1').innerText = 'N/A';

    } else {
        const json = await response.json();

        // TODO: array of elements
        const common_name = json.common_name;
        const scientific_name = json.scientific_name;
        const propagation = json.propagation;
        const watering = json.watering;
        const sunlight = json.sunlight;

        document.getElementById('commonName1').innerText = common_name;
        document.getElementById('scientific1').innerText = scientific_name;
        document.getElementById('sunlight1').innerText = sunlight;
        document.getElementById('watering1').innerText = watering;
        document.getElementById('propagation1').innerText = propagation;


        console.log("outputs: " + common_name, scientific_name)
    }

}