import * as React from "react";
import ChatBot from "react-simple-chatbot";

interface IProps {}

interface ILocalState {}

export function generateSession(date: Date): string {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
}

const newDate = new Date();
const sessionId = generateSession(newDate);
const apiKey =
    'z1tKfnDm0QUKKn+OqhJxLUaPIoQG8DMSsk83Si3WxyXgLNXXXCqpzP2c90S2r+SySL+4YIP16EPnuWq6KYAI53MR6rc+Y8M24KV/OrnCay56xjOjyFeGnws+imK1HSZYRfJlGGnheZ7uXA==';


export default class ChatBotContainer extends React.Component<
    IProps & ILocalState> {

    public state: ILocalState = {};


    public render() {
        return (<ChatBot steps={this.getBotSteps()} />
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
            // {
            //     id: '2',
            //     message: async ({ value }: { value: string }) => {
            //         const body = JSON.stringify({
            //             userId: 'midaat',
            //             input: value,
            //             sessionId
            //         });
            //
            //         const httpResponse = await fetch('https://api.over.ai/api/ai/call', {
            //             method: 'POST',
            //             body,
            //             headers: {
            //                 'api-key': apiKey,
            //                 'Content-Type': 'application/json'
            //             }
            //         });
            //
            //         const nluResponse = await httpResponse.json();
            //         console.log(nluResponse);
            //         const botResponse = nluResponse.say.sentencesAsOneLine;
            //         console.log(botResponse);
            //         return botResponse;
            //     },
            //     trigger: async ({ value }: { value: string }) => {
            //         console.log(value);
            //         return '0';
            //     }
            // }
        ];

    }
}