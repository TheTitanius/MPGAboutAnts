document.getElementById("flexSwitchCheck").addEventListener("change", async () => {
    let checkLabel = document.getElementById("checkLabel");

    if (document.getElementById("flexSwitchCheck").checked) {
        checkLabel.innerHTML = "Режим создания";
        gameMode = false;
        isSetAnt = false;
        document.getElementById("creationSettings").hidden = false;
    } else {
        checkLabel.innerHTML = "Режим игры";
        gameMode = true;
        document.getElementById("creationSettings").hidden = true;
    }
});

document.getElementsByName("flexRadio").forEach(rBtn => {
    rBtn.addEventListener("change", () => {
        document.getElementById("selectHexType").disabled = true;
        document.getElementById("mapSave").disabled = true;
        document.getElementById("mapLoad").disabled = true;
        document.getElementById("playerSave").disabled = true;
        document.getElementById("antAdd").disabled = true;
        isSetHex = false;
        isSetAnt = false;
        switch (rBtn.value) {
            case 'selectHexType':
                document.getElementById("selectHexType").disabled = false;
                isSetHex = true;
                break;
            case 'mapSave':
                document.getElementById("mapSave").disabled = false;
                break;
            case 'mapLoad':
                document.getElementById("mapLoad").disabled = false;
                break;
            case 'playerSave':
                document.getElementById("playerSave").disabled = false;
                break;
            case 'antAdd':
                document.getElementById("antAdd").disabled = false;
                isSetAnt = true;
                break;
        }
    });
});

async function GetHexTypes() {
    const response = await fetch(`/api/hexType`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const hexTypes = await response.json();
        let select = document.getElementById("hexType");
        hexTypes.forEach(hexType => select.append(new Option(Object.values(hexType)[1], `${Object.values(hexType)[0]},${Object.values(hexType)[1]}`)));
    }
}

async function GetMaps() {
    const response = await fetch('/api/map', {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const maps = await response.json();
        let select = document.getElementById("mapNames");
        maps.forEach(map => select.append(new Option(Object.values(map)[1], Object.values(map)[0])));
    }
}

async function GetPlayers() {
    const response = await fetch('/api/player', {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const players = await response.json();
        let select = document.getElementById("playerNames");

        select.innerHTML = '<option value="change" selected>--Выберите игрока--</option>';
        
        players.forEach(player => {
            var option = new Option(Object.values(player)[1], Object.values(player)[0] + "," + player.color);
            option.style.backgroundColor = player.color;
            option.style.color = invertColor(player.color);
            select.append(option)
        });
    }
}

async function GetAntTypes() {
    const response = await fetch('/api/unitType', {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const antTypes = await response.json();
        let select = document.getElementById("antType");
        antTypes.forEach(antType => select.append(new Option(Object.values(antType)[1], `${Object.values(antType)[0]},${Object.values(antType)[1]}`)));
    }
}

async function GetAntTypeById(type) {
    var id;
    switch (type) {
        case "ant":
            id = 1;
            break;
        case "warrior":
            id = 2;
            break;
    }

    const response = await fetch(`/api/unitType/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const antType = await response.json();
        return antType;
    }
}

document.getElementById("playerNames").addEventListener("change", async () => {
    let span = document.getElementById("playerColor");
    if (document.getElementById("playerNames").value == "change") {
        span.style.backgroundColor = "#e9ecef";
        span.style.color = "#212529";
        return;
    }
    var color = document.getElementById("playerNames").value.split(',')[1];
    playerColor = color;
    playerId = document.getElementById("playerNames").value.split(',')[0];
    span.style.backgroundColor = color;
    span.style.color = invertColor(color);
});

function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1); // remove #
    color = parseInt(color, 16); // convert to integer
    color = 0xFFFFFF ^ color; // invert three bytes
    color = color.toString(16); // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color; // prepend #
    return color;
}

document.getElementById("hexType").addEventListener("change", (e) => {
    if (e.target) {
        switch (e.target.value.split(',')[1]) {
            case 'Земля':
                hexType = "ground";
                break;
            case 'Вода':
                hexType = "water";
                break;
            default:
                hexType = "ground";
                break;
        }
    }
});

document.getElementById("antType").addEventListener("change", (e) => {
    if (e.target) {
        switch (e.target.value.split(',')[1]) {
            case 'Обычный':
                antType = "ant";
                break;
            case 'Воин':
                antType = "warrior";
                break;
            default:
                antType = "warrior";
                break;
        }
    }
});

document.getElementById("saveBtn").addEventListener("click", async () => {
    var players;
    const response = await fetch(`/api/player`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        players = await response.json();
    }

    var map = await createModel("map", JSON.stringify({
        name: document.getElementById("mapName").value
    }));
    for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 18; j++) {
            var hex = document.getElementById(`${i}, ${j}`);
            var hexType = await GetType(hex);

            var createdHex = await createModel("hex", JSON.stringify({
                x: i,
                y: j,
                hexType: hexType,
                map: map
            }));

            if (hex.classList.contains("ant-hex")) {
                var ant = await ants.find((element) => element.id == hex.firstChild.id);

                var player = await players.find((element) => element.id == ant.playerId);

                var antType = await GetAntTypeById(ant.type);

                await createModel("unit", JSON.stringify({
                    type: antType,
                    player: player,
                    hex: createdHex,
                    hp: ant.hp,
                    damage: ant.damage,
                }));
            }
        }
    }

    alert("Карта " + map.name + " сохранена");
});

async function GetType(hex) {
    var hexClassList = Array.prototype.slice.call(hex.classList);
    var hexType;
    if (hexClassList.includes("void-hex")) {
        return null;
    } else {
        if (hexClassList.indexOf("hex") != -1) hexClassList.splice(hexClassList.indexOf("hex"), 1);
        if (hexClassList.indexOf("ant-hex") != -1) hexClassList.splice(hexClassList.indexOf("ant-hex"), 1);
        switch (hexClassList[0]) {
            case "ground":
                hexType = 1;
                break;
            case "water":
                hexType = 2;
                break;
        }

        const response = await fetch(`/api/hexType/${hexType}`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });
        if (response.ok) {
            hexType = await response.json();
        }
    }

    return hexType;
}


document.getElementById("loadBtn").addEventListener("click", async () => {
    let mapId = document.getElementById("mapNames").value;
    let hexes;

    const response = await fetch(`/api/hex/fromMap/${mapId}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok) {
        hexes = await response.json();
    }

    await LoadMap(hexes);

    alert("Карта загружена");
});

document.getElementById("savePlayerBtn").addEventListener("click", async () => {
    let playerName = document.getElementById("playerName").value;
    let color = document.getElementById("color").value;

    await createModel("player", JSON.stringify({
        name: playerName,
        color: color,
    }));

    await GetPlayers();
    alert("Игрок " + playerName + " загружен");
});

GetHexTypes();
GetMaps();
GetPlayers();
GetAntTypes();