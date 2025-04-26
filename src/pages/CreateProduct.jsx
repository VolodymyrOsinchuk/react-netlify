// CreateProduct.js

import React, { useState } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
} from "@mui/material";

// Action function for form submission
export const action = async ({ request }) => {
  const formData = await request.formData();

  const productName = formData.get("name");
  const productDescription = formData.get("description");
  const files = formData.getAll("images");

  // Prepare formData for images
  const productData = new FormData();
  productData.append("name", productName);
  productData.append("description", productDescription);
  files.forEach((file) => productData.append("images", file));

  try {
    const response = await axios.post(
      "https://vercel-node-vert.vercel.app/api/v1/products",
      productData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return {
      data: response.data,
      success: true,
      message: "Product created successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error creating product.",
    };
  }
};

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const actionData = useActionData();
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    files.forEach((file) => formData.append("images", file));

    try {
      const actionResponse = await action({ request: { formData } });
      if (actionResponse.success) {
        // Reset form and navigate to a different route if needed
        setName("");
        setDescription("");
        setFiles([]);
        navigate("/success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{ maxWidth: 600, mx: "auto", my: 4, px: 2 }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Create Product
          </Typography>
          {actionData?.message && (
            <Alert severity={actionData.success ? "success" : "error"}>
              {actionData.message}
            </Alert>
          )}
          <Grid container spacing={2} direction="column">
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                id="name"
                label="Product Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                id="description"
                label="Product Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid
              size={{ xs: 12 }}
              {...getRootProps()}
              sx={{
                border: "2px dashed grey",
                borderRadius: "8px",
                p: 3,
                textAlign: "center",
                my: 2,
                backgroundColor: "#f5f5f5",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              <input {...getInputProps()} name="images" />
              <Typography variant="body1">
                Drag 'n' drop some files here, or click to select files
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box display="flex" flexWrap="wrap" justifyContent="center">
                {files.map((file, index) => (
                  <img
                    key={index}
                    src={file.preview}
                    alt="preview"
                    width={100}
                    style={{
                      margin: "5px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ borderRadius: "8px", height: "56px" }} // Enhanced button styling
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateProduct;
