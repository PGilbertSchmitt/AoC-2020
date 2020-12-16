import input from "../util/input";

const test = [0,3,6]; // 2020th number spoken should be 436
const tb = [1,3,2]; // 2020th number spoken should be 1
const tc = [2,1,3]; // 2020th number spoken should be 10
const td = [1,2,3]; // 2020th number spoken should be 27
const te = [2,3,1]; // 2020th number spoken should be 78
const tf = [3,2,1]; // 2020th number spoken should be 438
const tg = [3,1,2]; // 2020th number spoken should be 1836

const actual = [9,6,0,10,18,2,1];

export default input({ test, tb, tc, td, te, tf, tg, actual });
