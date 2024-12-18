import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  GetCountries,
  GetState,
  GetCity,
  GetPhonecodes,
} from "react-country-state-city";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [phoneCodes, setPhoneCodes] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const result = await GetCountries();

        const europeCountries = result.filter((item) => {
          return item.region === "Europe";
        });
        setCountries(europeCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry) {
        setLoading(true);
        try {
          const statesList = await GetState(selectedCountry);
          setStates(statesList);
        } catch (error) {
          console.error("Error fetching states:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchStates();
    setSelectedState("");
    setCities([]);
    setPhoneCodes([]);
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        setLoading(true);
        try {
          const citiesList = await GetCity(selectedCountry, selectedState);
          setCities(citiesList);
        } catch (error) {
          console.error("Error fetching cities:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCities();
    setSelectedCity("");
    setPhoneCodes([]);
  }, [selectedCountry, selectedState]);

  useEffect(() => {
    const fetchAdditionalInfo = async () => {
      if (selectedCountry && selectedCity && selectedState) {
        setLoading(true);
        try {
          GetPhonecodes()
            .then((result) => {
              // Filtrage des éléments de la région "Europe"
              const europeCodes = result.filter(
                (item) => item.region === "Europe"
              );
              // Trouver le code du pays sélectionné
              const countryCode = europeCodes.find(
                (code) => code.id === selectedCountry
              );

              if (countryCode) {
                // Mise à jour du préfixe téléphonique
                setPhoneCodes(countryCode.phone_code);
              } else {
                setPhoneCodes(""); // Aucun code trouvé pour ce pays
              }
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la récupération des codes : ",
                error
              );
            });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAdditionalInfo();
  }, [selectedCountry, selectedCity, selectedState]);

  return (
    <Box pl={20}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              label="Country"
            >
              {countries.map((country) => {
                return (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        {selectedCountry && (
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                label="State"
                disabled={states.length === 0}
              >
                {states.map((state) => {
                  return (
                    <MenuItem key={state.id} value={state.id}>
                      {state.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        )}

        {selectedState && (
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                label="City"
                disabled={cities.length === 0}
              >
                {cities.map((city) => {
                  return (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        )}

        {selectedCity && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Phone Codes"
                value={phoneCodes}
                // value={phoneCodes}

                InputProps={{ readOnly: true }}
              />
            </Grid>
          </>
        )}
      </Grid>
      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Countries;
