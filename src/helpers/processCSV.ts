export function processCSV<Type> (str: any, delim=','): Type[] {
    const headers = str.slice(0,str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n')+1).split('\n');

    const newArray = rows.map((row: any) => {
        const values = row.split(delim);
        const eachObject = headers.reduce((obj:any, header:any, i: any) => {
            obj[header] = values[i];
            return obj;
        }, {})
        return eachObject;
    })

    return newArray
}