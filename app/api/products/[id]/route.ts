import { auth } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, {params} : {params: {id: string }}) => {
    
    const {id} = params;
    try {
        const products = await prisma.product.findUnique({
            where:{
                id:id
            }
        });
        return new NextResponse(JSON.stringify(products), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({message: 'Internal Server Error'}), { status: 500 });
    } 
};

export const DELETE = async (req: NextRequest, {params} : {params: {id: string }}) => {
    const {id} = params;
    const session = await auth();
    if(session?.user.isAdmin){ 
    try {
        await prisma.product.delete({
            where:{
                id:id,
            }
        })
        return new NextResponse(JSON.stringify({message: 'Product has been deleted'}), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({message: 'You are not allowed'}), { status: 403 });
    }}
}