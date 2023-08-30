﻿function AddHex(column = 25, line = 18) {
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
                div.className = "hex";
            }
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