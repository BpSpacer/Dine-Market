import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndTypes";


interface typeOfData {
    price: string,
    name: string,
    quantity: number,
}

let orignalData: Array<typeOfData> = [
    {
        price: 'price_1NfS3iJ0cdSC5WPHJ1HEbKwi',
        name: 'Muscle Tank',
        quantity: 1,
    },
    {
        price: 'price_1NfS4fJ0cdSC5WPHZdXoW1Wr',
        name: 'Brushed Bomber',
        quantity: 1,
    },
    {
        price: 'price_1NfRxxJ0cdSC5WPHp1PhpjeW',
        name: 'Imperial Alpaca Hoodie',
        quantity: 1,
    },
    {
        price: 'price_1NfRuYJ0cdSC5WPH3ke48NZN',
        name: 'Flex Sweatpants',
        quantity: 1,
    },
    {
        price: 'price_1NfRwfJ0cdSC5WPH2BWDluGc',
        name: 'Lite Sweatpants',
        quantity: 1,
    },
    {
        price: 'price_1NfS5hJ0cdSC5WPHCX2N6zXe',
        name: 'Raglan Sweatshirt',
        quantity: 1,
    },
    {
        price: 'price_1NfRzeJ0cdSC5WPHIKyn307C',
        name: 'Flex Push Button Bomber',
        quantity: 1,
    },
]

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
    let cartItemsArray = await req.json();

    try {
        let line_item = orignalData.filter((item: typeOfData) => {
            for (let index = 0; index < cartItemsArray.length; index++) {
                const element: oneProductType = cartItemsArray[index];
                if (element.productName === item.name) {
                    return true
                }
            }
        })
        let line_itemToSend: any = line_item.map((item: typeOfData) => {
            for (let index = 0; index < cartItemsArray.length; index++) {
                const element: oneProductType = cartItemsArray[index];
                if (element.productName === item.name) {
                    return {
                        price: item.price,
                        quantity: element.quantity
                    }
                }
            }
        })

        let session = await stripe.checkout.sessions.create({
            line_items: line_itemToSend,
            mode: "payment",
            success_url: `${req.nextUrl.origin}/?success=true`,
            cancel_url: `${req.nextUrl.origin}/?success=false`
        })
        return NextResponse.json({ link: session.url });
    } catch (error) {
        console.log((error as { message: string }).message)
        return NextResponse.json({ error })
    }

}