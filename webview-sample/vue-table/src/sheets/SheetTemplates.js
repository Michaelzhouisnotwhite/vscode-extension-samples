export class TableKeys {
    _keyName;
    _keyComment;
    constructor(keyName, KeyComment = "") {
        this._keyComment = KeyComment
        this._keyName = keyName
    }
    get keyName(){
        return this._keyName;
    }    
    get keyComment(){
        return this._keyComment;
    }
}
export class TableRow{
    _tableKey;
    _tableValue;
}
export class SheetItem {
    _name;
    _keys = new Array();
    get sheetName(){
        return this._name
    }
    get tableKeys(){
        return this._keys
    }
    get headerNames(){
        return this._keys.map((ele)=>{return ele._keyName});
    }
    constructor(name, keys) {
        this._name = name;
        this._keys = keys
    }
    get name() {
        return this._name
    }

};

export class SheetStorage {
    static ins() {
        if (!this._ins) {
            this._ins = new SheetStorage()
        }
        return this._ins;
    }
    _sheetItems = new Array();
    static _ins = undefined
    add(sheetItem) {
        this._sheetItems.push(sheetItem);
    }
    get keys() {
        return this._sheetItems.map((ele) => { return ele.name })
    }
    get(sheetName, pop = false) {
        const idx = this._sheetItems.findIndex((ele) => {
            return sheetName === ele._name;
        })
        if (pop) {
            return this._sheetItems.splice(idx, 1)
        }
        return this._sheetItems[idx];
    }

};
SheetStorage.ins().add(new SheetItem("ECUInfo", [
    new TableKeys("ECU Name", "填写ecu的名称"),
    new TableKeys("ECU Type", "ecu类型"),
]))
// SheetStorage.ins().add(new SheetItem("ECUInfo", [
//     new TableKeys("ECU Name", "填写ecu的名称"),
//     new TableKeys("ECU Type", "ecu类型"),
// ]))

