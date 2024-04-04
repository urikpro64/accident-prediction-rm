export interface ChartOptions {
    chart: {
        id: string;
    };
    xaxis: {
        categories: string[];
    };
    yaxis: {
        title: {
            text: string;
        };
    };
    series: {
        name: string;
        data: number[];
    };

}

export type ChartData = {
    name: string,
    value: number,
}
