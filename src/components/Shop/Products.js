import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const products = [
  {
    id: "id1",
    title: "Test",
    price: 6,
    description: "This is the first product - amazing!",
  },
  {
    id: "id2",
    title: "Test 2",
    price: 3,
    description: "This is the second product - again amazing!",
  },
];

const productList = products.map((item) => (
  <ProductItem key={item.id} product={item} />
));

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productList}</ul>
    </section>
  );
};

export default Products;
