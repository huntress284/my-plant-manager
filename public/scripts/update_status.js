async function graveyard(){
    alert('Moving to graveyard.');
    id = document.querySelector('#graveyard').dataset.graveyard;

    console.log("Plant ID dead: " + document.querySelector('#graveyard').dataset.graveyard);

    const url = 'http://localhost:3001/api/plants';
    const options = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            plantId: id,
            status: 'dead'
        })
    };
    const response = await fetch(url, options);
    if (response.ok) {
        location.reload();
    }
}

async function greenhouse(){
    alert('Moving to greenhouse!');
    id = document.querySelector('#greenhouse').dataset.greenhouse;

    console.log("Greenhouse ID: " + document.querySelector('#greenhouse').dataset.graveyard);

    const url = 'http://localhost:3001/api/plants';
    const options = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            plantId: id,
            status: 'adult'
        })
    };
    const response = await fetch(url, options);
    if (response.ok) {
        location.reload();
    }
}

