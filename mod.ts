/*
Created by: Henrique Emanoel Viana
Github: https://github.com/hviana
Page: https://sites.google.com/view/henriqueviana
cel: +55 (41) 99999-4664
*/

export default class CSV {
  static #parseRow(row: string): string[] {
    const entries: string[] = [];
    var insideQuote: boolean = false;
    var entry: string[] = [];
    row.split("").forEach((character) => {
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
  static #getColumns(data: any[]): string[] {
    const columnNames: Set<string> = new Set();
    for (const d of data) {
      for (const k in d) {
        columnNames.add(k);
      }
    }
    return [...columnNames];
  }
  static stringToObjs(spreadsheet: string): any[] {
    const lines: string[] = spreadsheet.split(/\r?\n/);
    if (lines[lines.length - 1].length === 0) {
      lines.pop();
    }
    const columnNames: string[] = CSV.#parseRow(lines[0]);
    return lines.slice(1).map(CSV.#parseRow).map((arr) => {
      const dataObject: any = {};
      columnNames.forEach((columnName: string, i: number) =>
        dataObject[columnName] = arr[i]
      );
      return dataObject;
    });
  }
  static objsToString(data: any[]): string {
    const columnNames: string[] = CSV.#getColumns(data);
    var res = columnNames.map((c) => `\"${c}\"`).join(",") + "\r\n";
    for (const d of data) {
      res += columnNames.map((c) => `\"${(c in d) ? d[c] : ""}\"`).join(",") +
        "\r\n";
    }
    return res;
  }
}
