export interface ISendEmailIntegration {
    Send: (object: any) => Promise<boolean>;
}