import * as React from 'react';
interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = () => (
  <div>
    <h1>Du är anmäld till Förankrad!</h1>
    <p>Vi ser så fram emot att ses den 28e september</p>
    <br />
    <p>Vänligen swisha med hjälp av QR-koden här nedan.</p>
    <strong className='text-red-700'>Skriv [Förnamn + Efternamn] i meddelandet</strong>
    <img src='https://drive.google.com/uc?id=https://drive.google.com/file/d/1aRiUTqpTTwDABVfmvcRY5ev-yHqhBEVG/view?usp=drivesdk' alt='123-588 11 07' width={200} height={300}/>
    <p>O du, se till att dela anmälningslänken med dina kompisar.</p>
    <p>Tills vi ses, så vill vi bara skicka med dig det här bibelordet. Vad kommer du att tänka på när du läser det? </p>
    <span className='italic'>Liksom ni tog emot Kristus Jesus som Herren,så lev i honom</span>
    <span className='italic'>och låt er rotas och uppbyggas i honom och befästas i tron i </span>
    <span className='italic'>enlighet med den undervisning ni fått, och överflöda i </span>
    <span className='italic'>tacksägelse. - Kol 2:6-7</span>
  </div>
);
