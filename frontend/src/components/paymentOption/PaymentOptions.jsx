import { useState } from "react";

function PaymentOptions() {

    const [paymentMethod, setPaymentMethod] = useState("")
    const setPayment = () => {};

    return(
        <div>
            <p>Choisis une méthode de payement:</p>
            <form className="--form-control" onSubmit={setPayment}>
                <label htmlFor="Payement" className="radio-label">
                    <input type="radio" className="radio-input"
                    name="paymentMethod"
                    id="stripe"
                    value={"stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value)} />
                    <span className="custom-radio"></span>
                    Payement à la livraison
                </label>

                <label htmlFor="Payement" className="radio-label">
                    <input type="radio" className="radio-input"
                    name="paymentMethod"
                    id="paypal"
                    value={"paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)} />
                    <span className="custom-radio"></span>
                    Paypal
                </label>
                <button type="submit"className="--btn --btn-primary --btn-block">
                    Commander
                </button>
            </form>
        </div>
    );
};

export default PaymentOptions;