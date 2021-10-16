import {
  Button,
  Grid,
  Typography,
  Box,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  TextField,
} from "@mui/material";
import React from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import "./style.scss";
import TodoItem from "./TodoItem";
import InputAdd from "./InputAdd";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { AddDocument } from "../../firebase/service";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Home = () => {
  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {
        toast.success("Đăng xuất thành công");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const { infoUserLogin } = React.useContext(AuthContext);
  const { displayName, photoURL } = infoUserLogin;
  const [input, setInput] = React.useState("");
  const [data, setData] = React.useState([]);
  const [dataCurrent, setdataCurrent] = React.useState({});
  const [valueEdit, setValueEdit] = React.useState("");
  const handleAddTodoList = async () => {
    if (input.trim() !== "") {
      try {
        await AddDocument("listtodos", {
          content: input,
          uid: infoUserLogin.uid,
        });
        toast.success("Thêm thành công !!");
      } catch (e) {
        toast.error(e);
      }
    }
  };
  const handleDeleteTodoList = async (uid) => {
    setOpen(true);
    const docRef = doc(db, "listtodos", uid);
    const docSnap = await getDoc(docRef);
    setdataCurrent({
      ...docSnap._document.data.value.mapValue.fields,
      id: docSnap.id,
    });
  };
  React.useEffect(() => {
    if (infoUserLogin.uid) {
      const todoRef = collection(db, "listtodos");
      const q = query(
        todoRef,
        where("uid", "==", infoUserLogin.uid),
        orderBy("createdAt")
      );
      const unsub = onSnapshot(q, (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            ...doc.data(),
            idDocument: doc.id,
          });
        });
        setData(data);
      });
      return unsub;
    }
  }, [infoUserLogin.uid]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const deleteTodo = async () => {
    try {
      await deleteDoc(doc(db, "listtodos", dataCurrent.id));
      setOpen(false);
      toast.success(`Xóa thành công ${dataCurrent.content.stringValue}!!`);
    } catch (e) {
      setOpenEdit(false);
      toast.error("Xóa thất bại!");
    }
  };
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setValueEdit("");
  };
  const handleEditTodoList = async (uid) => {
    setOpenEdit(true);

    const docRef = doc(db, "listtodos", uid);
    const docSnap = await getDoc(docRef);
    setdataCurrent({
      ...docSnap._document.data.value.mapValue.fields,
      id: docSnap.id,
    });
  };
  const changeYourWork = (e) => {
    setValueEdit(e.target.value);
  };
  const handleEditTodo = async () => {
    try {
      const docRef = doc(db, "listtodos", dataCurrent.id);
      await updateDoc(docRef, {
        content: valueEdit,
      });
      setOpenEdit(false);
      setValueEdit("");
      toast.success(`Sửa thành công!!`);
    } catch (e) {
      setOpenEdit(false);
      setValueEdit("");
      toast.error(e);
    }
  };
  React.useEffect(() => {
    if(Object.keys(dataCurrent).length !== 0){
      setValueEdit(dataCurrent.content.stringValue);
    }
  },[dataCurrent])
  return (
    <>
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Edit your work</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {Object.keys(dataCurrent).length === 0
              ? ""
              : `Bạn đang sửa "${dataCurrent.content.stringValue}" thành `}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="todo"
            label="Change your work"
            type="text"
            fullWidth
            onChange={changeYourWork}
            variant="standard"
            value={valueEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleCloseEdit}>
            Hủy
          </Button>
          <Button variant="contained" color="success" onClick={handleEditTodo}>
            Sửa
          </Button>
        </DialogActions>
      </Dialog>
      {/*  */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Bạn có chắc bạn muốn xóa nội dung này?"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ fontWeight: "bolder" }}
          >
            {Object.keys(dataCurrent).length === 0
              ? ""
              : dataCurrent.content.stringValue}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="contained" color="success" onClick={deleteTodo}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      {/*  */}
      <Grid container className="home">
        <Button
          variant="contained"
          color="error"
          className="logout"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
        <Grid item xs={10} className="home-body">
          <Box component="div" className="home-body__header">
            {console.log(photoURL)}
            <Avatar
              alt="avatar"
              src={photoURL}
              sx={{ width: 125, height: 125 }}
            />
          </Box>
          <Typography variant="h3" className="home-body__title">
            {displayName}'s Todo List
          </Typography>
          <InputAdd
            input={input}
            setInput={setInput}
            handleAddTodoList={handleAddTodoList}
          />
          <Box component="div" className="home-body-content">
            {data.length !== 0
              ? data.map((item, index) => {
                  return (
                    <TodoItem
                      key={index}
                      todo={item.content}
                      idDocument={item.idDocument}
                      handleDeleteTodoList={handleDeleteTodoList}
                      handleEditTodoList={handleEditTodoList}
                    />
                  );
                })
              : ""}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
