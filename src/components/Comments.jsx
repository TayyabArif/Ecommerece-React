import React, { useEffect, useState, useRef, useCallback } from "react";
import { Divider, Avatar, Grid, Paper, Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { comment, deleteMyComment, getMyComments } from "../redux/actions/actions";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
const Comments = () => {
    let count
    const PER_PAGE = 8;
    const form = useRef();
    const productId = useParams();
    const dispatch = useDispatch();
    const product_id = productId.id;
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState("");
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const myComment = useSelector(state => state.myComment.comment)
    const loading = useSelector(state => state.productComments.loading)
    const myAllComments = useSelector(state => state.productComments.myComments)
    const commentItem = useSelector(state => state.productComments.commentItem)
    const [click, setClick] = useState(0);
    const [myLogin, setMyLogin] = useState(true)
    const [deleteHistory, setDeleteHistory] = useState(0)
    const handleCLick = (e) => {
        e.preventDefault()
        if (!token) {
            setMyLogin(false)
            setTitle('')
        } else {
            const data = JSON.stringify({ comment: { title, product_id } })
            dispatch(comment(data))
        }
        form.current.reset();
    }
    const handleChange = (e, p) => {
        setClick(p)
        setPage(p);
    };
    useEffect(() => {
        dispatch(getMyComments(product_id, page))
    }, [myComment, click, deleteHistory])
    if (!loading) {
        if (myAllComments[0]) { count = myAllComments[0].pages }
    }
    const editComment = (e) => {

    }
    const deleteComment = (e) => {
        setDeleteHistory(deleteHistory + 1)
        dispatch(deleteMyComment(e.id))
    }
    return (
        <Grid container direction="column" sx={{ height: "100%", width: "100%" }} >
            <Grid container item direction="column" sx={{ height: "20%", width: "100%" }} justifyContent="center">
                <Divider sx={{ pl: 2, pr: 2 }} />
                <Grid container item justifyContent='center'>
                    <Typography
                        variant="h2"
                        fontSize="3rem"
                        fontWeight="50px"
                        fontFamily="Fantasy"
                        color="primary.main"
                    >
                        Comments
                    </Typography>
                </Grid>
                <Divider light={true} sx={{ pl: 10, pr: 10 }} />
            </Grid>
            <Grid container item direction="column" sx={{ height: "80%", width: "100%" }} >
                <Grid container item sx={{ mt: 1, width: "100%" }}>
                    {myAllComments ? myAllComments.map((comment) => (
                        <Grid container item sx={{ width: '100%', height: '10%' }} >
                            <Paper style={{ padding: "0px 0px", width: '100%' }}>
                                <Grid container item wrap="nowrap" >
                                    <Grid item>
                                        <Avatar alt="Remy Sharp" src={comment.user.avatar_url} />
                                    </Grid>
                                    <Grid justifyContent="left" item xs zeroMinWidth>
                                        <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user.name}</h4>
                                        <p style={{ textAlign: "left" }}>
                                            {comment.title}
                                        </p>
                                        <p style={{ textAlign: "left", color: "gray" }}>
                                            posted: {comment.created_at}
                                        </p>
                                    </Grid>
                                </Grid>
                                {(token && comment.user.name == user) &&
                                    <Grid container item sx={{ ml: 0 }} alignItems="center">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2, mr: 1, fontSize: '8px', borderRadius: "30px" }}
                                            onClick={() => editComment(comment)}
                                        >
                                            Edit
                                        </Button>

                                        <IconButton aria-label="delete" color="danger" sx={{ mt: 1 }} onClick={() => deleteComment(comment)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                }
                                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                            </Paper>
                        </Grid>
                    )) : "No comment"}
                </Grid>
                <Grid container item sx={{ mt: 2 }} justifyContent="center" alignItems='center'>
                    <Pagination
                        count={count}
                        page={page}
                        size="large"
                        color="primary"
                        onChange={handleChange}
                    />
                </Grid>
                {!myLogin &&
                    <Grid container item sx={{ mt: 2 }} justifyContent="center" alignItems='center'>
                        <Alert severity="error">Please Login or signup first to post comment</Alert>
                    </Grid>
                }
                <Box component="form" ref={form} onSubmit={handleCLick} sx={{ mt: 1 }}>
                    <Grid container item sx={{ mt: 5, width: "80vw" }}>
                        <Grid container item sx={{ width: "75vw" }}>
                            <TextField
                                margin="normal"
                                required
                                id="comment"
                                label="comment"
                                name={title}
                                autoComplete="comment"
                                type="text"
                                placeholder="Add you comment here......."
                                variant="outlined"
                                autoFocus
                                sx={{ width: "100%" }}
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                        </Grid>
                        <Grid container item sx={{ width: "20vw", ml: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Post Comment
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}
export default Comments