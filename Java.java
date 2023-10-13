document.addEventListener('DOMContentLoaded', function() {
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

    function resetPage() {
        document.body.style.backgroundColor = 'rgb(255, 255, 255)';
        document.body.classList.remove('fade');
        
        document.querySelectorAll('.poly').forEach(function(polygon) {
            polygon.style.opacity = '1';
        });
        
        document.querySelectorAll('.text-box').forEach(function(text) {
            text.style.opacity = '1';
        });

        availableColors = [
            "#001219", "#005f73", "#0a9396", "#94d2bd", 
            "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", 
            "#ae2012", "#9b2226"
        ];
    }

    document.querySelectorAll('.poly').forEach(function(polygon) {
        const color = getRandomColor();
        polygon.setAttribute('fill', color);

        const id = polygon.getAttribute('id').replace('poly', 'text');
        const textElement = document.getElementById(id);

        let isClicked = false;

        function handleClick() {
            if (isActive && !isClicked) return;
            if (isClicked) {
                resetPage();
                isClicked = false;
                isActive = false;
                return;
            }

            document.body.style.backgroundColor = color;
            document.body.classList.add('fade');

            document.querySelectorAll('.poly').forEach(function(otherPolygon) {
                if (otherPolygon !== polygon) otherPolygon.style.opacity = '0';
            });

            document.querySelectorAll('.text-box').forEach(function(text) {
                if (text !== textElement) text.style.opacity = '0';
                else text.style.color = color;
            });

            isClicked = true;
            isActive = true;
        }

        polygon.addEventListener('click', handleClick);
        textElement.addEventListener('click', handleClick);
    });

    // This part is outside the forEach loop
    document.getElementById('text1').addEventListener('click', function() {
        const page1 = document.getElementById('page1');
        page1.classList.toggle('active');
        page1.querySelectorAll('.text-box').forEach(function(textBox) {
            textBox.style.opacity = page1.classList.contains('active') ? '1' : '0';
        });
    });
});