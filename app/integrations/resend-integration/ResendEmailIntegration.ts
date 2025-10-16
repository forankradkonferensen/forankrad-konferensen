import { ISendEmailIntegration } from "@/app/interfaces/ISendEmailIntegration";
import { Resend } from "resend";

export class ResendEmailIntegration implements ISendEmailIntegration {
    Send = async (object: any) => {
        try {
            const resend = new Resend(process.env.RESENDKEY);
            const data = await resend.emails.send(object)
            if(data.error) return false

            return true
            
        } catch(error) {
            return false
        }
    };
}