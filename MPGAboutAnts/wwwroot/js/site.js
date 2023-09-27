var gameMode = true;
var isSetHex = true;
var isSetAnt = true;

var antType = "ant";
var hexType = "ground";

var playerColor = "#000000"
var playerId = 0;

var ants = [];

let antId = 0;

async function createModel(modelsName, newModel) {
    const response = await fetch(`/api/${modelsName}`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: newModel
    });
    if (response.ok === true) {
        const model = await response.json();
        return model;
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}