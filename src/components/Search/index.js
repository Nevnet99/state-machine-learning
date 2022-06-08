import React, { useRef } from "react";
import { useMachine } from "@xstate/react";
import { productsFetchMachine } from "./config";
import { useEffect } from "react";
import { Badge, Box, Image, SimpleGrid } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const Search = () => {
  const fetchedProducts = useRef(false);
  const [current, send] = useMachine(productsFetchMachine);
  const { products } = current.context;

  useEffect(() => {
    if (fetchedProducts.current) return;
    send("FETCH");
    fetchedProducts.current = true;
  }, []);

  return (
    <div>
      {current.matches("error") && <p>Something is wrong...</p>}
      {current.matches("loading") && <p>loading...</p>}
      {
        <SimpleGrid columns={6} spacing={30}>
          {current.matches("success") &&
            products.map(
              ({ id, title, image, price, description, category, rating }) => {
                return (
                  <Box
                    key={id}
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Image src={image} alt={title} w="100%" h="auto" />

                    <Box p="6">
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        noOfLines={1}
                      >
                        {title}
                      </Box>

                      <Box>{price}</Box>

                      <Box display="flex" mt="2" alignItems="center">
                        {Array(5)
                          .fill("")
                          .map((_, i) => (
                            <StarIcon
                              key={i}
                              color={i < rating?.rate ? "teal.500" : "gray.300"}
                            />
                          ))}
                      </Box>
                    </Box>
                  </Box>
                );
              }
            )}
        </SimpleGrid>
      }
    </div>
  );
};

export default Search;
