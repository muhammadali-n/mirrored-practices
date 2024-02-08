"use client";
import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import NextNProgress from 'nextjs-progressbar';

const Navigation = ({ response }: { response :any}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <NextNProgress />
            <Sidebar isOpen={isOpen} toggle={toggle} response={response} />
            <Navbar toggle={toggle} response={response}  />
        </>
    );
};

export default Navigation;