import fs from "fs";

export const readJSON = <T>(path: string): T[] => {
    return JSON.parse(
        fs.readFileSync(path)
            .toString()
    )
}
export const saveJSON = <T>(objectArray: T[], path: string) => {
    fs.writeFileSync(
        path, JSON.stringify(objectArray)
    );
}
