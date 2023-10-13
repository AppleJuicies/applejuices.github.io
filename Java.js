let isActive = false;
let availableColors = [
    "#001219", "#005f73", "#0a9396", "#94d2bd", 
    "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", 
    "#ae2012", "#9b2226"
];

function getRandomColor() {
    if(availableColors.length === 0) return '#000000'; 
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const color = availableColors[randomIndex];
    availableColors.splice(randomIndex, 1); 
    return color;
}

//when going back home

function resetPage() {
    state.homePageActive = true;
    state.activePage = undefined;
    
    document.body.style.backgroundColor = 'rgb(255, 255, 255)';
    document.body.classList.remove('fade');
    
    document.querySelectorAll('.poly').forEach(function(polygon) {
        polygon.classList.remove("inactive");
    });
    
    document.querySelectorAll('.page-button').forEach(btn => {
        btn.classList.remove("inactive");
    });

    document.getElementsByClassName('title')[0].classList.remove('inactive');
    

    availableColors = [
        "#001219", "#005f73", "#0a9396", "#94d2bd", 
        "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", 
        "#ae2012", "#9b2226"
    ];
}

const state = {
    homePageActive: true,
    activePage: undefined
};

function searchFunction() {
    const searchContainer = document.getElementById("search-container");
    const input = document.getElementById("search");
    const value = input.value.toLowerCase();

    if(value.length < 2) return;
    
    /* Do the search */
    const results = [];
    document.querySelectorAll("[data-search]").forEach(element => {
        if(element.innerText.toLowerCase().includes(value)) {
            const index = element.innerText.toLowerCase().indexOf(value);
            const padSize = 8;
            const leftIndex = Math.max(index - padSize, 0);
            const rightIndex = Math.min(index + value.length + padSize, element.innerText.length);

            results.push({
                page: element.getAttribute('data-search'),
                text: element.innerText.slice(leftIndex, rightIndex)
            });
        }

        if(results.length >= 10) return;
    });
    
    while (searchContainer.childElementCount > 1) {
        searchContainer.removeChild(searchContainer.lastChild);
    }

    results.forEach(result => {
        const {page, text} = result;

        const resultElement = document.createElement('a');
        resultElement.innerHTML = `<span class="highlight">${page}:</span> ${text.toLowerCase().replace(value, `<strong>${value}</strong>`)}`;
        resultElement.href = "#";

        searchContainer.appendChild(resultElement);
    });
}

//function add when clicking smthing onto new page

function init() {
    document.querySelectorAll('.poly').forEach(function(polygon) {
        const color = getRandomColor();
        polygon.setAttribute('fill', color);
    
        const name = polygon.getAttribute('id').replace('-poly','');
        const buttonElement = document.getElementById(`${name}-button`);

    
        function handleClick(evt) {
            if(evt.target.nodeName === 'polygon' && !state.homePageActive) return;

            if(!state.homePageActive) {
                buttonElement.innerText = name.charAt(0).toUpperCase() + name.slice(1);
                document.getElementById(`${name}-content`)?.classList.add('inactive');            
                return resetPage();
            }    

            state.homePageActive = false;
            state.activePage = name;

            document.body.style.backgroundColor = color;
            document.body.classList.add('fade');

            // Change Button Text
            buttonElement.innerText = 'Home';

            document.getElementsByClassName('title')[0].classList.add('inactive');
            document.getElementsByClassName('title2')[0].classList.add('inactive');

            document.querySelectorAll('.poly').forEach(function(otherPolygon) {
                if (otherPolygon !== polygon){
                    otherPolygon.classList.add("inactive");
                } 
            });
    
            document.querySelectorAll('.page-button').forEach(btn => {
                if (btn !== buttonElement){
                    btn.classList.add("inactive");
                } 
            });
    
            document.getElementById(`${name}-content`)?.classList.remove('inactive');
        }

        polygon.addEventListener('click', handleClick);
        buttonElement.addEventListener('click', handleClick);
    });
}