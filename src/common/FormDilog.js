import React, { useState } from "react";
import { Dialog } from "@material-ui/core";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";
// import { deleteStore } from "../store/ApiStore";

const FormDilog = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {

    setOpen(true);
  };

  const handleClose = () => {
    const storeId = props.deleteEle;
    //  deleteStore(storeId).then((data)=>{

    //  })
    setOpen(false);
  };

  return(
  <div>
    <button className={props.btnClass} variant="outlined" onClick={handleClickOpen}>
    <i className={props.btnIcon}></i>
    </button>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.dilogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
         {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose()}>Yes</Button>
        <Button onClick={handleClose} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  </div>)
};

export default FormDilog;
