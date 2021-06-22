import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { selectTableText, selectButton, selectNavbarText } from '../../reducers/themeReducer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DisplayReviews from './DisplayReviews';
import { IReviewsProps, IReview, IPostReview } from './Interfaces';
import { selectUser } from '../../reducers/loginReducer';
import { useSelector } from 'react-redux';

// Styling 
const useReviewStyles = makeStyles({
    name: {
        marginEnd: "0.5rem",
        marginBottom: "0.5rem"
    },
    reviewBox: {
        display: "flex",
        marginBottom: "0.5rem",
    },
    reviewButton: {
        marginLeft: "0.5rem"
    }
});

async function setReviewDB(review: IPostReview) {
    // Function used for posting reviews in DB
    const body = JSON.stringify(review)
    fetch('http://localhost:5000/review', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    })
}

const addReview = async (movieId: string, name: string, review: string,
    listOfReviews: IReview[],
    setListOfReviews: React.Dispatch<React.SetStateAction<IReview[]>>,
    setReview: React.Dispatch<React.SetStateAction<string>>) => {
    /* Updates list of reviews in component, 
    setReview to empty string and sends new review to DB*/
    const clonedListOfReviews = [...listOfReviews];
    clonedListOfReviews.push({ name: name, review: review })
    setListOfReviews(clonedListOfReviews)
    await setReviewDB({ _id: movieId, review: { name: name, review: review } })
    setReview("")
}

export default function Review(props: IReviewsProps) {
    //Styling from redux
    const tableText = useSelector(selectTableText);
    const buttonStyle = useSelector(selectButton);
    const navbarText = useSelector(selectNavbarText);

    //Styling using makeStyles
    const useStyles = makeStyles(() =>
        createStyles({
            text: {
                color: tableText
            },
            button: {
                background: buttonStyle,
                color: navbarText,
                marginLeft: "0.5rem"
            },
            review: {
                color: tableText,
                '& .MuiFormLabel-root': {
                    color: tableText
                },
                '& .MuiInputBase-root': {
                    color: tableText
                },
                '& .MuiInputBase-input:focus': {
                    borderColor: tableText,
                    borderWidth: 1
                },
                '& .MuiFormControl-root': {
                    borderColor: navbarText,
                    borderWidth: 1
                },
                '& .MuiTextField-root': {
                    borderColor: navbarText,
                    borderWidth: 1
                },
                '& .MuiOutlinedInput-input:focus': {
                    borderColor: tableText,
                    borderWidth: 1
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: tableText,
                    borderWidth: 1
                },
                '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                    borderColor: tableText,
                    borderWidth: 1
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: tableText,
                    borderWidth: 1
                },
                '& .MuiFormHelperText-root': {
                    color: tableText
                }
            },
        })
    )


    const classes = useReviewStyles(); //Styling for component
    const style = useStyles(); //Styling from redux
    const name = useSelector(selectUser); //Name of logged in user from redux
    const [review, setReview] = React.useState(""); // Review from user
    const [isLoading, setIsLoading] = React.useState(true); //Is component fetching reviews?
    const [listOfReviews, setListOfReviews] = React.useState<IReview[]>([]); //List of reviews to display

    React.useEffect(() => {
        // Fetch reviews from backend using movieID
        const send = { _id: props.movieId }
        const body = JSON.stringify(send)
        fetch('http://localhost:5000/getreviews', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        }).then((res) => res.json()).then(
            (result) => {
                if (result.length !== 0) {
                    setListOfReviews(result[0].reviews)
                    setIsLoading(false)
                }
                else {
                    setIsLoading(false)
                }

            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Typography classes={{ root: style.text }} variant="h6" gutterBottom component="div">
                Reviews
            </Typography>{isLoading ? /* Is the component loading? */
                <Typography classes={{ root: style.text }} variant="body1" gutterBottom component="div">
                    Reviews are loading
                </Typography> :
                <DisplayReviews movieName={props.movieName} reviews={listOfReviews}></DisplayReviews>
            }
            <Typography classes={{ root: style.text }} variant="h6" gutterBottom component="div">
                Add Review
            </Typography>
            <Box className={classes.reviewBox}>
                {name ? /* If logged in show name */ <Typography classes={{ root: style.text }} variant="body1" gutterBottom >
                    <b>Name:</b> {name}
                </Typography> : <Typography classes={{ root: style.text }} variant="body1" gutterBottom >
                        User not logged in
            </Typography>
                }
                <Button className={(!name || !review) ? classes.reviewButton : style.button} variant="contained" color="primary" disabled={!name || !review} onClick={() => { addReview(props.movieId, name, review, listOfReviews, setListOfReviews, setReview) }}>
                    Add Review
                </Button>
            </Box>
            <TextField
                classes={{ root: style.review }}
                id="ReviewField"
                label={!name ? "Review disabled" : "Review"}
                variant="outlined"
                color="primary"
                style={{ marginBottom: "0.5rem" }}
                fullWidth
                disabled={!name}
                value={review}
                onChange={(event) => setReview(event.target.value)}
                inputProps={{ maxLength: 256, className: style.review, }}
                helperText={review.length.toString() + "/256"}
            />
        </div >
    );
}