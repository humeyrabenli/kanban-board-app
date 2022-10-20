import {
  IconButton,
  InputAdornment,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CardHeader,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginFormProps, LoginFormValuesProps } from "./LoginForm.types";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginFormStyles } from "./LoginForm.styles";

const LoginForm = (props: LoginFormProps) => {
  const [formValues, setFormValues] = useState<LoginFormValuesProps>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setFormValues((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = () => {
    props.onLogin?.(formValues);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={loginFormStyles.cardBox}>
      <Card>
        <CardHeader title="Login" />
        <CardContent sx={loginFormStyles.cardContent}>
          <TextField
            label="Enter your username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formValues.password}
            onChange={handleChange}
            sx={{ mt: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />

          <Box sx={loginFormStyles.formGroupBox}>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Remember me" />
            </FormGroup>
            <Link to="#" style={loginFormStyles.link}>
              Forgot password
            </Link>
          </Box>

          <Button onClick={handleSubmit} variant="contained">
            Login now
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account{" "}
            <Link style={loginFormStyles.link} to="/register">
              Sign up!
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
