import { Box, Button, Container, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const data = res.data;
        console.log(data.data);
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Delete the product?");
      if (!confirmed) return;
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxW={"1100px"}>
      <Grid templateColumns={"repeat(3,1fr)"} gap={"20px"} mt={12}>
        {products.map((product, index) => (
          <GridItem key={index} color="white" rounded={"12px"} overflow={"hidden"}>
            <Image width={"100%"} height={"150px"} src={`${product.image}`} alt={product.name} fit={"cover"} />
            <Box px={4} fontWeight={"bold"} py={3} bgColor={"#1A202C"}>
              <Text>{product.name}</Text>
              <Text mt="2">${product.price}</Text>
              <Flex direction={"row"} gap={"10px"} alignItems={"center"} mt="2">
                <ChakraLink asChild display="inline-block" p={3} bg="blue" color="white" rounded={"4px"}>
                  <RouterLink to={`/edit/${product._id}`}>
                    <MdEdit />
                  </RouterLink>
                </ChakraLink>

                <Button onClick={() => handleDelete(product._id)} maxW={"40px"} bgColor={"red"} color={"white"}>
                  <MdDelete />
                </Button>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
