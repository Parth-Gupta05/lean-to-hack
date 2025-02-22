import React, { useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
// import Image from 'next/image';

import { VotingContext } from "../context/Voter";
// import styles from 'stream'
// import images from 'images'
import Button from "../components/Button/Button";
import Input from "../components/Input/Input.jsx";

const allowedVoter = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  const router = useRouter();
  const { uploadToIPFS } = useContext(VotingContext);

  const onDrop = useCallback(async (acceptedFil) => {
    const url = await uploadToIPFS(acceptedFil[0]);
    setFileUrl(url);
  });

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept:"image/*",
    maxSize: 5000000,
  });

  return <div></div>;
};

export default allowedVoter;
