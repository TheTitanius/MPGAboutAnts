const apiName = "hexType";

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
    const response = await fetch(`/api/${apiName}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const hexTypes = await response.json();
        let select = document.getElementById("hexType");
        hexTypes.forEach(hexType => select.append(new Option(Object.values(hexType)[1], Object.values(hexType)[0])));
    }
}

document.getElementById("hexType").addEventListener("change", (e) => {
    if (e.target) {
        switch (e.target.value) {
            case '0':
                hexType = "ground";
                break;
            case '1':
                hexType = "water";
                break;
            default:
                hexType = "ground";
                break;
        }
    }
});

GetHexTypes();