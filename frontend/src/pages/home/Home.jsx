import React, { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import HomeInfo from "./HomeInfo";
// import { productData } from "../../components/carousel/data";
import CarouselItem from "../../components/carousel/CarouselItem";
import ProductCarousel from "../../components/carousel/Carousel";
import ProductCategory from "./ProductCategory";
import FooterLinks from "../../components/footer/FooterLinks";
import { useDispatch, useSelector } from "react-redux";
import { getProducts} from "../../redux/features/product/productSlice"

const PageHeading = ({heading, btnText}) => {
    return(
        <>
        <div className="--flex-between">
            <h2 className="--fw-thin">{heading}</h2>
            <button className="--btn">
                {btnText}
            </button>
        </div>
        </>
    )
};

function Home(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const { products } = useSelector((state) => state.product);

    const latest = products?.filter((product) => {
        return product.quantity > 0;
    })
    ?.filter((product, index) => index < 6)

    const lips = products?.filter((product) => {
        return product.quantity > 0;
    })
    ?.filter((product) => {
        return product.category === "Lèvres";
    })
    ?.filter((product, index) => index < 6)

    const lastestProducts = latest.map((item) => (
        <div key={item.id}>
            <CarouselItem 
            name={item.name}
            url={item.image[0]}
            price={item.price}
            regularprice={item.regularprice}
            description={item.description}
            product={item}
            />
        </div>
    ))

    const lipsProducts = lips.map((item) => (
        <div key={item.id}>
            <CarouselItem 
            name={item.name}
            url={item.image[0]}
            price={item.price}
            regularprice={item.regularprice}
            description={item.description}
            product={item}
            />
        </div>
    ))

    return(
        <div>
            <Slider />
            <section>
                <div className="container">
                    <PageHeading heading={"Nos derniers produits"} btnText = {"Voir"}/>
                    <ProductCarousel products={lastestProducts}/>
                </div>
            </section>
            <section className="--bg-grey">
                <div className="container">
                    <h3>Catégories</h3>
                    <ProductCategory />
                </div>
            </section>

            <section>
                <div className="container">
                    {/* <HomeInfo /> */}
                    <PageHeading heading={"Nos produits pour les lèvres"} btnText = {"Voir"}/>
                    <ProductCarousel products={lipsProducts}/>
                </div>
            </section>
                    <HomeInfo />
            <FooterLinks />
        </div>
    )
}

export default Home;