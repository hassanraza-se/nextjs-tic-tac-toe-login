'use client';
import PrimaryButton from "@/components/PrimaryButton";
import {useRouter} from "next/navigation";


export default function Home() {

    const router = useRouter();

    return (
        <>
            <h2 className={"text-center text-4xl text-amber-950"}>
                Welcome to PIAIC
            </h2>
            <p className={"text-gray-500 my-4 w-1/2 text-center"}>
                We are dedicated to providing top-notch services to meet your needs. Whether you are looking for
                web
                development, software solutions, or digital marketing services, we have got you covered. Explore
                our
                website
                to learn more about what we offer and how we can help you achieve your goals.
            </p>
            <PrimaryButton
                className={"w-52"}
                onClick={() => {
                    router.push('/login');
                }}
            >
                Get Started
            </PrimaryButton>
        </>
    )
}
