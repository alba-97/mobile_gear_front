import React, { useState } from 'react';
import {
	Button,
	Flex,
	Heading,
	Spacer,
	ButtonGroup,
	Box,
	Menu,
	MenuList,
	MenuItem,
	MenuButton,
	MenuDivider,
	Input,
	IconButton,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FaShoppingCart } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { fetchProducts } from '../state/products/productsActions';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../state/user/userActions';

import { fetchProduct } from '../state/products/productsActions';

export const Navbar = () => {
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
	const userData = useSelector((state) => state.user.userData);
	const is_admin = useSelector((state) => state.user.is_admin);
	const categoryInput = useInput();

	const filters = {
		categoryName: categoryInput.value,
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const searchInput = useInput();
	const [showSearchBar, setShowSearchBar] = useState(false);

	const toggleSearchBar = () => {
		setShowSearchBar(!showSearchBar);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		dispatch(fetchProducts(searchInput.value));
		searchInput.reset();
	};

	const handleCategorySelect = (categoryName) => {
		categoryInput.setValue(categoryName);
		filters.categoryName = categoryName;
		dispatch(fetchProducts('', filters));
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/');
	};

	return (
		<>
			<Flex
				width="100%"
				alignItems="center"
				gap="2"
				p="4"
				backgroundColor="#EC4E20"
			>
				<Box p="2">
					<Heading
						as={Link}
						to="/"
						size="xl"
						color="white"
						onClick={() => handleCategorySelect('')}
					>
						Mobile Gear
					</Heading>
				</Box>
				<Flex ml="20" gap="8">
					<Menu>
						<MenuButton
							fontSize="lg"
							color="white"
							onClick={() => handleCategorySelect('smartphone')}
						>
							Mobile Phones
						</MenuButton>
					</Menu>
					<Menu>
						<MenuButton
							fontSize="lg"
							color="white"
							onClick={() => handleCategorySelect('tablets')}
						>
							Tablets
						</MenuButton>
					</Menu>
					<Menu>
						<MenuButton
							fontSize="lg"
							color="white"
							onClick={() => handleCategorySelect('accesorios')}
						>
							Accessories
						</MenuButton>
					</Menu>
				</Flex>
				<Spacer />
				<Box mr={10}>
					<form onSubmit={handleSearchSubmit}>
						<Flex>
							{showSearchBar && (
								<Input
									{...searchInput}
									placeholder="Buscar por modelo"
									variant="filled"
									size="md"
									borderRadius="full"
									bg="white"
									boxShadow="md"
									_hover={{ boxShadow: 'lg' }}
									_focus={{ boxShadow: 'lg', color: 'white' }}
								/>
							)}
							<IconButton
								icon={<SearchIcon />}
								type="submit"
								size="lg"
								ml={2}
								borderRadius="full"
								bg="secondary"
								color="white"
								_hover={{ bg: '#3498DB' }}
								_active={{ bg: '#3498DB' }}
								onClick={toggleSearchBar}
							/>
							<IconButton
								as={Link}
								to="/cart"
								icon={<FaShoppingCart />}
								size="lg"
								ml={2}
								borderRadius="full"
								bg="secondary"
								color="white"
								_hover={{ bg: '#3498DB' }}
								_active={{ bg: '#3498DB' }}
							/>
						</Flex>
					</form>
				</Box>
				{isAuthenticated ? (
					<Menu>
						<MenuButton fontSize="2xl" color="white">
							{userData.email}
						</MenuButton>
						<MenuList>
							<MenuItem as={Link} to="/">
								Account
							</MenuItem>
							<MenuItem as={Link} to="/history">
								History
							</MenuItem>
							{is_admin ? (
								<MenuItem as={Link} to="/admin">
									My dashboard
								</MenuItem>
							) : (
								<MenuItem as={Link} to="">
									My list
								</MenuItem>
							)}
							<MenuDivider />

							<MenuItem as={Link} to="/" onClick={handleLogout}>
								Log out
							</MenuItem>
						</MenuList>
					</Menu>
				) : (
					<ButtonGroup gap="2">
						<Link to="/signup">
							<Button variant="outline" border="1px solid black">
								Sign Up
							</Button>
						</Link>
						<Link to="/login">
							<Button backgroundColor="#3498DB" color="white">
								Log in
							</Button>
						</Link>
					</ButtonGroup>
				)}
			</Flex>
		</>
	);
};
