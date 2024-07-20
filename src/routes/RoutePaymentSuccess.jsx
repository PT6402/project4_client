import { useNavigate, useParams } from "react-router-dom";
import usePayment from "../hooks/usePayment";
import { useEffect } from "react";

export default function RoutePaymentSuccess() {
  const navigate = useNavigate();
  const { handleSendStatusPayment } = usePayment();
  const { idOrder, tokenPayment } = useParams();
  useEffect(() => {
    (async () => {
      await handleSendStatusPayment({ orderId: idOrder, token: tokenPayment });
    })();
    navigate("/thank-you");
  });
}
