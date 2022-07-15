export interface Car {
    _id?: string;
    brand:string;
    model:string;
    color:string;
    patent:string;
}

export interface CarResponse{
    cars:Car[];
}