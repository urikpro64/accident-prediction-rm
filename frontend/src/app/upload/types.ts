export type Predict = {
    accident: String,
    nonaccident: String,
    sec: number,
    image: String,
}

export type Result = {
    status: number,
    result: Array<Predict>
}