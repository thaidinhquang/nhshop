import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const ProductList = () => {
    return (
        <>
            <div className="flex justify-between items-center py-3">
                <h2>Product List</h2>
                <Link to="/admin/products/add" className="flex items-center">
                    <Button>
                        <Plus />
                        Add Product
                    </Button>
                </Link>
            </div>
            <hr />
            <div className="my-5">Product list</div>
        </>
    );
};

export default ProductList;
