import { Button, Grid, Box, Typography } from "@mui/material";
import React from "react";
import { Facebook, Google } from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { AddDocument } from "../../firebase/service";
import "./style.scss";
const Login = () => {
  const handleLoginGoogle = async () => {
    const providerGg = new GoogleAuthProvider();
    try {
      const infoUserGg = await signInWithPopup(auth, providerGg);
      const { _tokenResponse, user } = infoUserGg;
      const { photoURL, email, uid, displayName, providerId } = user;
      if (_tokenResponse?.isNewUser) {
        AddDocument("users", {
          photoURL,
          email,
          displayName,
          providerId,
          uid,
        });
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleLoginFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const infoUserFb = await signInWithPopup(auth, provider);
      const { _tokenResponse, user } = infoUserFb;
      const { photoURL, email, uid, displayName, providerId } = user;
      if (_tokenResponse?.isNewUser) {
        AddDocument("users", {
          photoURL,
          email,
          displayName,
          providerId,
          uid,
        });
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Grid container className="login">
      <Grid item xs={4} className="login-body">
        <Box component="div" className="login-body__content">
          <Typography variant="h5">Sign In</Typography>
          <Button
            startIcon={<Google />}
            color="error"
            variant="contained"
            onClick={handleLoginGoogle}
          >
            Đăng nhập bằng Google
          </Button>
          <Button
            startIcon={<Facebook />}
            variant="contained"
            onClick={handleLoginFacebook}
          >
            Đăng nhập bằng Facebook
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
