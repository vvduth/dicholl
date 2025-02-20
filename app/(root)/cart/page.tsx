import { getMycart } from "@/lib/actions/cart.actions"
import CartTable from "./cart-table"
export const metadata = {
    title: "Cart",
    description: "Cart page",
}
const CartPage = async () => {

    const cart = await getMycart()
    return (
       <>
       <CartTable 
         cart={cart}
       />
       </>
    )
}

export default CartPage