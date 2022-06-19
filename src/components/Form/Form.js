import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPosts, updatePost } from '../../actions/posts';

import useStyles from './styles';
const Form = ({ currentId, setCurrentId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    /*create state for every textinput field.*/
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    /*get currentId for a single post*/
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPosts(postData));
        }
        clear();
    };

    const clear = (() => {
        setCurrentId(null);
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    });


    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Edit' : 'Share'} your Pets memories</Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    /*method for updating the state that uses an object*/
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                />
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    /*method for updating the state that uses an object*/
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    /*method for updating the state that uses an object*/
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    /*method for updating the state that uses an object*/
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiply={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Post
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form;