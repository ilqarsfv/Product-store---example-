import { Box, Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);

        setProduct(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        ...product,
        price: Number(product.price),
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex justify={"center"} align={"center"} mt="20" direction={"column"}>
        <Text fontSize="32px" textTransform={"uppercase"} color={"white"}>
          {name}
        </Text>
        <Box rounded={"5px"} mt="5" bgColor={"#1A202C"} p="5" minW={"600px"}>
          <Flex onSubmit={handleUpdate} as="form" direction={"column"} gap={"10px"} alignItems={"center"}>
            <Input name="name" value={product.name} onChange={handleChange} rounded={"5px"} placeholder="Enter product name" required />
            <Input name="price" value={product.price} type="number" onChange={handleChange} rounded={"5px"} placeholder="Enter price" required />
            <Input name="image" value={product.image} onChange={handleChange} rounded={"5px"} placeholder="Image url" required />
            <Button type="submit" minW={"300px"} _hover={{ bg: "purple.500", color: "white" }}>
              Add product
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default EditPage;
