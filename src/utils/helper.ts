import excelToJson from "convert-excel-to-json";
import { Seat } from "../models/seat.model";
import * as fs from "fs";


export function importExcelData2DB(filePath: string) {
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets: [
            {
                name: 'seat',

                header: {
                    rows: 1
                },
                columnToKey: {
                    B: 'seatId',
                    C: 'seatClass',
                    D: 'minPrice',
                    E: 'price',
                    F: 'maxPrice'
                }
            }
        ]
    })
    Seat.insertMany(excelData.seat, (err, res) => {
        if (err) throw err;
        console.log(res);
    });
    fs.unlinkSync(filePath);
    return;
}