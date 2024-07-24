import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";
import { usePayment } from "../hooks";

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
