export interface ISendEmail{
    Send: (senderEmail: string, 
        recivers: string[], 
        subject: string, 
        reactContent?: React.ReactElement, 
        htmlContent?: HTMLDocument, 
        textContent?: string) => Promise<boolean>
}