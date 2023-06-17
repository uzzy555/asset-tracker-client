import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import { FileUploader } from "react-drag-drop-files";
import clsx from "clsx";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "SVG", "MP4"];

function ImageUpload({ formik, value, helperText, error }) {
  const handleChange = (file) => {
    formik.setFieldValue("file", file);
  };
  const classes = useStyles();
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={classes.upload}>
          <div className={classes.widthNft}>
            <PublishIcon className={classes.icon} />

            <Typography variant="h5">Click here or drag and drop</Typography>
          </div>
          {value && (
            <div className={classes.image}>
              <img
                src={value && URL.createObjectURL(value)}
                alt="nft"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
        </div>

        <small
          className={clsx(classes.helperText, { [classes.error]: error })}
          dangerouslySetInnerHTML={{ __html: helperText }}
        />
        <Typography className={classes.helperText}>
          File format&nbsp;:&nbsp; JPEG, GIF, JPG, PNG, SVG, MP4
        </Typography>
      </div>
    </FileUploader>
  );
}

export default ImageUpload;

const useStyles = makeStyles((theme) => ({
  upload: {
    border: `solid 2px ${theme.palette.secondary.main}`,
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    flexDirection: "column",
    height: "40vh",
    width: "20vw",
    overflow: "hidden",
  },
  icon: {
    color: theme.palette.text.primary,
  },
  widthNft: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "Center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    zIndex: 10,
  },

  image: {
    minWidth: "100%",
    minHeight: "100%",
    zIndex: 100,
    "&:hover": {
      zIndex: -1,
    },
  },

  helperText: {
    marginTop: 2,
    fontSize: "1rem",
  },
  error: {
    color: "red",
  },
}));
