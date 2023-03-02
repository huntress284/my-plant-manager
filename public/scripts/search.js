async function searchPlant() {

    // TODO : add variable so search works
    var x = document.getElementById("mySearch").value;
    console.log("search value: " + x);
    // document.getElementById("demo").innerHTML = "Plant searched: " + x;

    const url = "https://perenual.com/api/species-list?key=sk-8k2463e99f604d8a438&q=" + x;

    const options = {
        method: 'GET'
    };

    const response = await fetch(url, options);
    const json = await response.json();
    const body = JSON.stringify(json);

    console.log("Total plants returned: " + json.total);
    document.getElementById('total').innerHTML = "Total Number: " + json.total;

    if(json.total == 0){
        console.log("There are no plants!");
    //    would you like to add a plant
    //    box to add name, specific ID, add piccy 

    }

    for (let i = 0; i < json.total; i++) {
        console.log(json.data[i].common_name + i);
        document.getElementById('demo').append(JSON.stringify("[" + " ID: " + json.data[i].id + " Common Name: " + json.data[i].common_name) + "],");
    }
}