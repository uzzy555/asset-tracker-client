export const shortenAddress = (address) =>
  address ? `${address.slice(0, 5)}...${address.slice(-5)}` : null;
