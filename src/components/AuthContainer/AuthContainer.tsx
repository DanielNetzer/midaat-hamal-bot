import * as React from "react";
import Box from '@material-ui/core/Box';
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {StyleRulesCallback, WithStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

interface IProps {
    onFormSubmit: (user: string, pass: string) => void;
}

interface ILocalState {
    pass: string,
    userName: string,
}


// @ts-ignore
const styles: StyleRulesCallback = ({ palette, spacing }) => ({
    cardContainer: {
        width: "50%",
        padding: "1em",
        margin: "auto",

    },
    cardContent: {
        display: "flex",
        flexDirection: "column"
    },
    footer: {

    }
});

@(withStyles(styles) as any)
export default class AuthContainer extends React.Component<
    IProps & Partial<WithStyles<any>>
    > {
    public state: ILocalState = {
        pass: '',
        userName: '',
    };

    public render() {
        const {classes} = this.props;
        return (<div>
            <Card className={classes!.cardContainer}>
                <CardContent className={classes!.cardContent}>
                    <TextField onChange={this.onUserNameUpdate} label="שם משתמש"/>
                    <TextField onChange={this.onPasswordUpdate} label="סיסמא" type="password"/>
                </CardContent>
                <CardActions className={classes!.footer}>
                    <Button onClick={this.onSubmit} variant="contained" color="primary">התחבר</Button>
                </CardActions>
            </Card>
        </div>);
    }

    private onUserNameUpdate = (typeEvent:  any) => {
        const val = typeEvent.currentTarget.value;
        const newState = this.state;
        newState.userName = val;
        this.setState(newState);
    }

    private onPasswordUpdate = (typeEvent: any) => {
        const val = typeEvent.currentTarget.value;
        const newState = this.state;
        newState.pass = val;
        this.setState(newState);
    }

    private onSubmit = () => {
        const {onFormSubmit} = this.props;
        onFormSubmit(this.state.userName, this.state.pass);
    }
}