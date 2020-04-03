import * as React from "react";
import ChatBot from "react-simple-chatbot";
import {StyleRulesCallback} from "@material-ui/styles";
import {WithStyles, withStyles} from "@material-ui/core";

interface IProps {}

interface ILocalState {}

// @ts-ignore
const styles: StyleRulesCallback = ({ palette, spacing }) => ({
    botContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "auto"
    }
});

@(withStyles(styles) as any)
export default class ChatBotApp extends React.Component<
    IProps & Partial<WithStyles<any>>
    > {

    public state: ILocalState = {};

    public render() {
        const {classes} = this.props;
        return (
            <section className={classes!.botContainer}>
                <ChatBot
                    headerTitle={"מידעת - בוט תשובות ושאלות"}
                    botAvatar={"http://midaat.org.il/wp-content/uploads/2020/03/Logo-for-web2@2x.png"}
                    steps={this.getBotSteps()} />
            </section>
        );
    }
    private getBotSteps = () => {
        return [
            {
                id: '0',
                message: 'ברוכים הבאים לחמ״ל קורונה מקבוצת מדעת, מה תרצו לדעת?',
                trigger: '1'
            },
            {
                id: '1',
                user: true,
                trigger: '2'
            },
            {
                id: 2,
                message: "X",
            }
        ];

    }
}