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

    if (json.total == 0) {
        console.log("Not in the API :(");
        const none = document.getElementById('noneReturned');
        none.innerText = "Plant isn't in API, add new here." + "\n";
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