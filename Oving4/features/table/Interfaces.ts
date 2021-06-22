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
    id: keyof IMovieData;
}

export interface MainTableHeadProps {
    onRequestSort: (property: keyof IMovieData) => void;
    order: Order;
}

export type Order = 1 | -1; //Asc = 1, Desc = -1
