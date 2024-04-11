import { useState } from "react";
import useHookQuery from "../hooks/useHookQuery";
import { BannerPage, ServicePage } from "./Layout";
import ListProductPage from "./ListProduct";
import PageButton from "./PageButton";


const ShopPage = () => {
  const { data, isLoading } = useHookQuery({ path: "products" });
  // button change page
  const [page, setPage] = useState<number>(
    Number(new URLSearchParams(window.location.search).get("page") || 1)
  );
  const limit = 12;
  const indexOLastRecord = page * limit;
  const indexOFirstRecord = indexOLastRecord - limit;
  const currentData = data?.slice(indexOFirstRecord, indexOLastRecord);
  const nPage = Math.ceil(data?.length / limit);
  // end button change page
  return (
    <div>
      <BannerPage />
     
      <div className="container pt-12">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ListProductPage data={currentData} />
        )}
        {nPage > 1 && (
          <PageButton nPage={nPage} page={page} setPage={setPage} />
        )}
      </div>
      <ServicePage />
    </div>
  );
};

export default ShopPage;
