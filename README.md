# csv_web

Reading and writing csv files in browser. This implementation uses modern
JavaScript features and automatically handles missing columns when generating a
csv from data, contents with spaces and files with a blank line at the end, with
only 53 lines of code.

## How to use

The file for browsers is in csv.js

### CSV String to Array of Objects

```typescript
CSV.stringToObjs(spreadsheet_string);
/*
[
  {
    Name: "Jack",
    "last name": "McGinnis",
    address: "220 hobo Av."
  },
...
]
*/
```

### Array of Objects to CSV String

```typescript
CSV.objsToString(objects_array);
/*
"\"Name\",\"last name\",\"address\"\r\n\ ...
*/
```

## About

Author: Henrique Emanoel Viana, a Brazilian computer scientist, enthusiast of
web technologies, cel: +55 (41) 99999-4664. URL:
https://sites.google.com/view/henriqueviana

Improvements and suggestions are welcome!
