import { auth } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
    const session = await auth();

    if(session){

        try {
            if(session.user.isAdmin) {
                const orders = await prisma.order.findMany();
                return new NextResponse(JSON.stringify(orders), { status: 200 }); 
            }
            const orders = await prisma.order.findMany({
                where: {
                    userEmail: session.user.email!
                }
            }); 
            return new NextResponse(JSON.stringify(orders), { status: 200 });
        } catch (error) {
            console.log(error);
            return new NextResponse(JSON.stringify({message: 'Something went wrong'}), { status: 500 });
        } 
    } else {
        return new NextResponse(JSON.stringify({message: 'Your not authenticated'}), { status: 401 });
    };
};