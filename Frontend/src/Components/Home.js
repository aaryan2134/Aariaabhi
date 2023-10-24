import { Grid } from "@material-ui/core";
import React from "react";
import ProductCard from "./ProductCard";
import { makeStyles } from "@material-ui/styles";
import amazonBanner from "../Assets/images/amazonBanner.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Slider, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles({
  banner: {
    backgroundImage: `url(${amazonBanner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100vw 70vh",
    height: "70vh",
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    cursor: "default",
  },
  main: {
    marginTop: "2.8rem",
    paddingBottom: "2rem",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1rem 0",
  },
  filterTitle: {
    marginLeft: "1rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#232f3e",
  },
  filterSlider: {
    width: "80%",
    margin: "1rem",
  },
  sortTitle: {
    marginRight: "1rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#232f3e",
  },
  sortSelect: {
    width: "80%",
    margin: "1rem",
  },
  hr: {
    borderTop: "1px solid #ddd",
    margin: "2rem 0",
  },
});

function Home() {
  const classes = useStyles();
  const data = useSelector((state) => state.products);
  const [priceFilter, setPriceFilter] = useState([0, 1000]);
  const [sortOrder, setSortOrder] = useState("asc");

  const handlePriceFilterChange = (event, newValue) => {
    setPriceFilter(newValue);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredData = Object.values(data)
    .filter(
      (item) => item.rating.greenScore >= priceFilter[0] && item.rating.greenScore <= priceFilter[1]
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.rating.greenScore - b.rating.greenScore : b.rating.greenScore - a.rating.greenScore
    );

  return (
    <div className={classes.main}>
      <div className={classes.banner}></div>
      <div>
        <h1 style={{ marginLeft: "1rem", color: "#232f3e" }}>
          Trending Products
        </h1>
        <div className={classes.filterContainer}>
          <div>
            <h2 className={classes.filterTitle}>Filter by Green Score:</h2>
            <Slider
              value={priceFilter}
              onChange={handlePriceFilterChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              className={classes.filterSlider}
            />
          </div>
          <div>
            <h2 className={classes.sortTitle}>Sort by Green Score:</h2>
            <Select
              value={sortOrder}
              onChange={handleSortOrderChange}
              className={classes.sortSelect}
            >
              <MenuItem value="asc">Low to High</MenuItem>
              <MenuItem value="desc">High to Low</MenuItem>
            </Select>
          </div>
        </div>
        <hr className={classes.hr} />
      </div>

      <Grid container className={classes.grid}>
        {filteredData.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
              <Link to={`/products/${item.id}`} className={classes.gridItem}>
                <ProductCard item={item} />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Home;
