"use client";

import Image from "next/image";
import boss1 from "../images/boss1.jpg"
import boss2 from "../images/boss2.jpg"
import boss3 from "../images/boss3.jpg"
import latest from "../images/latest1.jpg"
import work1 from "../images/smarthome.jpg";
import work2 from "../images/onboard.png";
import work3 from "../images/booking.jpg";
import work4 from "../images/work3.jpg";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center space-y-16">
      {/* Home Section */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-center gap-10 px-6 md:px-16 py-20">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h6 className="text-lg text-gray-600">
            <span className="bg-yellow-300 px-2 py-1 rounded">Unhappy with your website?</span>
          </h6>
          <h1 className="text-4xl font-bold mt-4">
            We create beautiful <br /> and fast web services
          </h1>
        </div>
        <div className="lg:w-1/2">
          <Image
            src={latest}
            alt="hero-image"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Service Section */}
      <section className="w-full text-center py-20 bg-gray-100">
        <h1 className="text-3xl font-bold">We offer high <br /> demand services</h1>
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { title: "UI/UX Design", icon: "bi-pencil", desc: "UI/UX design focuses on enhancing user experiences through intuitive interfaces." },
            { title: "Front End", icon: "bi-code", desc: "Front-end development involves creating the visual and interactive elements." },
            { title: "Back End", icon: "bi-hdd-stack", desc: "Back-end development handles the server, database, and application logic." }
          ].map((service, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl p-6 w-80">
              <div className="text-4xl mb-4"><i className={`bi ${service.icon}`}></i></div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.desc}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Get started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Work Section */}
      <section className="w-full py-20">
        <h1 className="text-3xl font-bold text-center">Good design means <br /> good business</h1>
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { title: "Smart home dashboard", img: work1, category: "Full stack application" },
            { title: "Onboard application", img: work2, category: "UX/UI design" },
            { title: "Booking system", img: work3, category: "Mobile application" },
            { title: "Juice product homepage", img: work4, category: "Front End application" }
          ].map((work, index) => (
            <div key={index} className="w-64 text-center">
              <Image
                src={boss1}
                alt={work.title}
                width={250}
                height={200}
                className="rounded-lg shadow-md"
              />
              <figcaption className="text-sm text-gray-500 mt-2">{work.category}</figcaption>
              <h3 className="text-lg font-semibold mt-1">{work.title}</h3>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="#!" className="text-blue-500 font-semibold flex items-center justify-center">
            See more <span className="bi bi-arrow-right-short text-xl"></span>
          </a>
        </div>
      </section>

      {/* Client Section */}
      <section className="w-full py-20 bg-gray-100">
        <div className="flex flex-col lg:flex-row items-center gap-10 px-6 md:px-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h6 className="text-lg text-gray-600">Meet the team</h6>
            <h1 className="text-3xl font-bold mt-2">We are chilled <br /> and a laidback team</h1>
            <p className="text-gray-600 mt-4">
              Welcome to JCRM Technologies! We are a dynamic Digital Marketing Agency...
            </p>
          </div>
          <div className="lg:w-1/2 flex gap-4">
            <Image src={boss2} alt="team" width={150} height={150} className="rounded-lg shadow-md" />
            <div className="flex flex-col gap-4">
              <Image src={boss1} alt="team" width={100} height={100} className="rounded-lg shadow-md" />
              <Image src={boss1} alt="team" width={100} height={100} className="rounded-lg shadow-md" />
            </div>
          </div>
        </div>
        <div className="mt-10 px-6 md:px-16">
          <h1 className="text-xl font-semibold text-center">
            Fast and outstanding results. Edie understands their customer is needs...
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Image src={boss3} alt="client" width={60} height={60} className="rounded-full" />
            <div>
              <h4 className="font-semibold">Carlos Tran</h4>
              <p className="text-gray-500 text-sm">The Decorate Gatsby</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
