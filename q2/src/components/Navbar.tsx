import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import Link from "next/link";

export default function MyNavBar() {
    return (
        <Navbar
            position="sticky"
            maxWidth="2xl"
            isBlurred
            className="bg-transparent text-white"
        >
            <NavbarBrand>
                <Link href={'/'} className="font-bold text-inherit">AffordMed</Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link href="/products">
                        Products
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
