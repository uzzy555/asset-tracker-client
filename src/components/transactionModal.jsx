import React from "react";

import {
  CircularProgress,
  Dialog,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import { useSelector } from "react-redux";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { shortenAddress } from "../utils/helpers";
import { chainIdToNetworkInfo } from "../redux/web3/constants";

const TX_STATUS = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  REJECTED: "REJECTED",
};

const TransactionModal = ({
  txInfo,
  onClose = () => null,
  onExited = () => null,
}) => {
  const classes = useStyles();

  const { txStatus, txMessage, txHash } = txInfo;
  const { connectedChainId } = useSelector((state) => state.Wallet);

  const blockExplorer =
    chainIdToNetworkInfo[connectedChainId]?.blockExplorerUrl;
  return (
    <Dialog
      open={Boolean(txMessage)}
      TransitionProps={{
        onExited,
      }}
    >
      <DialogContent className={classes.modalMainTransaction}>
        {TX_STATUS.PENDING === txStatus && (
          <>
            <Typography variant="h3" align="center" gutterBottom>
              Transaction In Progress
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
              {txMessage}
            </Typography>

            <CircularProgress className={classes.transactionLoading} />
          </>
        )}

        {TX_STATUS.SUCCESS === txStatus && (
          <>
            <Typography variant="h3" align="center" gutterBottom>
              Transaction Successful
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
              {txMessage}
            </Typography>
            <CheckCircleOutlineRoundedIcon className={classes.deninedIcon} />
          </>
        )}

        {Boolean(txHash) && (
          <a
            href={`${blockExplorer}/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className={classes.txHashText}
          >
            {shortenAddress(txHash)}
          </a>
        )}

        {TX_STATUS.REJECTED === txStatus && (
          <>
            <Typography variant="h3" align="center" gutterBottom>
              Transaction Rejected
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
              {txMessage}
            </Typography>
            <WarningRoundedIcon className={classes.deninedIcon} />
          </>
        )}
        {(TX_STATUS.REJECTED === txStatus ||
          TX_STATUS.SUCCESS === txStatus) && (
          <button className={classes.button} onClick={onClose} type="submit">
            Close
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default TransactionModal;

const useStyles = makeStyles((theme) => ({
  modalMainTransaction: {
    padding: "40px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  transactionLoading: {
    marginTop: "20px",
    color: theme.palette.secondary.main,
  },

  deninedIcon: {
    color: theme.palette.secondary.main,
    width: "100px",
    height: "70px",
  },

  txHashText: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    transition: "all 0.2s",
    marginTop: "1.2rem",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  button: {},
}));
