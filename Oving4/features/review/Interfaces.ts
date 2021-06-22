// Interfaces used for reviews
export interface IReview {
    name: string;
    review: string;
}

export interface IDisplayReviewsProps {
    movieName: string,
    reviews: IReview[]
}

export interface IPostReview {
    _id: string,
    review: IReview
}

export interface IReviewsProps {
    movieId: string,
    movieName: string
}
