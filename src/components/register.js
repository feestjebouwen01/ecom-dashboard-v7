import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
// MaterialUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const PaperStyled = styled('div')(({ theme }) => ({
	marginTop: theme.spacing(8),
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
	margin: theme.spacing(1),
	backgroundColor: theme.palette.secondary.main,
}));

const FormStyled = styled('form')(({ theme }) => ({
	width: '100%', // Fix IE 11 issue.
	marginTop: theme.spacing(3),
}));

const SubmitButtonStyled = styled(Button)(({ theme }) => ({
	margin: theme.spacing(3, 0, 2),
}));

export default function Register() {  // Renamed from SignUp to Register
	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post(`user/register/`, {
				email: formData.email,
				user_name: formData.username,
				password: formData.password,
			})
			.then((res) => {
				navigate('/login');
				console.log(res);
				console.log(res.data);
			});
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<PaperStyled>
					<AvatarStyled />
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<FormStyled noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									autoComplete="username"
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>
						</Grid>
						<SubmitButtonStyled
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							onClick={handleSubmit}
						>
							Sign Up
						</SubmitButtonStyled>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="#" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</FormStyled>
				</PaperStyled>
			</Container>
		</ThemeProvider>
	);
}
