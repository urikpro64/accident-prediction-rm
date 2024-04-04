export type Predict = {
    accident: string,
    nonaccident: string,
    sec: number,
    image: string,
    imageBase64: string | null,
    imageURL: string
}

export type ResultPredictImage = {
    status: number,
    result: Array<Predict>
}

export type ResultChangeModel = {
    status: number,
    isChange: boolean,
    isChanging: boolean
}