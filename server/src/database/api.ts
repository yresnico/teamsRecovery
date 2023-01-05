import mysql2 from "mysql2";
import Order from "../models/Order";
import dotenv from "dotenv";


dotenv.config({ path: `${__dirname}/../env/.env` });

console.log(`${__dirname}../env/.env`);


export const db = mysql2.createConnection({
    multipleStatements: false,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
});

db.connect((err) => {
    if (err) {
        console.log(`Connection with DB not succesful.${err}`);
    } else {
        console.log("DB connection succesful");
    }
});



export async function getUserOrdersQuery(userId: number) {


    const res = db.query(
        `SELECT * FROM orders WHERE userID = ?;`,
        [userId],
    );

    let a;

    res.on('result', async function (row, index) {
        a = row
    }
    )
    return await a
}



// function foo1() {
//     //try{
//     db.getSomethingThatReturnsPromise(/** */)
//         .then(result1 => {
//             makeAnotherPromise(result1)
//             //...
//             //..
//         })
//         .then(result2 => console.log(result2))
//         .catch(error => /*do something*/)
//     //}catch(error){

//     // }
//     console.log('end')
// }

// async function foo2() {
//     try {
//         const result1 = await getSomethingThatReturnsPromise(/**/)
//         //...
//         //...
//         const result2 = await makeAnotherPromise(result1)
//         console.log(result2)
//     } catch (error) {
//         /*do something*/
//     }
// }

// await foo()