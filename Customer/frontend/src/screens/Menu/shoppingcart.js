import React, { useEffect, useState } from "react";
import "./shoppingcart.css";
import { IoMdCloseCircle } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

function ShoppingCart({
	visibilty,
	products,
	onProductRemove,
	onClose,
	onQuantityChange,
})
{
	const handleButtonClick = () => {
			let res = JSON.parse(localStorage.getItem("userData"));
			if (!res) {
				window.location.href = "/Signin"
			}
			else{

			}
	}

	return (
		<div
			className="model"
			style={{
				display: visibilty
					? "block"
					: "none",
			}}>
			<div className="shoppingCart">
				<div className="header">
					<h2>Shopping cart</h2>
					<button
						className="btn close-btn"
						onClick={onClose}>
						<IoMdCloseCircle
							size={30}
						/>
					</button>
				</div>
				<div className="cart-products">
					{products.length === 0 && (
						<span className="empty-text">
							Your cart is
							currently empty
						</span>
					)}
					{products.map((product) => (
						<div
							className="cart-product"
							key={product.id}>
							<img
								src={
									product.ImageURL}
								alt={product.Name}
							/>
							<div className="product-info">
								<h3>
									{product.Name}
								</h3>
								<span className="product-price">
									Rs. {product.Price *
										product.count}
									
								</span>
							</div>
							<input type= "number" className="count" min="1" max="100" pattern="[0-9]+"
								value={
									product.count
								}
								onChange={(
									event
								) => {
									onQuantityChange(
										product.id,
										event
											.target
											.value
									);
								}}>
								
							</input>
							<button
								className="btn remove-btn"
								onClick={() =>
									onProductRemove(
										product
									)
								}>
								<RiDeleteBin6Line
									size={20}
								/>
							</button>
						</div>
					))}
					{products.length > 0 && (
						<button className="btn checkout-btn" onClick={handleButtonClick}>
							Proceed to checkout
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;