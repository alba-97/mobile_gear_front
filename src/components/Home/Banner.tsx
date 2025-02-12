import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import bgImage from "@/assets/background.jpg";

interface IBannerProps {
  productsRef: React.RefObject<HTMLDivElement>;
  discountedProductsRef: React.RefObject<HTMLDivElement>;
}

export default ({ productsRef, discountedProductsRef }: IBannerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      bgSize="cover"
      bgPosition="center"
      minH="300px"
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems={{ base: "center", "818px": "flex-start" }}
      px={4}
      backgroundColor="#2c0c52"
      backgroundImage={{ "818px": bgImage }}
      paddingLeft={{ lg: "50px" }}
    >
      <Heading
        color="white"
        fontSize={{ base: "4xl", "818px": "3xl" }}
        textAlign="center"
        fontWeight="bold"
        mb={8}
        textShadow={"2px 2px 4px black"}
      >
        UPGRADE YOUR CELLPHONE
      </Heading>

      <Flex
        direction={{ base: "column", sm: "row" }}
        align="center"
        gap={{ sm: 4 }}
        rowGap={{ base: 4, sm: 0 }}
      >
        <Button
          colorScheme="yellow"
          size={{ base: "md", sm: "lg" }}
          px={6}
          py={3}
          h={{ base: 14, sm: 16 }}
          fontSize="xl"
          fontWeight="bold"
          borderRadius="full"
          transition="transform 0.2s"
          transform={isHovered ? "scale(1.05)" : "scale(1)"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() =>
            discountedProductsRef.current?.scrollIntoView({
              behavior: "smooth",
            })
          }
          zIndex={1}
          boxShadow={"2px 2px 4px black"}
        >
          20% OFF
        </Button>

        <Button
          variant="outline"
          color="white"
          borderWidth={2}
          borderColor="white"
          _hover={{ bg: "whiteAlpha.100" }}
          size={{ base: "md", sm: "lg" }}
          px={6}
          py={3}
          h={{ base: 14, sm: 16 }}
          fontSize="xl"
          borderRadius="full"
          transition="background-color 0.2s"
          onClick={() =>
            productsRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          zIndex={1}
          boxShadow={"2px 2px 4px black"}
        >
          <Flex gap={2} align="center">
            <Box as="span" fontStyle="italic">
              SHOP NOW
            </Box>
            <Box as="span">PAY LATER</Box>
          </Flex>
        </Button>
      </Flex>
    </Box>
  );
};
