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

    if (response.status != 200){

        alert("Not enough money! :( ");
    }

    console.log(response.status);

    const json = await response.json();

    // TODO: array of elements
    const common_name = json.common_name;
    const scientific_name = json.scientific_name;
    const propagation = json.propagation;
    const watering = json.watering;
    // const image = json.default_image.small_url;


    // const replacementPic = document.querySelector(`[value= "${x}"]`);
    // replacementPic.setAttribute("src", image);
    //
    // console.log("Value: " + image);


        console.log("You may pass");
        const hehe = document.querySelector(`[data-id= "${x}"]`);

        hehe.textContent = JSON.stringify("Common Name: " + common_name);
        hehe.append("Scientific name: " + scientific_name);
        hehe.append("Propagation Methods: " + propagation);
    // look into dataset mdn

}
