import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': theme.spacing(1),
        width: '25ch',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        margin: theme.spacing(1),
        height: '100%',

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },

}));

export default function BasicTextFields() {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <form className={classes.root} noValidate autoComplete="off">
                {/*Enter User Name*/}
                <TextField
                    required
                    id="standard-required"
                    label="Username"
                    style={{ margin: 8}}
                    placeholder="User Name"

                />
                {/*Enter Password*/}
                <TextField
                    required
                    id="standard-required"
                    label="Password"
                    style={{ margin: 8}}
                    placeholder="Password"
                />
                {/*Enter Display_Name*/}
                <TextField
                    required
                    id="standard-required"
                    label="Display Name"
                    style={{ margin: 8}}
                    placeholder="Display Name"
                />
                {/*Enter Email*/}
                <TextField
                    required
                    id="standard-required"
                    label="Email"
                    style={{ margin: 8}}
                    placeholder="Email"
                />
            </form>
            <Button
                variant="contained"
                color="primary"
                style={{ margin: 8}}
                startIcon={<CloudUploadIcon/>}
            >
                Submit
            </Button>
        </div>
    );
}
