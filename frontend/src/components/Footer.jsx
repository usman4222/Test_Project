import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-background py-8 px-7 bg-[#f1f1f1]">
      <div className=" ">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Logo Section */}
          <div className=" w-full lg:w-3/4 mb-14 md:mb-10 md:p-4 lg:text-left">
            <Link href="/" className="inline-block">
              <h2 className="xl:text-3xl text-2xl font-bold italic text-[#080617]">
                EasyBuy
              </h2>
            </Link>
          </div>

          {/* Links Section */}
          <div className=" flex flex-col sm:flex-row justify-between w-full lg:w-3/4 md:p-4 gap-6 ">
            {/* Solutions Column */}
            <div className="space-y-4">
              <h3 className="text-[16px] lg:text-[18px] xl:text-[21px] font-medium leading-[21px] text-[#080617]">
                Solutions
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#080617] font-medium leading-[17px] text-[13px] lg:text-[15px] xl:text-[17px]"
                  >
                    GhostHost™
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#080617] font-medium leading-[17px] text-[13px] lg:text-[15px] xl:text-[17px]"
                  >
                    Credits™
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#080617] font-medium leading-[17px] text-[13px] lg:text-[15px] xl:text-[17px]"
                  >
                    PowerPod™
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-[16px] lg:text-[18px] xl:text-[21px] font-medium leading-[21px] text-[#080617]">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#080617] font-medium leading-[17px] text-[13px] lg:text-[15px] xl:text-[17px]"
                  >
                    What We Do
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#080617] font-medium leading-[17px] text-[13px] lg:text-[15px] xl:text-[17px]"
                  >
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#080617] font-medium leading-[17px] text-[13px] lg:text-[15px] xl:text-[17px]"
                  >
                    Client Success
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#080617] font-medium leading-[17px] text-[13px] lg:text-[15px] xl:text-[17px]"
                  >
                    Careers{" "}
                    <span className="ml-2 rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-600">
                      Now Hiring
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="space-y-4">
              <h3 className="text-[16px] lg:text-[18px] xl:text-[21px] font-medium leading-[21px] text-[#080617]">
                Contact
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#080617] font-medium leading-[17px] text-[13px] lg:text-[15px] xl:text-[17px]"
                  >
                    Book a Call
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-[#080617] font-medium leading-[17px] text-[13px] lg:text-[15px] xl:text-[17px]"
                  >
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col-reverse items-center justify-between space-y-4 space-y-reverse border-t border-gray-200 pt-8 md:flex-row md:space-y-0">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex space-x-4">
              <Link href="https://instagram.com" className="text-[#080617]">
                <FaInstagram className="h-6 w-6 lg:h-8 lg:w-8" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://linkedin.com" className="text-[#080617]">
                <FaLinkedin className="h-6 w-6 lg:h-8 lg:w-8" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
            <h6 className=" text-left text-[#080617] max-w-md text-xs md:text-[14px] lg:text-[15px] leading-[17px] font-semibold">
              The EasyBuy© 2024 All Rights Reserved
            </h6>
            <p className="max-w-md text-xs text-[#080617] text-left">
              All content and materials on this site are protected by copyright
              and trademark laws and are the property of The EasyBuy.
              Unauthorized use is prohibited.
            </p>
            <div className="block md:hidden">
              <div className="flex items-center space-x-4">
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-[#080617] font-medium leading-[17px] text-[13px] lg:text-[15px] xl:text-[17px]"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="fixed  flex h-15 w-15 items-center justify-center rounded-full bg-[#F3E1F8] text-purple-600 hover:bg-purple-200"
                >
                  <FaWhatsapp className="h-10 w-10" />
                  <span className="sr-only">WhatsApp</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-[#080617] font-medium leading-[17px] text-[13px] lg:text-[15px] xl:text-[17px]"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="fixed flex h-15 w-15 items-center justify-center rounded-full bg-[#F3E1F8] text-purple-600 hover:bg-purple-200"
              >
                <FaWhatsapp className="h-10 w-10" />
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
