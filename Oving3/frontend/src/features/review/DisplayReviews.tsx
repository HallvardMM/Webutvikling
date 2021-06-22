import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { IDisplayReviewsProps } from './Interfaces';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { selectTableText, selectNavbarText, selectButton } from '../../reducers/themeReducer';

// Component to display reviews recived from backend or user

const DisplayReviews: Function = (prop: IDisplayReviewsProps): JSX.Element[] | JSX.Element => {
    // Styling from redux
    const tableText = useSelector(selectTableText);
    const buttonColor = useSelector(selectButton);
    const buttonText = useSelector(selectNavbarText)

    const useStyles = makeStyles(() =>
        //Define styling
        createStyles({
            text: {
                color: tableText
            },
            button: {
                background: buttonColor,
                color: buttonText
            },
        })
    )
    const classes = useStyles(); // Styles
    const [showReviews, setShowReviews] = React.useState(false); // Toggle between showing or hiding reviews

    // If reviews allow to show/hide reviews with button. Else display text.
    if (prop.reviews.length) {
        return (
            <div>
                <Button classes={{ root: classes.button }} variant="contained" onClick={() => setShowReviews(!showReviews)}>{showReviews ? "Hide reviews" : "Show reviews"}</Button>
                {showReviews ? (
                    prop.reviews.map((review, index) => (
                        <div key={prop.movieName + review.name + review.review}>
                            <Typography className={classes.text} variant="body1" gutterBottom >
                                <b>Name:</b> {review.name}
                            </Typography>
                            <Typography className={classes.text} variant="body1" gutterBottom style={{ borderBottom: "solid" }}>
                                <b>Review:</b> {review.review}
                            </Typography>
                        </div>
                    ))
                ) : <div></div>}
            </div>
        )
    }
    else {
        return (
            <div key={prop.movieName}>
                <Typography className={classes.text} variant="body1" gutterBottom >
                    No reviews exists for this film! Would you like to add one?
                </Typography>
            </div >
        )
    }
}

export default DisplayReviews;