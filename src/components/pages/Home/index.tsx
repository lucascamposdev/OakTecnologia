// Hooks
import { useState } from "react";
import { useProducts } from "@/context/useProducts";

// Components
import Table from "./Table";
import { columns } from "./columns";
import AddProduct from "./AddProduct";

const Home = () => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const { products, fetchProducts } = useProducts();

  const paginatedProducts = fetchProducts(page, pageSize)

  const hasMoreData = page * pageSize < products.length;

  return (
    <main className="h-full m-5">
      <div className="flex flex-col gap-5">
        <div className="flex">
          <h1 className="font-kanit text-3xl">Products</h1>
          <AddProduct/>
        </div>
        <Table
          data={paginatedProducts}
          columns={columns}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          hasMoreData={hasMoreData}
        />
      </div>
    </main>
  )
}

export default Home