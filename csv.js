// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

class CSV {
    static  #parseRow(row) {
        const entries = [];
        var insideQuote = false;
        var entry = [];
        row.split("").forEach((character)=>{
            if (character === '"') {
                insideQuote = !insideQuote;
            } else {
                if (character === "," && !insideQuote) {
                    entries.push(entry.join(""));
                    entry = [];
                } else {
                    entry.push(character);
                }
            }
        });
        entries.push(entry.join(""));
        return entries;
    }
    static  #getColumns(data) {
        const columnNames = new Set();
        for (const d of data){
            for(const k in d){
                columnNames.add(k);
            }
        }
        return [
            ...columnNames
        ];
    }
    static stringToObjs(spreadsheet) {
        const lines = spreadsheet.split(/\r?\n/);
        if (lines[lines.length - 1].length === 0) {
            lines.pop();
        }
        const columnNames = CSV.#parseRow(lines[0]);
        return lines.slice(1).map(CSV.#parseRow).map((arr)=>{
            const dataObject = {};
            columnNames.forEach((columnName, i)=>dataObject[columnName] = arr[i]
            );
            return dataObject;
        });
    }
    static objsToString(data1) {
        const columnNames = CSV.#getColumns(data1);
        var res = columnNames.map((c)=>`\"${c}\"`
        ).join(",") + "\r\n";
        for (const d of data1){
            res += columnNames.map((c)=>`\"${c in d ? d[c] : ""}\"`
            ).join(",") + "\r\n";
        }
        return res;
    }
}
export { CSV as default };
