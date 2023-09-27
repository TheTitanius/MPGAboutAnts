class Ant {
    id;
    type;
    hp;
    damage;
    x;
    y;
    playerId;
    color;

    constructor(id, type, playerId, color) {
        this.id = id;
        this.type = type;
        switch (type) {
            case "ant":
                this.hp = 100;
                this.damage = 10;
                break;
            case "warrior":
                this.hp = 80;
                this.damage = 20;
                break;
            default:
                this.hp = 100;
                this.damage = 10;
                break;
        }
        this.playerId = playerId;
        this.color = color;
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
    }
}