import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const PUT = async (req:NextRequest, {params}: {params: {id: string}}) => {
    const {id} = params

    try {
        const body = await req.json();
        await prisma.order.update({
            where: {
                id
            },
            data: {status: body} 
        })  

        return new NextResponse(JSON.stringify({message: 'Order has been  Updated'}), { status: 200 });

    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({message: 'Internal Server Error'}), { status: 500 });
    }
}