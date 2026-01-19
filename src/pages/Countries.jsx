import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  GetCountries,
  GetState,
  GetCity,
  GetPhonecodes,
} from "react-country-state-city";
import { useLoaderData, useNavigation } from "react-router-dom";

// Loader function to fetch countries
export const loader = async () => {
  const countries = await GetCountries();
  return countries.filter((item) => item.region === "Europe");
};

// Action that can be used up for changing and fetching phone codes based on different criteria
export const action = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const countryId = formData.get("countryId");
  const stateId = formData.get("stateId");
  const cityId = formData.get("cityId");

  if (countryId && stateId && cityId) {
    const phoneCodes = await GetPhonecodes();
    const code = phoneCodes.find((item) => item.id === countryId);
    return code ? code.phone_code : "";
  }
  return "";
};

const Countries = () => {
  const countriesData = useLoaderData(); // Get data from loader
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [, setLoading] = useState(false);
  const [phoneCodes, setPhoneCodes] = useState("");

  const navigation = useNavigation();

  // fetch states when country is selected
  const handleCountryChange = async (e) => {
    setLoading(true);
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setSelectedState("");
    setCities([]);

    const statesList = await GetState(countryId);
    setStates(statesList);
    setLoading(false);
  };

  // fetch cities when state is selected
  const handleStateChange = async (e) => {
    setLoading(true);
    const stateId = e.target.value;
    setSelectedState(stateId);
    setSelectedCity("");

    const citiesList = await GetCity(selectedCountry, stateId);
    setCities(citiesList);
    setLoading(false);
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Call the action to get the phone code
    const code = await action({ request: { text: () => formData } });
    setPhoneCodes(code);
  };

  return (
    <Box p={2} maxWidth="lg" mx="auto">
      <Typography variant="h4" align="center" gutterBottom>
        Select Location
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Country</InputLabel>
              <Select
                value={selectedCountry}
                onChange={handleCountryChange}
                label="Country"
              >
                {countriesData.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {selectedCountry && (
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>State</InputLabel>
                <Select
                  value={selectedState}
                  onChange={handleStateChange}
                  label="State"
                  disabled={states.length === 0}
                >
                  {states.map((state) => (
                    <MenuItem key={state.id} value={state.id}>
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {selectedState && (
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>City</InputLabel>
                <Select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  label="City"
                  disabled={cities.length === 0}
                >
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {selectedCity && (
            <Grid i size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                fullWidth
                label="Phone Codes"
                value={phoneCodes}
                slotProps={{ input: { readOnly: true } }}
                variant="outlined"
              />
            </Grid>
          )}
        </Grid>

        <Box display="flex" justifyContent="center" mt={3}>
          <button
            type="submit"
            disabled={!selectedCity || !selectedCountry || !selectedState}
          >
            Submit
          </button>
        </Box>

        {navigation.state === "loading" && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        )}
      </form>

      <Typography variant="body2" align="center" mt={3}>
        Select your country, state, and city to get the phone code!
      </Typography>
    </Box>
  );
};

export default Countries;
