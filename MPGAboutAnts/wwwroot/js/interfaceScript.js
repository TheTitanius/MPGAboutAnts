document.getElementById("flexSwitchCheck").addEventListener("change", async () => {
    let checkLabel = document.getElementById("checkLabel");

    if (document.getElementById("flexSwitchCheck").checked) {
        checkLabel.innerHTML = "Режим создания";
        gameMode = false;
        document.getElementById("creationSettings").hidden = false;
    } else {
        checkLabel.innerHTML = "Режим игры";
        gameMode = true;
        document.getElementById("creationSettings").hidden = true;
    }
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

document.getElementById("saveBtn").addEventListener("click", async () => {
    var map = await createModel("map", JSON.stringify({
        name: document.getElementById("mapName").value
    }));
    for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 18; j++) {
            var hex = document.getElementById(`${i}, ${j}`);
            var hexType = await GetType(hex);

            await createModel("hex", JSON.stringify({
                x: i,
                y: j,
                hexType: hexType,
                map: map,
                unit: null
            }));
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

    LoadMap(hexes);

    alert("Карта загружена");
});

GetHexTypes();
GetMaps();