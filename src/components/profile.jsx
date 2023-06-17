import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  makeStyles,
  Paper,
  Snackbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LanguageIcon from "@material-ui/icons/Language";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
const Profile = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { walletAddress } = useParams();
  const [isReadMore, setIsReadMore] = useState(true);
  const [openCopyAlert, setOpenCopyAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleChnageToEditProfile = () => {
    navigate(`/userprofile/${walletAddress}/edit`);
  };

  const {
    userProfileData: {
      bio,
      username,
      createdAt,
      instagram,
      twitter,
      facebook,
      portfolio,
      img,
    },
  } = useSelector((state) => state.UserProfile);
  const { userWallet } = useSelector((state) => state.Auth.user);
  const handleSnackClose = () => setOpenCopyAlert(false);
  const copyAddressToClipboard = () => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        setAlertMessage("Address Copied!");
      })
      .catch(() => {
        setAlertMessage("Could not copy address!");
      });
    setOpenCopyAlert(true);
  };
  const createdDate = new Date(createdAt);

  return (
    <Paper className={classes.userProfilecard}>
      <Snackbar
        open={openCopyAlert}
        autoHideDuration={2000}
        onClose={handleSnackClose}
      >
        <MuiAlert severity="success">{alertMessage}</MuiAlert>
      </Snackbar>
      <Box className={classes.media}>
        <Avatar src={img} className={classes.image} />
      </Box>
      <div className={classes.main}>
        <Box px={5} className={classes.root}>
          <Box pb={5}>
            <Box className={classes.cardTitleContainer}>
              <Box display={"flex"} justifyContent="center">
                {" "}
                <Tooltip title="Copy Address" placement="top">
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    className={classes.avatarLink}
                    onClick={copyAddressToClipboard}
                  ></Typography>
                </Tooltip>
              </Box>
              <Typography
                className={classes.username}
                variant="h5"
                component="h2"
              >
                @{username}
              </Typography>

              <Box mt={1} style={{ textAlign: "center", marginTop: "20px" }}>
                <Typography variant="h4">Bio</Typography>
                <Divider className={classes.cardDivider} />
                <Typography
                  variant="body2"
                  component="p"
                  style={{
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  {isReadMore && bio && bio.length > 120
                    ? bio.slice(0, 120)
                    : bio}
                  <span
                    onClick={toggleReadMore}
                    className={classes.readMore}
                  ></span>
                </Typography>
              </Box>

              <div className={classes.cardButton}>
                <Typography variant="h4">Links</Typography>
                <Divider className={classes.cardDivider} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  <IconButton
                    href={portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={!Boolean(portfolio)}
                    className={classes.linkIcon}
                  >
                    <LanguageIcon />
                  </IconButton>
                  <IconButton
                    href={twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={!Boolean(twitter)}
                    className={classes.linkIcon}
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={!Boolean(instagram)}
                    className={classes.linkIcon}
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={!Boolean(facebook)}
                    className={classes.linkIcon}
                  >
                    <FacebookIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.cardButton}>
                <Typography variant="h4">Joined Date</Typography>
                <Divider className={classes.cardDivider} variant="middle" />
                <Box pt={2}>
                  <Typography variant="body2">
                    {createdDate.toLocaleDateString()}
                  </Typography>
                </Box>
              </div>
            </Box>
          </Box>
          {userWallet === walletAddress && (
            <Box className={classes.cardendButton}>
              <Button
                className="button"
                variant="outlined"
                onClick={handleChnageToEditProfile}
              >
                Edit Profile
              </Button>
            </Box>
          )}
        </Box>
      </div>
    </Paper>
  );
};

export default Profile;
const useStyles = makeStyles((theme) => ({
  cardTitleContainer: {
    textAlign: "center",
    color: theme.palette.text.primary,
    display: "grid",
    placeContent: "center",
  },
  username: {
    fontSize: 15,
    fontStyle: "italic",
  },
  cardDivider: {
    backgroundColor: theme.palette.primary.light,
    width: "100%",
    margin: "10px 0 0 0",
  },
  linkIcon: {
    textDecoration: "none",
    color: "white",
    cursor: "pointer",
  },
  cardButton: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",

    justifyContent: "space-evenly",
    paddingTop: 20,
  },
  cardendButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 0px",

    "& .button": {
      width: 160,
    },
  },
  userProfilecard: {
    position: "relative",
    top: 30,
    borderRadius: 25,
    width: 370,
    height: "max-content",
    paddingBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
    },
  },
  media: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 25,
    position: "relative",
    height: 110,
  },
  image: {
    position: "absolute",
    top: "-50%",
    width: 130,
    height: 130,
    borderRadius: "100%",
    border: "5px solid" + theme.palette.secondary.main,
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100px",
      height: "100px",
    },
  },
  readMore: {
    fontSize: "15px",
    fontStyle: "italic",
    cursor: "pointer",
    fontWeight: "bolder",
    color: theme.palette.text.primary,
  },
  avatarLink: {
    cursor: "pointer",
    width: "fit-content",
    padding: 3,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));
