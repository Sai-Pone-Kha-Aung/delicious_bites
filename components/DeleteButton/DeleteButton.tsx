"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

const DeleteButton = ({id}: {id: string}) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated" || !session?.user.isAdmin) {
        return
    }

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "DELETE",
        });

        if (response.status === 200) {
            router.push("/menu");
            toast("The product has been deleted!");
        } else {
            const data = await response.json();
            toast.error(data.message);
        }
    }

    return (
        <button className="bg-red-400 hover:bg-red-500 text-white rounded-full ml-6 p-2" onClick={handleDelete}>
            <Image src="/delete.png" alt="" width={20} height={20} />
        </button>
    )
}

export default DeleteButton;