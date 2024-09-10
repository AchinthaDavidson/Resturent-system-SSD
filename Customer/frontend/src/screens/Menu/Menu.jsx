import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import axios from "axios";
import Footer from "../../components/Footer";
import ShoppingCart from "./shoppingcart";
import { FaShoppingCart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import "./menu.css";
import { dish } from "../../api/api";
// const products = [
//   {
//     id: 1,
//     name: "Tomato and Onion Salad",
//     price: 550,
//     image: require("../../Images/chicken2.png"),
//   },
//   {
//     id: 2,
//     name: "Cucumber Salad",
//     price: 500,
//     image: require("../../Images/beef.png"),
//   },
//   {
//     id: 3,
//     name: "Tomato and Onion Salad",
//     price: 550,
//     image: require("../../Images/pork.png"),
//   },
//   {
//     id: 4,
//     name: "Cucumber Salad",
//     price: 500,
//     image: require("../../Images/chicken.png"),
//   },
//   {
//     id: 5,
//     name: "Tomato and Onion Salad",
//     price: 550,
//     image: require("../../Images/chicken3.png"),
//   },
//   {
//     id: 6,
//     name: "Cucumber Salad",
//     price: 500,
//     image: require("../../Images/pork2.png"),
//   },
//   {
//     id: 7,
//     name: "Cucumber Salad",
//     price: 500,
//     image: require("../../Images/COCA COLA.png"),
//   },
//   {
//     id: 8,
//     name: "Cucumber Salad",
//     price: 500,
//     image: require("../../Images/SPRITE.png"),
//   },
// ];

function Menu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartsVisibilty, setCartVisible] = useState(false);
  const [search, setSearch] = useState(true);
  const [productsInCart, setProducts] = useState(
    JSON.parse(localStorage.getItem("shopping-cart")) || []
  );
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(productsInCart));
  }, [productsInCart]);
  const addProductToCart = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    setProducts([...productsInCart, newProduct]);
  };

  const onQuantityChange = (productId, count) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex((item) => item.id === productId);
      if (productsIndex !== -1) {
        oldState[productsIndex].count = count;
      }
      return [...oldState];
    });
  };

  const onProductRemove = (product) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex(
        (item) => item.id === product.id
      );
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };

  const [products, setproducts] = useState([]);
  const [menu, setmenu] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/food/")
      .then((res) => {
        setproducts(res.data);

        // setDishes(res.data);
      })
      .catch((err) => console.log(err));
  });



  useEffect(() => {
    axios
      .get("http://localhost:5000/menu/")
      .then((res) => {
        setmenu(res.data);

        // setDishes(res.data);
      })
      .catch((err) => console.log(err));
  });


  const handlePasswordChange = (e) => {
    setSearchTerm(e.target.value);

    if (searchTerm.length >=0 ){
      setSearch(false)
      // alert(searchTerm.length)
      // alert(searchTerm)
    }
 if (searchTerm.length ==0 ){
      setSearch(true)
      // alert(searchTerm.length)
      // alert(searchTerm)
    }
  };

  // function searchdata(){

  
  // if (search.length > 0){
  //   setSearch(false)
  //   alert(search)
  // }
  // else{
  //   setSearch(true)
  //   alert("da")
  // }
  // }
  return (
    <>
      <Header />
      <div className="cont">
        <div className="App">
          <ShoppingCart
            visibilty={cartsVisibilty}
            products={productsInCart}
            onClose={() => setCartVisible(false)}
            onQuantityChange={onQuantityChange}
            onProductRemove={onProductRemove}
          />

          <head>
            <title>Food Menu</title>
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap%22"
              rel="stylesheet"
            />
          </head>

          <body>
            <div className="heading">
              <h1>PALLADIUM RESTAURANT & BAR</h1>
              <h3>&mdash; OUR MENU &mdash;</h3>
            </div>

            <div className="navbar">
              <button
                className="btn-shopping-cart-btn"
                onClick={() => setCartVisible(true)}
              >
                <FaShoppingCart size={35} />
                {productsInCart.length > 0 && (
                  <span className="product-count">{productsInCart.length}</span>
                )}
              </button>
            </div>

            <input
              type="search"
              placeholder="search food....."
              // onChange={(event) => {setSearchTerm(event.target.value),{handlePasswordChange}} }
              onChange={handlePasswordChange}
              // setSearchTerm(event.target.value)
            />

            {search ? (
              <div className="menu">
                {menu.map((menu) => (
                  <div>
                    <div style={{ color: "white" }}>{menu.Name}</div>

                    {products
                      .filter((val) => {
                        if (val.Category.includes(menu.Name)) {
                          return val;
                        }
                      })

                      .map((product) => (
                        <div className="food-items">
                          <div className="image">
                            <img src={product.ImageURL} alt="menu" />
                          </div>
                          <div className="details">
                            <div className="details-sub">
                              <h5>{product.Name}</h5>
                              <h5 class="price">Rs.{product.Price}</h5>
                            </div>

                            <bottom>
                              <button onClick={() => addProductToCart(product)}>
                                Add To Cart
                              </button>
                              <fav>
                                <MdFavorite size={30} />
                              </fav>
                            </bottom>
                          </div>
                        </div>
                      ))}
                    <br />
                  </div>
                ))}
              </div>
            ) :(
              <div className="menu">
              {products
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.Name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })

                .map((product) => (
                  <div className="food-items">
                    <div className="image">
                      <img src={product.ImageURL} alt="menu" />
                    </div>
                    <div className="details">
                      <div className="details-sub">
                        <h5>{product.Name}</h5>
                        <h5 class="price">Rs.{product.Price}</h5>
                      </div>

                      <bottom>
                        <button onClick={() => addProductToCart(product)}>
                          Add To Cart
                        </button>
                        <fav>
                          <MdFavorite size={30} />
                        </fav>
                      </bottom>
                    </div>
                  </div>
                  
                ))}
                </div>
            )}
          </body>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Menu;
