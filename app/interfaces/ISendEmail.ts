export interface ISendEmail{
    SendToOneReciever: (
        reciverEmail: string, 
        reciverName: string)
         => Promise<boolean>
}