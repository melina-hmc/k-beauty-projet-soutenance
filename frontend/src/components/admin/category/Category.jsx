import CategoryList from "./CategoryList";
import CreateCategory from "./CreateCategory";
import "./_category.scss"

function Category() {

    return (
        <section>
            <div className="container coupon">
                <CreateCategory />
                <CategoryList />
            </div>
        </section>
    )
}

export default Category;