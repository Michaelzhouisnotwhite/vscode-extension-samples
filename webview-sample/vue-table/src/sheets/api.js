import { SheetStorage, SheetItem, TableColumn } from "./SheetTemplates";
import template_json_file from "../assets/template.json"

export function generateTemplate() {
    const template_json_str = template_json_file
    const template_json = template_json_str
    let ss = new SheetStorage()
    for (const [sheet_name, sheet_objs] of Object.entries(template_json)) {
        const table_cols = []
        sheet_objs.forEach(ele => {
            table_cols.push(new TableColumn(ele.col_name, ele.comment, ele.default_value));
        });
        ss.add(new SheetItem(sheet_name, table_cols))
    }
    return ss;
}
export function initGlobalSheetStorage() {
    console.log("init");
    SheetStorage._ins = generateTemplate();
}

export function sheetSave(sheet_name, sheet_data) {
    const cur_sheet = SheetStorage.ins().get(sheet_name);
    cur_sheet.jsonSheet = sheet_data;
}



let vscode_api = null
try {
    // eslint-disable-next-line no-undef
    vscode_api = acquireVsCodeApi();
} catch (error) {
    console.log("no vscode api: ", error);
}
export function sendToVscode(sheetStorage) {
    if (!vscode_api){
        console.log("no vscode api: ");
        return;
    }
    const jsonTables = {}
    sheetStorage.sheetNames.forEach(ele => {
        jsonTables[ele] = sheetStorage.get(ele).getJsonSheet(SheetItem.JSON_SHEET_TYPE.col_based);
    })
    vscode_api.postMessage({
        command: "excel_export",
        tables: jsonTables
    })
}
// window.addEventListener("message", event => {
//     const message = event.data;
//     message_ref.value = message.command;
//     vscode.postMessage({ command: "received.message" })
// })

