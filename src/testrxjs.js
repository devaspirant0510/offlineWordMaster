const {scan,map,first,Subject,pipe,of} =require("rxjs");


const nums = of(true,true);
const a = [0,1]
nums.pipe(
    map(v=>!v)
).subscribe(console.log)