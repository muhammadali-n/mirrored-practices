'use client'
import { getContent } from '@/integrations/common-integration';
import { fetchFooter } from '@/integrations/sanity/sanity-integration';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { urlFor } from '@/app/lib/sanity';
import './navbar/module.css'

export default function Footer() {
    const [footerData, setFooterData] = useState([]);

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                // Fetch footer data from the API
                const response = await getContent(fetchFooter);
                setFooterData(response);
            } catch (error) {
                console.error('Error fetching footer data:', error);
            }
        };

        fetchFooterData();
    }, []);

    return (
        <footer className="bg-dark text-sm text-neutral-500 dark:text-neutral-400">
            {footerData.map((page: any, index: number) => (
                <div key={index} className="container-fluid">
                    <div className="row">
                        {/* Left side */}
                        <div className="col-auto margin">
                            <Link className="flex items-center gap-2 text-black dark:text-white md:pt-1" href="/">
                                <img src={urlFor(page.storeLogo.logo.asset._ref).url()} alt="Logo" width={40} height={40} className="mt-0 me-3" />
                                <span className="uppercase text-white text-decoration-none">{page.storeName}</span>
                            </Link>
                        </div>
                       
                        {/* Middle side */}
                        <div className="col-md-auto mt-100 margin" style={{ marginTop: '70px!important', marginLeft:'75px'  }}>
                            <ul className="navbar-nav">
                                {page.menuItems.map((menuItem: any, menuItemIndex: number) => (
                                    <li key={menuItemIndex} className="nav-item">
                                        <Link href={menuItem.path} className="nav-link text-white">
                                        <span onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}>
                        {menuItem.name}
                    </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Right side */}
                        {/* <div className="col-md ml-auto text-end margin">
                            <a
                                className="btn btn-outline-light"
                                aria-label="Deploy on Vercel"
                                href="https://vercel.com/templates/next.js/nextjs-commerce"
                            >
                                ▲ Deploy
                            </a>
                        </div> */}
                    </div>
                    <hr className="my-4 off-white-hr" />
                    <div className="row align-items-center">
                        <div className="col-md-auto">
                            <p className="text-white">{page.copyright.Name} </p>
                        </div>
                        <div className="col-md-auto">
                            <p className="text-white">{page.designCredit.Name}</p>
                        </div>
                        <div className="col-md ml-auto text-end">
                            <p className="text-white">
                                <a href="https://vercel.com" className="text-white text-decoration-none">
                                    {page.poweredBy.Name}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </footer>
    );
}
