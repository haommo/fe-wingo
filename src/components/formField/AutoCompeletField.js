import { Autocomplete, Box, FormControl, TextField, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

export function AutoCompleteField({ name, control, options, placeholder }) {
  const theme = useTheme();
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name,
    control
  });

  // render whatever you want: MUI, Ant Design, Bootstrap, Custom UI
  return (
    <FormControl fullWidth>
      <Autocomplete
        name={name}
        value={value || null}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        autoComplete
        options={options}
        getOptionLabel={(option) => option?.label}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              error={error}
              placeholder={placeholder}
              sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
            />
          );
        }}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {option?.label}
          </Box>
        )}
      />
    </FormControl>
  );
}

AutoCompleteField.propTypes = {
  control: PropTypes.any,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  placeholder: PropTypes.string
};

AutoCompleteField.defaultProps = {
  control: null,
  name: '',
  options: [],
  placeholder: ''
};
