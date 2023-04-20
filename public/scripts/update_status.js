async function graveyard(x){
    alert('Moving to graveyard.');
    // id = document.querySelector('#graveyard').dataset.graveyard;

    console.log("Plant ID dead: " + x);

    const url = 'http://localhost:3001/api/plants';
    const options = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            plantId: x,
            status: 'dead'
        })
    };
    const response = await fetch(url, options);
    if (response.ok) {
        location.reload();
    }
}

async function greenhouse(x){
    console.log("Greenhouse ID: " + x);

    const url = 'http://localhost:3001/api/plants';
    const options = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            plantId: x,
            status: 'adult'
        })
    };
    const response = await fetch(url, options);
    if (response.ok) {
        location.reload();
    }
}

async function rename_plant(){
    alert('renaming...')


}
