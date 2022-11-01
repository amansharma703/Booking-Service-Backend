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
                    E: 'normalPrice',
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

export function validateEmail(email: string) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export function validatePhoneNumber(mobile: string) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(mobile);
}