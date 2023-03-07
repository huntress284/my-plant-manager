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
    document.getElementById('total').innerHTML = "Total Number: " + json.total;

    if(json.total == 0){
        console.log("Not in the API :(");
        const none = document.getElementById('noneReturned');
        none.innerText = "Plant isn't in API, add new here." + "\n";
    }

    // TODO: fix layout
    // link to plant to add id, name, etc
    let list = document.getElementById('demo');
    for (let i = 0; i < json.total; i++) {
        // console.log(json.data[i].id);

        let li = document.createElement("li");
        let button = document.createElement("button");
        button.setAttribute('id', 'theButton');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#exampleModal');

        li.innerText = "Plant ID: " + json.data[i].id + " Plant Common Name: " + json.data[i].common_name;

        li.appendChild(button).innerHTML = "Add this plant!";
        list.appendChild(li);



    }

}