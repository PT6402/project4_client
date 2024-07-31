function parsePaymentUrl(url) {
  const regex = /^\/payment\/success\/(\d+)\/([\w-]+\.[\w-]+\.[\w-]+)$/;
  const match = url.match(regex);

  if (match) {
    return {
      orderId: match[1],
      tokenId: match[2],
    };
  }

  return null;
}

export default parsePaymentUrl;
