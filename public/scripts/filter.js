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