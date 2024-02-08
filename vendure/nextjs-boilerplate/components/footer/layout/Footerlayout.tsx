import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineTwitter, AiFillYoutube } from 'react-icons/ai';
import { BiLogoPinterestAlt } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';

interface CollectionItem {
  name: string;
  slug: string;
}

interface FooterProps {
  response: {
    collections: {
      items: CollectionItem[];
    };
  };
}

function Footer({ response }: FooterProps) {
  const iconsTab = [
    { icon: <FaFacebookF />, label: 'Facebook' },
    { icon: <AiOutlineTwitter />, label: 'Twitter' },
    { icon: <AiFillYoutube />, label: 'YouTube' },
    { icon: <BiLogoPinterestAlt />, label: 'Pinterest' },
  ];

  return (
    <>
      <footer className="bg-black">
        <div className="container mx-auto py-12 ">
          <div className="flex flex-col md:flex-row items-center md:items-start md:gap-5 text-left">
            <div className="flex flex-col w-full md:w-1/2 md:p-0 py-4 gap-8">
              <Link href="/">
                <Image
                  src="/images/daniel-wellington.svg"
                  alt="Daniel Wellington Logo"
                  width={350}
                  height={150}
                  className="relative"
                />
              </Link>
              <p className="text-sm font-medium text-white">
                Time Master Watches and Accessories Private Limited <br />
                A-19, Sector - 58, 201301 Corporate Identity <br />
                Contact No: +91 22 26721117
              </p>
              <div className="flex gap-7 text-2xl text-[#646464] justify-center md:justify-start">
                {iconsTab.map(({ icon, label }, index) => (
                  <div
                    key={index}
                    className="text-2xl bg-[#efefef] p-2 rounded-full hover:bg-[#ff0366] hover:text-white"
                    style={{ transition: 'all 0.3s' }}
                    aria-label={label}
                  >
                    {icon}
                  </div>
                ))}
              </div>
              <p className="text-[16px] font-medium text-white">
                Privacy Policy | © {new Date().getFullYear()} Valoriz <br />
                Design by <br />
                Kishor
              </p>
            </div>
            {/* <div className="flex flex-col gap-2 relative">
              <p className="text-[20px] footer-main text-white">STORES</p>
              <span className="top-[33px] absolute w-[7rem] h-[4px] bg-[#ff0366]"></span>
              {response.collections.items.map(({ name, slug }) => (
                <li key={slug}>
                  <Link href={`/collections/${slug}`}>
                    <p className="text-[16px] hover:text-[#ff0366] cursor-pointer text-white font-medium hover:font-bold">
                      {name}
                    </p>
                  </Link>
                </li>
              ))}
            </div> */}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
