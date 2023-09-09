var gameMode = true;
var hexType = "ground";

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