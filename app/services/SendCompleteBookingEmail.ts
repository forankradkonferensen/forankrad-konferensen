import { EmailTemplate } from "../components/EmailTemplate";
import { ISendEmail } from "../interfaces/ISendEmail";
import { ISendEmailIntegration } from "../interfaces/ISendEmailIntegration";

export class SendCompleteBookingEmail implements ISendEmail {

    private sendEmailIntegration: ISendEmailIntegration;

    constructor(integration: ISendEmailIntegration) {
        this.sendEmailIntegration = integration
    }

    SendToOneReciever = async (reciverEmail: string, recieverName: string): Promise<boolean> => {
        
        const reactEmailContent = EmailTemplate({ firstName: recieverName }) as React.ReactElement;

        const objectToSend = 
        {
            from: 'Förankrad Konferensen <noreply@forankradkonferensen.se>',
            to: [reciverEmail],
            subject: 'Slutför bokning',
            react: reactEmailContent,
        }
        return await this.sendEmailIntegration.Send(objectToSend);
    } 
}