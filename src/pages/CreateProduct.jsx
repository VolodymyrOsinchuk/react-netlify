import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { TextField, Button, Box, Grid } from "@mui/material";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

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
      const res = await axios.post(
        "https://vercel-node-vert.vercel.app/api/v1/products",
        formData
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box ml={20} component="form" onSubmit={handleSubmit}>
      <Grid
        container
        spacing={2}
        direction="column"
        width="400px"
        alignItems="end"
      >
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="name"
            label="Product Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="description"
            label="Product Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={6}
          {...getRootProps()}
          sx={{ border: "2px dashed grey", p: 2, textAlign: "center", my: 2 }}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </Grid>
        <Grid item xs={6}>
          {files.map((file, index) => (
            <img
              key={index}
              src={file.preview}
              alt="preview"
              width={100}
              style={{ margin: "0 10px 10px 0" }}
            />
          ))}
        </Grid>
        <Grid item xs={6}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CreateProduct;
