import { useState } from 'react';


const Gdpr = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            {showModal ? (
                <dialog className="modal" open>
                    <div className="modal-box bg-brown">
                        <button
                            onClick={() => setShowModal(prev => !prev)}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>
                        <h3 className="font-bold text-lg">Allmänna villkor!</h3>
                        <p className="pb-4">
                            Pingstkyrkan Västra Frölunda behandlar de personuppgifter du anger i samband med anmälan för att kunna administrera ditt deltagande.
                        </p>
                        <p className="pb-4">
                            Vi lagrar dina personuppgifter till dess evenemanget ägt rum, vilket görs för att möjliggöra kontakt med dig. Du har rätt till tillgång och information om hur vi behandlar dina personuppgifter, att få felaktiga uppgifter rättade (hör gärna av dig när dina uppgifter ändras), överflödig information begränsad, ogrundad behandling raderad och rätt att få dina personuppgifter flyttade.
                        </p>
                        <p className="pb-4">
                            Som registrerad har du rätt att kontakta datainspektionen (<a href="https://www.datainspektionen.se" target="_blank" className="underline" >www.datainspektionen.se</a>) om du vill lämna klagomål. Vill du använda dina rättigheter eller har funderingar om hur vi behandlar dina personuppgifter, vänligen kontakta Expeditionen, gärna via mail till; <a href="mailto:info@frolunda.pingst.se" target="_blank" className="underline">info@frolunda.pingst.se</a>.
                        </p>
                    </div>
                </dialog>
            ) : (
                <button className="mb-3" onClick={() => setShowModal(prev => !prev)}>
                    <p className='underline text-xs font-bold text-whiteShade'>Läs mer här.</p>
                </button>
            )}
        </div>
    );
};

export default Gdpr;
