import { Box, Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const createProduct = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/products", {
        name,
        price: Number(price),
        image,
      });
      console.log(res.data);
      setName("");
      setPrice("");
      setImage("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex justify={"center"} align={"center"} mt="20" direction={"column"}>
        <Text fontSize="32px" textTransform={"uppercase"}>
          create new product
        </Text>
        <Box rounded={"5px"} mt="5" bgColor={"#1A202C"} p="5" minW={"600px"}>
          <Flex onSubmit={createProduct} as="form" direction={"column"} gap={"10px"} alignItems={"center"}>
            <Input onChange={(event) => setName(event.target.value)} rounded={"5px"} placeholder="Enter product name" required />
            <Input onChange={(event) => setPrice(event.target.value)} rounded={"5px"} placeholder="Enter price" required />
            <Input onChange={(event) => setImage(event.target.value)} rounded={"5px"} placeholder="Image url" required />
            <Button type="submit" minW={"300px"} _hover={{ bg: "purple.500", color: "white" }}>
              Add product
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default CreatePage;
