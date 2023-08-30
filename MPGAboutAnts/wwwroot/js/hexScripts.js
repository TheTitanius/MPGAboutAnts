function AddHex(column = 10, line = 10) {
    map = document.getElementById("map");

    for (let i = 0; i < column; i++) {
        const col = document.createElement('div');
        if (i % 2 == 0) {
            col.classList.add('honest-column');
        } else {
            col.classList.add('odd-column');
        }
        for (let j = 0; j < line; j++) {
            var div = document.createElement("div");
            div.className = "hex";
            div.id = `${i}, ${j}`;
            col.appendChild(div);
        }

        map.appendChild(col);
    }

    map.addEventListener("click", (e) => {
        if (e.target && e.target.matches(".hex")) {
            var antHex = document.getElementsByClassName("ant-hex");
            Array.prototype.forEach.call(antHex, (ant) => {
                while (ant.firstChild) {
                    ant.removeChild(ant.firstChild);
                }

                ant.classList.remove("ant-hex");
            });

            var hex = e.target;
            var ant = document.createElement("img");
            ant.src = "../resources/ant.png";
            hex.classList.add("ant-hex");
            hex.appendChild(ant);
        }
    });
}

AddHex()