export class TableColumn {
    _keyName;
    _keyComment;
    _values;
    constructor(keyName, KeyComment = "", values = []) {
        this._keyComment = KeyComment
        this._keyName = keyName
        this._values = values
    }
    get keyName() {
        return this._keyName;
    }
    get keyComment() {
        return this._keyComment;
    }
    get colValues() {
        return this._values;
    }
    set colValues(vals) {
        this._values = vals;
    }
}

export class SheetItem {
    static JSON_SHEET_TYPE = {
        row_based: 0,
        col_based: 1
    }
    _name;
    _keys = new Array();
    constructor(name, keys) {
        this._name = name;
        this._keys = keys
    }
    get sheetName() {
        return this._name
    }
    get tableKeys() {
        return this._keys
    }
    get headerNames() {
        return this._keys.map((ele) => { return ele._keyName });
    }
    get name() {
        return this._name
    }
    getJsonSheet(type) {
        if (type === SheetItem.JSON_SHEET_TYPE.row_based) {
            const res = [];
            let rowCount = 0;
            if (this._keys.length != 0) {
                rowCount = this._keys[0].colValues.length;
            }
            for (let i = 0; i < rowCount; i++) {
                res.push({})
            }
            for (let j = 0; j < rowCount; j++) {
                const obj = {}
                for (let i = 0; i < this._keys.length; ++i) {
                    obj[this._keys[i].keyName] = this._keys[i].colValues[j]
                }
                res[j] = obj
            }
            return res;
        }else if (type === SheetItem.JSON_SHEET_TYPE.col_based){
            const jsonTable = {}
            this._keys.forEach(ele=>{
                if (!(ele.keyName in jsonTable)){
                    jsonTable[ele.keyName] = []
                }
                jsonTable[ele.keyName] = ele.colValues;
            })
            return jsonTable;
        }
    }
    /**
     * @param {Object[]} obj
     */
    set jsonSheet(obj) {
        const rowCount = obj.length;
        const jsonTable = {};
        for (let i = 0; i < rowCount; i++) {
            for (const [key, value] of Object.entries(obj[i])) {
                if (key in jsonTable) {
                    jsonTable[key].push(value)
                } else {
                    jsonTable[key] = [value];
                }
            }
        }
        this._keys.forEach(ele => {
            ele.colValues = jsonTable[ele.keyName] ? jsonTable[ele.keyName] : []
        })
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
    clear() {
        this._sheetItems = new Array()
    }
    add(sheetItem) {
        this._sheetItems.push(sheetItem);
    }
    get sheetNames() {
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
    new TableColumn("ECU Name", "填写ecu的名称"),
    new TableColumn("ECU Type", "ecu类型"),
    new TableColumn("ECU MAC Addr", "ecu类型"),
    new TableColumn("VLAN ID", "ecu类型"),
]));
SheetStorage.ins().add(new SheetItem("ApplicationInfo", [
    new TableColumn("ECU Name", "填写ecu的名称"),
]))
// SheetStorage.ins().add(new SheetItem("ECUInfo", [
//     new TableKeys("ECU Name", "填写ecu的名称"),
//     new TableKeys("ECU Type", "ecu类型"),
// ]))

