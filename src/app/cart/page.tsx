import CartComp from "@/components/views/CartParent/CartChild";
import ContextWrapper from "@/global/context"

async function fatchAllStoreProducts() {
  let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-13/data/query/production?query=*%5B_type+%3D%3D+%22products%22%5D`, {
    cache: "no-store",
  })
  return res.json();
};

const Cart = async () => {
  let allProductsOfStore = await fatchAllStoreProducts();
  return (
    <ContextWrapper>
      <CartComp allProductsOfStore={allProductsOfStore.result} />
    </ContextWrapper>
  )
}

export default Cart