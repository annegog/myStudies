import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import BookIcon from "@mui/icons-material/Bookmark";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StudyIcon from "@mui/icons-material/LibraryBooksOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";


export default function NestedList() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = React.useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleOpenHistoryModal = () => {
    setHistoryModalOpen(true);
  };

  const handleCloseHistoryModal = () => {
    setHistoryModalOpen(false);
  };

  const handleOpenDetailsModal = () => {
    setDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
  };

  const handleHistoryButtonClick = () => {
    alert("Button clicked!"); // Example: showing an alert
  };

  const handleDetailsButtonClick = () => {
    alert("Button clicked!"); // Example: showing an alert
  };

  return (
    <List
      // maxWidth: 660
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Programma Spoudwn
      //   </ListSubheader>
      // }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Εξάμηνο 1" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleClick2}>
            <ListItemText primary="Υποχρεωτικά Μαθήματα" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {/* Λίστα απο μαθηματα που είναι στο εξάμηνό αυτό και είναι υποχρεωτικά */}
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <div className="flex items-center">
                  <ListItemText primary="μάθημα 1" />
                  <button className="ml-2" onClick={handleOpenHistoryModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                      />
                    </svg>
                  </button>
                  <button className="ml-2" onClick={handleOpenDetailsModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                      />
                    </svg>
                  </button>
                </div>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Collapse>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleClick2}>
            <ListItemText primary="Εργαστήρια" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {/* λιστα */}
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="ααααα" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Collapse>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleClick2}>
            <ListItemText primary="Μαθήματα Επιλογής" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {/* λιστα */}
        </List>
      </Collapse>


      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Εξάμηνο 2" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleClick2}>
            <ListItemText primary="Υποχρεωτικά Μαθήματα" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {/* Λίστα απο μαθηματα που είναι στο εξάμηνό αυτό και είναι υποχρεωτικά */}
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <div className="flex items-center">
                  <ListItemText primary="μάθημα 1" />
                  <button className="ml-2" onClick={handleOpenHistoryModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                      />
                    </svg>
                  </button>
                  <button className="ml-2" onClick={handleOpenDetailsModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                      />
                    </svg>
                  </button>
                </div>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Collapse>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleClick2}>
            <ListItemText primary="Εργαστήρια" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {/* λιστα */}
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="ααααα" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Collapse>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleClick2}>
            <ListItemText primary="Μαθήματα Επιλογής" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {/* λιστα */}
        </List>
      </Collapse>


      {/* History Modal */}
      <Dialog open={isHistoryModalOpen} onClose={handleCloseHistoryModal}>
        <DialogTitle>Ιστορικό</DialogTitle>
        <DialogContent>
          <DialogContentText>Content of the history modal...</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHistoryModal}>ΚΛΕΙΣΙΜΟ</Button>
        </DialogActions>
      </Dialog>

      {/* Details Modal */}
      <Dialog open={isDetailsModalOpen} onClose={handleCloseDetailsModal}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Content of the details modal...</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </List>
  );
}
