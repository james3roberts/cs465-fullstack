export interface Trip {
    _id: string;        //internal mongodb primary key
    code: string;
    name: string,
    length: string,
    start: string,
    resort: string,
    perPerson: string,
    image: string,
    description: string
}