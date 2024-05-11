"use client"
import React, {useState} from 'react';
import PrimaryButton from "@/components/PrimaryButton";
import Input from "@/components/Input";
import Image from "next/image";
import Card from "@/components/Card";
import Link from "next/link";
import {isValidEmail} from "@/utils/emailUtils";
import {useRouter} from "next/navigation";

function Login() {

    const router = useRouter();

    const [formFields, setFormFields] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (formFields.email === "" || !isValidEmail(formFields.email)) {
            window.alert('Please enter a valid email');
        } else if (formFields.password.length < 4) {
            window.alert('Length of password should at least be 4')
        } else {
            console.log(formFields);
            localStorage.setItem('user', JSON.stringify(formFields));
            router.push('/login');
        }
    }

    return (
        <Card className={"lg:w-2/3 md:w-4/5 w-5/6"}>
            <div className={"flex w-full"}>
                <div className={"flex-auto w-1/2 bg-green-500 hidden md:block"}>
                    <Image width={400} height={400} className={"h-full w-full object-cover"} src={"https://images.unsplash.com/photo-1598908314766-3e3ce9bd2f48?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={"Side Banner"} />
                </div>
                <div className={"flex-auto w-1/2 px-6 py-7"}>
                    <Link href={"/"}>
                        <Image className={"rounded-full mb-4 mx-auto"} src={"https://fakeimg.pl/150x150?text=Logo&font=lobster"} alt={"Logo"} width={70} height={70} />
                    </Link>
                    <h2 className={"text-2xl text-gray-800 mb-2 text-center"}>Login to Play</h2>
                    <p className={"text-gray-500 mb-4"}>Enter email and password to continue.</p>
                    <Input type={"email"}
                           className={"w-full"}
                           name={"email"}
                           id={"email"}
                           placeholder={"Email"}
                           onChange={handleChange}
                           value={formFields.email}
                    />
                    <Input type={"password"}
                           className={"w-full"}
                           name={"password"}
                           id={"password"}
                           placeholder={"Password"}
                           onChange={handleChange}
                           value={formFields.password}
                    />
                    <PrimaryButton onClick={handleSubmit} type={"button"} className={"w-full"}>
                        Login
                    </PrimaryButton>
                </div>
            </div>
        </Card>
    );
}

export default Login;