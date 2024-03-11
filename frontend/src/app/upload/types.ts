export type Predict = {
    accident: string,
    nonaccident: string,
    sec: number,
    image: string,
    imageBase64: string | null,
    imageURL: string
}

export type Result = {
    status: number,
    result: Array<Predict>
}