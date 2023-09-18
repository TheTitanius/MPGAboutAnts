async function AddHex(column = 25, line = 18) {
    map = document.getElementById("map");

    for (let i = 0; i < column; i++) {
        const col = document.createElement('div');
        if (i % 2 != 0) {
            col.classList.add('honest-column');
        } else {
            col.classList.add('odd-column');
        }
        for (let j = 0; j < line; j++) {
            var div = document.createElement("div");
            if (((i == 0 || i == 24) && (j < 7 || j > 10)) ||
                ((i == 1 || i == 23) && (j < 5 || j > 11)) ||
                ((i == 2 || i == 22) && (j < 4 || j > 13)) ||
                ((i == 3 || i == 21) && (j < 2 || j > 14)) ||
                ((i == 4 || i == 20) && (j < 2 || j > 15)) ||
                ((i == 5 || i == 19) && (j < 1 || j > 15)) ||
                ((i == 6 || i == 18) && (j < 1 || j > 16)) ||
                ((i == 7 || i == 9 || i == 11 || i == 13 || i == 15 || i == 17) && (j > 16))
            ) {
                div.className = "void-hex";
            } else {
                div.classList.add('hex');
                div.classList.add('ground');
            }
            div.id = `${i}, ${j}`;
            col.appendChild(div);
        }

        map.appendChild(col);
    }

    map.addEventListener("click", (e) => {
        if (e.target && (e.target.matches(".hex") || e.target.matches(".hex-child"))) {
            var hex = e.target;
            if (hex.matches(".hex-child")) {
                hex = hex.parentElement;
            }
            if (gameMode) {
                var antHex = document.getElementsByClassName("ant-hex");
                Array.prototype.forEach.call(antHex, (ant) => {
                    while (ant.firstChild) {
                        ant.removeChild(ant.firstChild);
                    }

                    ant.classList.remove("ant-hex");
                });

                var ant = document.createElement("img");
                ant.src = "../resources/ant.png";
                ant.classList.add("hex-child");
                hex.classList.add("ant-hex");
                hex.appendChild(ant);
            } else {
                if (isSetHex) {
                    for (let i = 0; i < hex.classList.length; i++) {
                        if (hex.classList[i] == "hex") continue;
                        hex.classList.remove(hex.classList[i]);
                    }
                    hex.classList.add(hexType);
                }
            }
        }
    });
}

function LoadMap(hexes, column = 25, line = 18) {
    map = document.getElementById("map");
    map.innerHTML = '';

    for (let i = 0; i < column; i++) {
        const col = document.createElement('div');
        if (i % 2 != 0) {
            col.classList.add('honest-column');
        } else {
            col.classList.add('odd-column');
        }
        for (let j = 0; j < line; j++) {
            var hex = hexes.find(value => value.x == i && value.y == j)
            var div = document.createElement("div");
            if (hex.hexType == null) {
                div.className = "void-hex";
            } else {
                div.classList.add('hex');
                switch (hex.hexType.name) {
                    case 'Земля':
                        div.classList.add('ground');
                        break;
                    case 'Вода':
                        div.classList.add('water');
                        hexType = "water";
                        break;
                }
            }
            div.id = `${i}, ${j}`;
            col.appendChild(div);
        }

        map.appendChild(col);
    }
}

AddHex()