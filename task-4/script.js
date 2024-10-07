const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
// console.log(items)

const itemList = document.getElementById('itemList');
const searchInput = document.getElementById('searchInput');

function displayItems(filteredItems) {
    const fragment = document.createDocumentFragment();
    
    filteredItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        fragment.appendChild(listItem);
    });
    
    itemList.innerHTML = '';
    itemList.appendChild(fragment);
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            // func.apply(null, args);
            func(...args);
        }, delay);
    };
}

function filterItems() {
    const query = searchInput.value.toLowerCase().trim();
    // console.log(query)
    const filteredItems = items.filter(item => item.toLowerCase().includes(query));
    // console.log(filteredItems)

    displayItems(filteredItems);
}

searchInput.addEventListener('input', debounce(filterItems, 300));

displayItems(items);
