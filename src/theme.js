import { createTheme } from '@mui/material/styles';
import {grey, red} from '@mui/material/colors';

const theme = createTheme({
	palette: {
		primary: {
			main: grey[900]
		},
		secondary: {
			main: red[500],
			contrastText: grey[500]
		}
	}
})

export default theme;


