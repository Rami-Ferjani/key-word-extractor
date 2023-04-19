import React from "react";
import { Container, Box } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TextInput from "./components/TextInput";
import { useState } from "react";
const App = () => {
  const [keywords, setKeywords] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const extractKeywords = async (text) => {
    setLoading(true);
    setIsOpen(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.REACT_APP_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt:
          "Extract keywords from this text.Make the first letter of each word uppercase and separate with commas\n\n" +
          text +
          "",
        temperature: 0.5,
        max_tokens: 60,
        frequency_penalty: 0.8,
      }),
    };

    const response = await fetch(process.env.REACT_APP_URL, options);

    const json = await response.json();

    const data = json.choices[0].text.trim();
    console.log("hello");
    console.log(data);
    setKeywords(data);
    setLoading(false);
  };
  return (
    <Box
      bg="blue.600"
      color="white"
      height="100vh"
      paddingTop={130}
      overflow="scroll"
    >
      <Container maxW="3xl" centerContent>
        <Header />
        <TextInput extractKeywords={extractKeywords} />
        <Footer />
        <Footer />
      </Container>
    </Box>
  );
};

export default App;
