import { ISendEmail } from "../interfaces/ISendEmail";
import { ISendEmailIntegration } from "../interfaces/ISendEmailIntegration";

export class SendEmail implements ISendEmail {
    private sendEmailIntegration: ISendEmailIntegration;

    constructor(integration: ISendEmailIntegration) {
        this.sendEmailIntegration = integration
    }

    Send = async (senderEmail: string, recivers: string[], subject: string, reactContent?: React.ReactElement) => {
        const objectToSend = 
        {
            from: senderEmail,
            to: recivers,
            subject: subject,
            react: reactContent,
        }
        return await this.sendEmailIntegration.Send(objectToSend);
    } 
}