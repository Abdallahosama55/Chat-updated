import React, { useState } from "react";
import "./Table.css";
import { Checkbox } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import setting from "../../assets/Images/control/Vector.svg";
import menu from "../../assets/Images/control/menu-vertical.svg";
import htmlicon from "../../assets/Images/control/xxx-word (1).svg";
import txticon from "../../assets/Images/control/txt-file-type-svgrepo-com 1 (1).svg";
import pdficon from "../../assets/Images/control/pdf-file-type-svgrepo-com 2.svg";
import docxicon from "../../assets/Images/control/pdf-file-type-svgrepo-com 1.svg";
import editicon from "../../assets/Images/control/edit-1.svg";
import delicon from "../../assets/Images/control/shape.svg";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

export default function TableC() {
  const theme = createTheme({
    typography: {
      fontFamily: "GE SS Two, sans-serif",
    },
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: "15px",
            fontWeight: 600,
          },
        },
      },
    },
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const initialCheckboxes = [
    {
      id: 1,
      label: "الاسم",
      checked: false,
      created: "  تم إنشاءه ",
      condtion: false,
    },
    {
      id: 2,
      label: " الاسم",
      checked: false,
      created: "تم إنشاءه ",
      condtion: false,
    },
    {
      id: 3,
      label: "الاسم",
      checked: false,
      created: " تم إنشاءه ",
      condtion: false,
    },
    {
      id: 4,
      label: "الاسم",
      checked: false,
      created: "تم إنشاءه ",
      condtion: false,
    },
    {
      id: 5,
      label: "الاسم",
      checked: false,
      created: "تم إنشاءه ",
      condtion: false,
    },

    // Add more checkboxes as needed
  ];

  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    );
    setCheckboxes(updatedCheckboxes);
  };

  const handleSelectAllChange = () => {
    const allChecked = checkboxes.every((checkbox) => checkbox.checked);
    const updatedCheckboxes = checkboxes.map((checkbox) => ({
      ...checkbox,
      checked: !allChecked,
    }));
    setCheckboxes(updatedCheckboxes);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="table-c mt-5 font-basic>">
     
 
          <div className="d-flex w-100  mt-3 ">
            <div className="d-flex ">
              <div className="col-1  align-items-center  d-flex justify-content-center ">
                <div className=" p-2 rounded">
                  <input
                    className="form-check-input "
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={handleSelectAllChange}
                    checked={checkboxes.every((checkbox) => checkbox.checked)}
                  
              
                  />
                </div>
              </div>
            </div>
            <div className="d-flex w-100  rounded align-items-center py-2 pb-0 ">
              <div className=" col-xl-7 col-lg-7 col-xxl-7 col-md-6 col-5 pb-0   ">
                <p className=" pe-3  pb-0 me-md-0 " style={{color:"rgba(0, 27, 121, 1)"}}>{"الاسم"}</p>
              </div>
              <div className="col-4  text-center  pb-0">
                <p>
              
                    <p className=" w-50 text-center " style={{color:"rgba(0, 27, 121, 1)"}}>الحالة</p>
                  
                </p>
              </div>
              <div className="col-1 text-center   pb-0  text-muted">
                <p style={{color:"rgba(0, 27, 121, 1)"}}>{"تم إنشاءه"}</p>
              </div>
            </div>
            <div className=" ">
              <div className=" d-flex justify-content-center  p-0">
                <div>
                  <Button
                    id=""
                    className=" basic-button  text-move "
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <LazyLoadImage
                      src={setting}
                      className="img d-block text-end me-auto "
                    />
                  </Button>
         
                </div>
              </div>
            </div>
          </div>
      
  

        {checkboxes.map((item) => {
          return (
            <div className="d-flex w-100  mt-3 ">
              <div className="d-flex ">
                <div className="col-1  align-items-center  d-flex justify-content-center ">
                  <div className=" border p-2 rounded">
                    <input
                      className="form-check-input "
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      onChange={() => handleCheckboxChange(item.id)}
                      checked={item.checked}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex w-100 border rounded align-items-center py-2 pb-0 ">
                <div className=" col-xl-7 col-lg-7 col-xxl-7 col-md-6 col-5 pb-0   ">
                  <p className=" pe-3  pb-0 me-md-0 text-muted">{item.label}</p>
                </div>
                <div className="col-4  text-center  pb-0">
                  <p>
                    {item.condtion ? (
                      <p>not empty</p>
                    ) : (
                      <p className=" w-50 text-center text-muted">الحالة</p>
                    )}
                  </p>
                </div>
                <div className="col-1 text-center   pb-0  text-muted">
                  <p className="text-muted">{item.created}</p>
                </div>
              </div>
              <div className=" ">
                <div className=" d-flex justify-content-center  p-0">
                  <div>
                    <Button
                      id=""
                      className=" basic-button  text-move "
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}>
                      <LazyLoadImage
                        src={menu}
                        className="img d-block text-end me-auto "
                      />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      className=" text-move "
                      onClose={handleClose}
                      dir="rtl"
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      PaperProps={{
                        elevation: 1, // Adjust the elevation as per your requirement
                      }}>
                      <MenuItem
                        onClick={handleClose}
                        className=" text-move">
                        <img
                          src={editicon}
                          className="ps-2"
                        />
                        اعاده تسميه
                      </MenuItem>
                      <span className=" text-move fw-light ms-5 p-3">
                        تصدير
                      </span>
                      <Typography variant="body1">
                        <MenuItem
                          onClick={handleClose}
                          className=" text-move">
                          <img
                            src={htmlicon}
                            className="ps-2"
                          />
                          HTML
                        </MenuItem>
                      </Typography>
                      <Typography variant="body1">
                        <MenuItem
                          onClick={handleClose}
                          className=" text-move">
                          <img
                            src={txticon}
                            className="ps-2"
                          />
                          TXT
                        </MenuItem>
                      </Typography>
                      <Typography variant="body1">
                        <MenuItem
                          onClick={handleClose}
                          className=" text-move">
                          <img
                            src={pdficon}
                            className="ps-2"
                          />
                          PDF
                        </MenuItem>
                      </Typography>
                      <Typography variant="body1">
                        <MenuItem
                          onClick={handleClose}
                          className=" text-move fw-bold ">
                          <img
                            src={docxicon}
                            className="ps-2"
                          />
                          DOCX
                        </MenuItem>
                      </Typography>
                      <MenuItem
                        onClick={handleClose}
                        className=" text-danger">
                        <img
                          src={delicon}
                          className="ps-2"
                        />
                        حذف
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ThemeProvider>
  );
}
