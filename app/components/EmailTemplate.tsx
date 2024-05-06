import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  price: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  price
}) => (
  <div>
    <h1>Hej, {firstName}!</h1>
    <p>Vad roligt att du vill vara med på Förankrad Konferensen</p>
    <strong>Slutför din bokning genom att betala avgiften och säkra din plats!</strong>
    <p>Betala <strong>{price}</strong> till <strong>123456789</strong></p>
    <p>När du har betalt avgiften så får du din biljett</p>
  </div>
);
