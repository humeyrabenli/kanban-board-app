import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import {
  RegisterFormProps,
  RegisterFormValuesProps,
} from "./RegisterForm.types";
import { registerFormStyles } from "./RegisterForm.styles";

const RegisterForm = (props: RegisterFormProps) => {
  const [formValues, setFormValues] = useState<RegisterFormValuesProps>({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setFormValues((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = () => {
    props.onRegister?.(formValues);
  };

  return (
    <Box sx={registerFormStyles.cardBox}>
      <Card>
        <CardHeader title="Register" />
        <CardContent sx={registerFormStyles.cardContent}>
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
            label="Create a password"
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

          <TextField
            id="input-with-icon-textfield"
            label="Confirm the password"
            name="passwordConfirm"
            type={showPassword ? "text" : "password"}
            value={formValues.passwordConfirm}
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

          <Box sx={registerFormStyles.formGroupBox}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="I accept all terms & conditions"
              />
            </FormGroup>
          </Box>

          <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
            Register now
          </Button>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account{" "}
            <Link style={registerFormStyles.link} to="/login">
              Sign in!
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterForm;
