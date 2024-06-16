import { paymentTypeActions } from "../slices/payment-type";

const getAllPaymentTypes = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/payment-types`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(paymentTypeActions.getAllPaymentTypes(responseData));
    }
  };
};

export { getAllPaymentTypes };
