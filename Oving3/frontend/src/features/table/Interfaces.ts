//Common interfaces for table

export interface IReviews {
    name: string,
    review: string
}

export interface IMovieData {
    _id: string,
    budget: string,
    company: string,
    country: string,
    director: string,
    genre: string,
    gross: string,
    name: string,
    rating: string,
    released: string,
    runtime: number,
    score: number,
    star: string,
    votes: string,
    writer: string,
    year: number,
    reviews: Array<IReviews>
}

export interface IReqFilms {
    name: String,
    year: Array<String>
    genre: Array<String>
    director: Array<String>
    rating: Array<String>
    limit: Number
    skip: Number
    sortField: String
    sortNumber: Number
}

export interface HeadCell {
    disablePadding: boolean;
    first: boolean;
    id: keyof IMovieData;
    label: string;
    numeric: boolean;
}

export interface MainTableHeadProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IMovieData) => void;
    order: Order;
    orderBy: string;
}

export type Order = 1 | -1; //Asc = 1, Desc = -1
